// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Level.sol";
import "./Storage.sol";

contract StorageFactory is Level {
    address mineAddress;
    constructor() payable {
        Mine newMine = new Mine();
        mineAddress = address(newMine);
    }
    function createInstance(address _player) override public payable returns (address) {
        _player;
        Storage instance = new Storage(mineAddress);
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
    function validateInstance(address payable _instance, address _player) override view public returns (bool) {
        Storage instance = Storage(_instance);
        return instance.owner() == _player && address(instance).balance == 0;
    }
}