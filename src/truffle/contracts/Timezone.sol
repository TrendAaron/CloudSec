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
 
  constructor()  {
    tz1Library = address(new LibraryContract());
    tz2Library = address(new LibraryContract());
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
