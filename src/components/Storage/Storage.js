import { useEffect, useState } from "react";
import storageContract from "../../truffle/build/contracts/Storage.json";
import storageFactory from "../../truffle/build/contracts/StorageFactory.json";
import { Button, CenterDiv,CenterDivGame, CodeDiv, Code,Title,Break,Box, ValidateButton,InstatiateButton } from "./index-styled";
// import mineContract from "../../truffle/build/contracts/Mine.json";

function Storage({ web3, nId, account }) {
  const [walletBalance, setWalletBalance] = useState();
  const [walletOwner, setWalletOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [testing, setTesting] = useState(false);
  const [weiValue, setweiValue] = useState();
  const [instatitated, setInstatitated] = useState(false);
  

  let Storage = new web3.eth.Contract(
    storageContract.abi,
    storageContract.networks[nId]?.address
  );

  let GameContract =  new web3.eth.Contract(
    storageFactory.abi,
    storageFactory.networks[nId]?.address
  );


  


  useEffect(() => {
    const loadData = async () => {
      setWalletAddress(storageContract.networks[nId]?.address);
      // setMineAddress(mineContract.networks[nId]?.address);
      if (walletAddress) {
        setWalletBalance(await Storage.methods.balanceOf().call());
        setWalletOwner(await Storage.methods.owner().call());
      }
    };
    
    loadData();
  }, [
    walletAddress,
    walletOwner,
    walletBalance,
    Storage.methods,
    web3,
    nId,
    account,
  ]);

  const createInstance = async () => {
    setInstatitated(true);
  }

  const getBalance = async () => {
    let bal = await Storage.methods.balanceOf().call();
    alert(bal);
  };

  const getOwner = () => {
    alert("The wallet Owner now is: " + walletOwner);
  };

  const getWithdraw = async () => {
    await Storage.methods.withdraw().send({ from: account });
  };

  const ThisIsMine = async () => {
    /*
    User needs to be able to call 
    this function to call the fallback function
    */
    let txparam = {
      to: walletAddress,
      from: account,
      value: "0x0000",
    };
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txparam],
    }, setTesting(true));
    
  };

  const Validate = async () => {
    let validate = await GameContract.methods
    .validateInstance(walletAddress, account)
    .call();
    if(validate){
      alert("KRGUGVCGPN3HGNJUGFTGM2DMOBXWI4LQNF6Q====");
    }else{
      alert("😛😛😛😛");
    }
  }



  return (
    <>
        <CenterDiv>
        <Title>CONSIGN</Title>
        <Box>
          In your internship, smart contracts were introduced to you as a simple task for its culminating
          week. Each intern has their own smart contract to solve, and as per the instructions of the game,
          you had to take the ownership of the account and drain the account. While looking at it you notice
          that there are two contracts – the Mine and Storage contract. You were given only until lunch
          break to solve this contract and all that you know is that one of these contracts can only be
          accessed or called through the other contract. The first to be able to accomplish the tasks would
          be given a free lunch from the department, and as competitive as you are, you wanted to win.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>Trigger the "Get" button that activates the thisIsMine function to gain ownership of the account</Box>
        <Box>Drain the account</Box>
        <Break></Break>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Mine {
  address public owner;
    constructor(address _owner) public {
    owner = _owner;
  }
  function thisIsMine() public {
    owner = msg.sender;
    }
  }
  contract Storage {
    address public owner;
    Mine mineContract;
    constructor(address _mineAddress) payable public {
    mineContract = Mine(_mineAddress);
    owner = msg.sender;
  }
  modifier onlyOwner {
    require(msg.sender == owner, "You are not the owner");
    _;
  }
  function withdraw() public onlyOwner {
    payable(owner).transfer(address(this).balance);
  }
  function balanceOf() view public returns(uint) {
    return address(this).balance;
  }
  fallback() external {
    (bool result, bytes memory data) = address(mineContract).delegatecall(abi.
    encodeWithSignature("thisIsMine()"));
    require(result, "delegatecall failed");
  }
}

              `}
          </Code>
        </pre>
      </CodeDiv>
      {instatitated ? (<><CenterDivGame>
      <Button onClick={getWithdraw}>Withdraw</Button> &nbsp;
      <Button onClick={getBalance}>balanceOf</Button> &nbsp;
      <Button onClick={getOwner}>Owner</Button> &nbsp;
      <Button onClick={ThisIsMine}>Get!</Button>&nbsp;
      
      </CenterDivGame>
      <ValidateButton onClick={Validate}>Validate</ValidateButton>
      </>): (<>
        <InstatiateButton onClick={createInstance}>Instantiate</InstatiateButton>
      </>)
      
      
      
      
      
      }
      </CenterDiv>
     
    </>
  );
}

export default Storage;
