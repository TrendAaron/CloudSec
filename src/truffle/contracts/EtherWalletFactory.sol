// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Level.sol";
import "./EtherWallet.sol";

contract EtherWalletFactory is Level {
  constructor () payable{}

  function createInstance(address _player) override public payable returns (address) {
    _player;
    EtherWallet instance = new EtherWallet();
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
    EtherWallet instance = EtherWallet(_instance);
    return instance.owner() == _player && address(instance).balance == 0;
  }
}
