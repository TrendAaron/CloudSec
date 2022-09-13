import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Defense = () => {
  return (
    <>
    <CenterDiv>
        <Title>Defense</Title>
        <Box>
        Your friend has started working in a startup company and he said that they claim that 
        they have developed a smart contract that keeps people’s money and accounts safe 
        from hackers by making use of multiple defenses inside the contract. 
        Being the hacking enthusiast that you are, you wanted to challenge yourself 
        by hacking your brother who use their smart contract and drain their account. 
        Let’s just say that you wanted to test your skills. 
        You promise to give back his account anyway!!
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>The player needs to satisfy all requirements of all defense 
          modifiers to gain ownership of the contract and drain the account.</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select Seller Workspace</Box>
        <Box>
          3a. Call the createInstance with the second account as the player
          address
        </Box>
        <Box>
          3b. Get the _seller address at the log [this is the address that you
          need to attack]{" "}
        </Box>
        <h4>4. Hack the SMART CONTRACT!</h4>
        <CodeDiv>
        {/* <pre> */}
          <Code>
            
{`
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Defense {

  address public owner;

    constructor() public payable{
      owner = payable(msg.sender);
    }

    modifier defenseOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier defenseTwo() {
        uint z;
        assembly { z := extcodesize(caller()) } 
        require(z == 0); 
        _;
    }

    modifier defenseThree(bytes8 _defenceKey) {
        require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_defenceKey) == uint64(0) - 1); 
        _;
    }

    function penetrate(bytes8 _defenseKey) public defenseOne defenseTwo defenseThree(_defenseKey) returns (bool) {
        owner = tx.origin;
        return true;
    }

    modifier onlyOwner {
            require(
                msg.sender == owner,
                "You are not the owner"
                );
            _;
    }

    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }

    function withdraw() public  onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}


              `}
          </Code>
        {/* </pre> */}
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Defense






