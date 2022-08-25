// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
 
contract Door {
 
  bool public locked = true;
  uint256 public Face = block.timestamp;
  uint8 private key1 = 15;
  uint8 private key2 = 220;
  uint16 private when = uint16(block.timestamp);
  bytes32[3] private password;
  address public owner;
  mapping(address => uint256) balances;
 
  constructor(bytes32[3] memory _data)  payable {
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
