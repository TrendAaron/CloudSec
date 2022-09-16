import { useEffect, useState } from "react";
import PasswordContract from "../../truffle/build/contracts/Password.json";
import PasswordFactory from "../../truffle/build/contracts/PasswordFactory.json"; 

import { CenterDiv,CenterDivGame,CodeDiv, Button, Title, Code,Break,Box, Input, InstatiateButton } from "./index";


const Password = ({ web3, nId, account }) => {
  
  let Contract = new web3.eth.Contract(
    PasswordContract.abi,
    PasswordContract.networks[nId]?.address
  );

  let GameContract = new web3.eth.Contract(
    PasswordFactory.abi,
    PasswordFactory.networks[nId]?.address
  )


  const [contractAddress, setContractAddress] = useState();
  const [contractOwner, setContractOwner] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [weiValue, setWeiValue] = useState(0);
  const [locked, setLocked] = useState();
  const [balance, setBalance] = useState();
  const [hashCode, setHashCode] = useState("");
  const [instantiated, setInstantiated] = useState(false);

  

  const init = async () => {
    setContractAddress(await Contract._address);
    if (contractAddress) {
      setContractOwner(await Contract.methods.owner().call());
      setWalletAddress(await PasswordContract.networks[nId]?.address);
      setLocked(await Contract.methods.locked().call());
      setBalance(await Contract.methods.balanceOf().call());
    }
  };

  useEffect( ()  => {
    init();
  });

  const handleCodeUnlock = async (event) => {
    event.preventDefault();
    // let code = web3.utils.asciiToHex(hashCode);
    
    await Contract.methods.unlock(hashCode).send({ from: account });
    let result = await Contract.methods.locked().call();
    console.log(await hashCode);
  };

  const isLocked = () => {
    alert("Lock Status: " + locked);
  };
  const withdraw = async () => {
    await Contract.methods.withdraw().send({ from: account });

  };
  const balanceOf = () => {
    alert(balance);
  };

  const checkOwner = async () => {
    // setContractOwner(await Contract.methods.owner().call());
    alert(contractOwner);
  };

  const fallBack = async (event) => {
    event.preventDefault();
    var ethValue = web3.utils.toWei(String(weiValue), "ether");

    await  web3.eth.sendTransaction({
      from: account,
      to: walletAddress,
      value: ethValue //optional, if you want to pay the contract Ether
    });
  
    console.log(account,ethValue);
    // await Contract.method.send({ from: account, value: ethValue });

    
  };
  
  // const createFactory = async () => {
  //   let contractAdd = await GameContract.methods.createInstance(account).call();  
  //   setinstantiated(contractAdd);
  //   console.log(contractAdd);
  // }

  const validate = async () => {
    let validate = await GameContract.methods
      .validateInstance(walletAddress, account)
      .call();
    if(validate){
      alert("ZmxhZyA9IFRNQ1RGe3BtNW4yMTZjM2pyanc0Yn0=")
    }else{
      alert("😛😛😛😛");
    }
  }

  const createInstance = () => {
    setInstantiated(true);
  }

  
  
  return (
    <>

<CenterDiv>
        <Title>Unlock</Title>
        <Box>
          You and your younger brother both have crypto accounts and wallets
          since you both play crypto games. Your younger brother wants you to
          play his crypto games for more coins but you think you’re wasting time
          if you play games but you don’t earn for your own wallet. The next
          day, in school, while listening to your crypto teacher, she mentioned
          that you can switch the owner of the wallet but there is some hacking
          involved. With what she said, you immediately got the idea of just
          switching your account and your brothers account and play his games.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the switch contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Box> Hint: Convert String to Hash use: https://web3-type-converter.onbrn.com/</Box>
        <Break></Break>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Password {
    bool public locked;
    bytes32 private code;
    address public owner;
    constructor(bytes32 _code) public payable{
      locked = true;
      code = _code;
      owner = msg.sender;
    }
    modifier onlyOwner {
      require(msg.sender == owner, "You are not the owner");
      _;
    }
    function unlock(bytes32 _code) public {
    if (code == _code) {
      locked = false;
    }
    }
// TrendMicro CyB3rSecUr1ty 101 :)
    function withdraw() public onlyOwner {
      require(locked == false, "The account is locked!");
      payable(owner).transfer(address(this).balance);
    }
    function balanceOf() view public returns(uint) {
      return address(this).balance;
    }
    fallback() external payable{
      require(locked == false && msg.value > 0);
      owner = msg.sender;
    }
}
              `}
          </Code>
        </pre>
      </CodeDiv>
      <CenterDivGame>
        {instantiated ? (<>
          <form>
            <Input
            placeholder="0x6173646661736466617364666173646661736466646164646464617364666173"
              type="text"
              required
              value={hashCode}
              onChange={(e) => setHashCode(e.target.value)}
            />
            <Button onClick={handleCodeUnlock}>Unlock</Button>
          </form>
          <form onSubmit={fallBack}>
            <Input
            placeholder="0.00000000000000000001"
            type="number"
            required
            value={weiValue}
            onChange={(e) => setWeiValue(e.target.value)}
            step="any"
            />
          <Button type="submit"> fallback</Button>
          </form>
            <Break/>
              <Button onClick={checkOwner}>Owner</Button>
              <Button onClick={isLocked}>locked</Button>
              <Button onClick={withdraw}>withdraw</Button>
              <Button onClick={balanceOf}>balance</Button>
              <Button onClick={validate}>validate </Button>
                </>)
                : 
                (
                  <><InstatiateButton onClick={createInstance}>Create Instance</InstatiateButton></>
                )}
  
</CenterDivGame>
  </CenterDiv>

      
    </>
  );
};

export default Password;
