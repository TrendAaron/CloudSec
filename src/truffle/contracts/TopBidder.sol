// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract TopBidder {
 
  address payable topBidder;
  uint public currentBid;
  address payable public owner;
 
  constructor()  payable {
    owner = payable(msg.sender);  
    topBidder = payable(msg.sender);
    currentBid = msg.value;
  }
 
  receive() external payable {
    require(msg.value >= currentBid || msg.sender == owner);
    topBidder.transfer(msg.value);
    topBidder = payable(msg.sender);
    currentBid = msg.value;
  }
 
  function _topBidder() public view returns (address payable) {
    return topBidder;
  }
}

//Factory:

 
pragma solidity ^0.8.0;
 
import "./Level.sol";
import "./TopBidder.sol";
 
contract TopBidderFactory is Level {
 
  uint public insertCoin = 0.001 ether;
 
  function createInstance(address _player) override public payable returns (address) {
    _player;
    require(msg.value >= insertCoin, "Must send at least 0.001 ETH");
    return address((new TopBidder){value:msg.value}());
  }
 
  function validateInstance(address payable _instance, address _player) override public returns (bool) {
    _player;
    TopBidder instance = TopBidder(_instance);
    (bool result,) = address(instance).call{value:0}("");
    !result;
    return instance._topBidder() != address(this);
  }
 
  receive() external payable {}
 
}
