import { useEffect, useState } from "react";
import {
  Button,
  Break,
  Input,
  CenterDiv,
  Withdraw,
  Total,
  Balance,
  InstanceB,
  CodeDiv,
  Code, 
  Box,
  Title,
  CenterDivGame
} from "./index-styled";
import etherWalletContract from "../../truffle/build/contracts/EtherWallet.json";
import EtherWalletFactory from "../../truffle/build/contracts/EtherWalletFactory.json";

const EtherWallet = ({ web3, nId, account }) => {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setwalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [ethValue, setEthValue] = useState(0);
  const [instantiated, setInstantiated] = useState(false);

  let Contract = new web3.eth.Contract(
    etherWalletContract.abi,
    etherWalletContract.networks[nId]?.address
  );
  let GameContract = new web3.eth.Contract(
    EtherWalletFactory.abi,
    EtherWalletFactory.networks[nId]?.address
  );

  const createInstance = async () => {
    try {
      await GameContract.methods
        .createInstance(account)
        .send({ from: account, value: 1 });
      setwalletOwner(await Contract.methods.owner().call());
      setWalletAddress(await etherWalletContract.networks[nId]?.address);
      setWalletBalance(await Contract.methods.balanceOf().call());
      setInstantiated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvestments = async () => {
    try {
      let investment = await Contract.methods
        .getInvestments()
        .call({ from: account });
      alert(
        "ETH invested by accout: " +
          web3.utils.fromWei(String(investment), "ether")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getWithdraw = async () => {
    await Contract.methods.withdraw().send({ from: account });
  };

  const getBalance = async () => {
    let balance = await Contract.methods.balanceOf().call();
    alert(balance);
  };

  const validatePlayer = async () => {
    let validate = await GameContract.methods
      .validateInstance(walletAddress, account)
      .call();
    if(validate){
      alert("Wm14aFp5QTlJRlJOUTFSR2UyRjZNM0oyZDNBd2NHaDFkV3h0ZFgwPQ==")
    }
    else{
      alert("????????????????");
    }
  };

  const handleInvest = async (event) => {
    event.preventDefault();
    console.log("Amount Invested: " + ethValue);
    var weiValue = web3.utils.toWei(String(ethValue), "ether");
    await Contract.methods.invest().send({ from: account, value: weiValue });
  };

 
  useEffect(() => {
    const data = localStorage.getItem("instance");
    if (data) {
      setInstantiated(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("instance", JSON.stringify(instantiated));
  }, [
    walletAddress,
    walletOwner,
    walletBalance,
    Contract.methods,
    nId,
    web3,
    account,
  ]);

  return (
    <>
      
      {/* <div className="mt-3"> */}
      <CenterDiv>

      <Title>WITHDRAW</Title>
        <Box>
        A friend of yours is very into smart contracts, blockchains, and keeping his Ethereum wallet safe
        and secure. Since you were over at his house, you wanted to prank him by taking the ownership
        of his account and draining his account to see if he could take it back from you. While working
        on this prank, you notice that you can only take ownership of his account if you have more Ether
        in your wallet, but since you are not into these things as much as him, you don???t have the needed
        amount so you are faced with another challenge.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>The player has to gain the ownership of the account and drain its contributions</Box>
        <Break></Break>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EtherWallet {
    using SafeMath for uint256;
    address public owner;
    mapping(address => uint256) investments;
    event Log(string func, address sender, uint256 value, bytes data);

    constructor() payable {
        owner = payable(msg.sender);
        investments[msg.sender] = 134 * (1 ether);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function invest() public payable {
        require(msg.value < 0.001 ether);
        investments[msg.sender] += msg.value;
        if (investments[msg.sender] >= investments[owner]) {
            owner = msg.sender;
        }
    }

    function getInvestments() public view returns (uint256) {
        return investments[msg.sender];
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function deposit() public payable onlyOwner {}

    function send(address payable to, uint256 amount) public onlyOwner {
        if (msg.sender == owner) {
            to.transfer(amount);

            return;
        }
        revert("You are not allowed to send");
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        emit Log("Fallback", msg.sender, msg.value, msg.data);
    }

    receive() external payable {
        require(investments[msg.sender] > 2 && msg.value > 0);
        owner = msg.sender;
    }
}

              `}
          </Code>
        </pre>
      </CodeDiv>

        
         

<CenterDivGame>
{instantiated ? (<> 
        <table className="table text-muted text-center">
          <tbody>
            <tr style={{ color: "black" }}>
              <th scope="col">Wallet Address</th>
              <th scope="col">Wallet Owner</th>
              <th scope="col">Wallet Balance</th>
            </tr>
          </tbody>
          <tbody>
            <tr style={{ color: "black" }}>
              <td>{walletAddress}</td>
              <td>{walletOwner} </td>
              <td>ETH - {walletBalance} </td>
            </tr>
          </tbody>
        </table>
        
              <form onSubmit={handleInvest}>
                <Input
                  type="number"
                  placeholder="Amount in ETH"
                  value={ethValue}
                  onChange={(e) => setEthValue(e.target.value)}
                  step="any"
                />
                <Button type="submit"> Invest?</Button>
              </form>
              <Total onClick={getInvestments}>Investments</Total>&nbsp;
              <Balance onClick={getBalance}>Balance</Balance>&nbsp;
              <Withdraw onClick={getWithdraw}>Withdraw</Withdraw> &nbsp;
              <Button onClick={validatePlayer}>Validate</Button>
            </> 
           
           ) : (
             <InstanceB onClick={createInstance}>create Instance</InstanceB>
           )}
            
        </CenterDivGame>
        
        </CenterDiv>
        
      {/* </div> */}
      
      <Break></Break>
    </>
  );
};

export default EtherWallet;
