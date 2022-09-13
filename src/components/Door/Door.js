import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Door = () => {
  return (
    <>
    <CenterDiv>
        <Title>Door</Title>
        <Box>
        For your birthday a couple of years ago, you were gifted a lot of Ether for your smart wallet. 
        This smart wallet can be used for everything – shopping, buying food, and even booking rides. 
        Since the pandemic hit, you were not able to use this since you can’t go out of the house anyway, 
        but now that its going back to normal, you try to access your account and find that you have forgotten your password. 
        You really wanted to open it because you had a concert to go to and no one was available to bring you, so you just wanted to book a ride through the ridesharing feature of Necessity Technology, Inc. 
        You have to crack your password as soon as possible, and while you’re at it, you though you should just transfer the balance to you new account as well.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the switch contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
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
        <pre>
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

  contract Door {

    bool public locked = true;
    uint256 public Face = block.timestamp;
    uint8 private key1 = 15;
    uint8 private key2 = 220;
    uint16 private when = uint16(now);
    bytes32[3] private password;
    address public owner;
    mapping(address => uint256) balances;

    constructor(bytes32[3] memory _data) public payable {
      password = _data;
      owner = msg.sender;
      balances[owner] += msg.value;
    }


    function unlock(bytes16 _key) public {
      require(_key == bytes16(password[1]));
      locked = false;
    }

    function balanceOf() view public returns(uint256) {
          return balances[owner];
      }

    function getMoney() public {
          require(locked == false, "The door is locked!");
          balances[owner] = 0;
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

export default Door






