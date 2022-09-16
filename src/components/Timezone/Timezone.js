import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box } from '.'





const Timezone = () => {
  return (
    <>
    <CenterDiv>
        <Title>Timezone</Title>
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
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select Timezone Workspace</Box>
        <Box>
          3. Call the createInstance with the second account as the player
          address
        </Box>
        
        <Box>4. Hack the SMART CONTRACT!</Box>
        <CodeDiv>
        <pre>
          <code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
contract Timezone {
  // public library contracts
  address public tz1Library;
  address public tz2Library;
  address public owner;
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));
  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) {
    tz1Library = _timeZone1LibraryAddress;
    tz2Library = _timeZone2LibraryAddress;
    owner = msg.sender;
  }
  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    tz1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    tz2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
  // set the time for timezone 3
  function setThirdTime(uint _timeStamp) public {
    tz2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
  }
  // Simple library contract to set the time
  contract LibraryContract {
  // stores a timestamp
    uint storedTime;
    function setTime(uint _time) public {
    storedTime = _time;
  }
}

              `}
          </code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Timezone






