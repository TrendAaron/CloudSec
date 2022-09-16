import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Switch = () => {
  return (
    <>
    <CenterDiv>
        <Title>Switch</Title>
        <Box>
          You and your younger brother both have crypto accounts and wallets since you both play crypto 
          games. Your younger brother wants you to play his crypto games for more coins but you think 
          you’re wasting time if you play games but you don’t earn for your own wallet. The next day, in 
          school, while listening to your crypto teacher, she mentioned that you can switch the owner of 
          the wallet but there is soe hacking involved. With what she said, you immediately got the idea of 
          just switching your account and your brothers account and play his games. 
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the switch contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select Switch Workspace</Box>
        <Box>
          3. Call the createInstance with the second account as the player
          address
        </Box>
        
        <Box>4. Hack the SMART CONTRACT!</Box>
        <CodeDiv>
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
contract Switch {
  address public owner;
  constructor() payable public {
    owner = msg.sender;
  }
  modifier onlyOwner {
    require(msg.sender == owner, "You are not the owner");
    _;
  }
  function switchOwners(address _newOwner) public {
    if (tx.origin != msg.sender) {
        owner = _newOwner;
      }
  }
  function withdraw() public onlyOwner {
    payable(owner).transfer(address(this).balance);
  }
  function getBalance() view public returns(uint) {
    return address(this).balance;
  }
}
              `}
          </Code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Switch






