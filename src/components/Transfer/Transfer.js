import { useEffect, useState } from "react";
import { CenterDivGame } from '../Password';
import { CenterDiv,Break,CodeDiv,Title,Box,Code,Input,Button,InstatiateButton} from './index';
import transferContract from "../../truffle/build/contracts/Transfer.json"; 
import transferFactory from "../../truffle/build/contracts/TransferFactory.json";




const Transfer = ({ web3, nId, account }) => {

  const [accountAddress, setaccountAddress] = useState("");
  const [owner, setOwner] = useState(""); 
  const [spender, setSpender] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [amount, setAmount] = useState("");
  const [trFrom, setTrFrom] = useState("");
  const [trTo, setTrTo] = useState(""); 
  const [trAmount, setTrAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [instantiated, setInstantiated] = useState(false);
  const [validated, Setvalidated] = useState(false);
  
  let Contract = new web3.eth.Contract(
    transferContract.abi,
    transferContract.networks[nId]?.address
  );
  
  let GameContract = new web3.eth.Contract(
    transferFactory.abi,
    transferFactory.networks[nId]?.address
  );

  const init = async () => {
    try{
      setWalletAddress(await transferContract.networks[nId]?.address);
      await Contract.methods.balanceOf(account).call();
      setInstantiated(true);
    } catch (error){
      console.log(error);
      
    }
  }

  const checkAccount = async (event) => {
    event.preventDefault();
    let bal = await Contract.methods.balanceOf(accountAddress).call(); 
    setBalance(bal);
    alert("Account Balance is: " + bal );
  }
  const checkAllowance = async (event) => {
    event.preventDefault();
    let allowance = await Contract.methods.allowance(owner,spender).call();
    alert("The allowance available for this owner is: " + allowance);
  }
  const checkApprove = async (event) => {
    event.preventDefault();
    let approve = await Contract.methods.approve(approveSpender,amount).send({from:account});
    alert("Approved!" );
  }

  const handleTransfer = async (event) => {
    event.preventDefault();
    let approve = await Contract.methods.transferFrom(trFrom,trTo,trAmount).send({from:account});

  }
  
  const buttonChecker = async () =>{
    let validate = await GameContract.methods
      .validateInstance(walletAddress, account)
      .call();
    if(validate){
      alert("flag = TMCTF{gtvxrr26hdj5nxy}");
    }
    else{
      alert("not yetttt");
    }

    console.log(await GameContract.methods);
  } 
  const validate = async () => {
    let validate = await GameContract.methods
      .validateInstance(walletAddress, account)
      .call();
    if(validate){
      alert("Wm14aFp5QTlJRlJOUTFSR2UyZDBkbmh5Y2pJMmFHUnFOVzU0ZVgwPQ==");
      Setvalidated(true);
    }
    else{
      alert("😛😛😛😛😛😛😛");
    }
  }
  useEffect(()=> {
  },[accountAddress,walletAddress]);

  return (
    <>
    <CenterDiv>
        <Title>TRANSFER</Title>
        <Box>
        You currently have two smart wallets to contain the money to be used for
        charging your smart cars through Necessity Technology Inc. While you’re out,
          you realized that the smart wallet connected to the smart car you’re using
          does not have funds. While waiting in line to get your smart car charged, 
          you thought of transferring the money you have in the other account to the
            account you’re using right now.

        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>The goal of the player is to freely transfer all of your tokens to another account.</Box>
        <Break></Break>

        <Title>HINT: Research on how ERC20 works  </Title>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
contract Transfer is ERC20 {
    uint public transferLockedTime = block.timestamp + 5 * 365 days;
    uint256 public playerSupply;
    address public player;
    constructor(address _playerAddr) ERC20('TrendMicroCoin', 'TMC'){
        player = _playerAddr;
        playerSupply = 1000000 * (10**uint256(decimals()));
        _mint(player, playerSupply);
        emit Transfer(address(0), player, playerSupply);
    }
    modifier transferLock() {
        if (msg.sender == player) {
        require(block.timestamp > transferLockedTime);
        _;
        } else {
        _;
        }
    }
    function transfer(address _receiverAddr, uint256 _amount) override public transferLock returns(bool) {
        return super.transfer(_receiverAddr, _amount);
    }
}
              `}
          </Code>
        </pre>
      </CodeDiv>
      <CenterDivGame>
      {instantiated ? ( <>
        <Title>Check balance Of Account</Title>
        <form onSubmit={checkAccount}>
          <Input
          placeholder="Check Balance of an Account"
          type="string"
          value={accountAddress}
          onChange={(e) => setaccountAddress(e.target.value)}
          />
          <Button type="submit"> balanceOf</Button>
        </form>

        <Title>Allowance</Title>
        <form onSubmit={checkAllowance}>
          <Input
           placeholder="0x123456789abcdef123456789abcde"
           type="string"
           value={owner}
           onChange={(e) => setOwner(e.target.value)}
          />
          <Input
           placeholder="0x123456789abcdef123456789abcde"
           type="string"
           value={spender}
           onChange={(e) => setSpender(e.target.value)}
          />
          <Button type="submit">call</Button>
        </form>

        <Title>Approve</Title>
        <form onSubmit={checkApprove}> 
        <Input
           placeholder="0x123456789abcdef123456789abcde"
           type="string"
           value={approveSpender}
           onChange={(e) => setApproveSpender(e.target.value)}
          />
          <Input
           placeholder="123123123123123123123123123123123123"
           type="number"
           value={amount}
           onChange={(e) => setAmount(e.target.value)}
          />
          <Button type="submit">Call</Button>
        </form>
        <Title>TransferFrom</Title>
        <form onSubmit={handleTransfer}>
        <Input
           placeholder="0x123456789abcdef123456789abcde"
           type="string"
           value={trFrom}
           onChange={(e) => setTrFrom(e.target.value)}
          />
          <Input
           placeholder="0x123456789abcdef123456789abcde"
           type="string"
           value={trTo}
           onChange={(e) => setTrTo(e.target.value)}
          />
          <Input
           placeholder="123123123123123123123123"
           type="number"
           value={trAmount}
           onChange={(e) => setTrAmount(e.target.value)}
          />
          <Button>transact</Button>
        </form>
        <Button onClick={validate}> Validate</Button> 
      </>):(
        <InstatiateButton onClick={init}>Instatiate</InstatiateButton>
      )
      }

      

      </CenterDivGame>

      </CenterDiv>

      
    </>
  )
}

export default Transfer






