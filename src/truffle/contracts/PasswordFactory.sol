// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;
 
import "./Level.sol";
import "./Password.sol";
 
contract PasswordFactory is Level {
    constructor() payable{}
    function createInstance(address _player) override public payable returns (address) {
        _player;
        bytes32 password = 0x5472656e644d6963726f204379423372536563557231747920313031203a2900;
        Password instance = new Password(password);
        sendMoneyToContractInstance(payable(address(instance)));
        return address(instance);
    }
 
    function sendMoneyToContractInstance(address payable _instance) public payable {
        (bool sent, bytes memory data) = _instance.call{value: address(this).balance}("");
        data;
        require(sent, "Failed to send Ether");
    }
 
   function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
 
  function validateInstance(address payable _instance, address) override view public returns (bool) {
    Password instance = Password(_instance);
    return !instance.locked() && address(instance).balance == 0;
  }
}
