import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Crack = () => {
  return (
    <>
    <CenterDiv>
        
        
        <Title>Crack</Title>
        <Box>
          You and your younger brother both have crypto accounts and wallets
          since you both play crypto games. Your younger brother wants you to
          play his crypto games for more coins but you think you’re wasting time
          if you play games but you don’t earn for your own wallet. The next
          day, in school, while listening to your crypto teacher, she mentioned
          that you can Crack the owner of the wallet but there is some hacking
          involved. With what she said, you immediately got the idea of just
          Cracking your account and your brothers account and play his games.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the Crack contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select Crack Workspace</Box>
        <Box>
          3. Call the createInstance with the second account as the player
          address
        </Box>
        <h4>4. Hack the SMART CONTRACT!</h4>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
contract Crack {
  bool public cracked;
  bytes32 private helper;
  bytes32 private helper2;
  bytes32 private secret;
  address public owner;
  constructor(bytes32 _code) payable{
    cracked = false;
    secret = _code;
    owner = msg.sender;
  }
  modifier onlyOwner {
    require(
    msg.sender == owner,
    "You are not the owner"
    );
    _;
  }
  modifier req1() {
    uint z;
    assembly { z := extcodesize(caller()) }
    require(z < 1);
    _;
  }
  modifier req2() {
    require(msg.sender != tx.origin);
    _;
  }
  function crack(bytes32 _code) req1 req2 public {
    if (secret == _code) {
    cracked = true;
    owner = tx.origin;
    }
  }
  function getMoney() public onlyOwner {
    if(msg.sender == owner){
    cracked = true;
    }else{
    cracked = false;
    }
    
    require(cracked == true, "You haven't cracked the code yet!");
    payable(owner).transfer(address(this).balance);
  }
  function getBalance() view public returns(uint) {
    return address(this).balance;
  }
  fallback() external payable{}
  receive() external payable{}
  }

              `}
          </Code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Crack






