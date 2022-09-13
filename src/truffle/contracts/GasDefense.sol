// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

 
contract GasDefense {
 
  using SafeMath for uint256;
  address public contractOwner;
 
  constructor() {
      contractOwner = msg.sender;
  }
 
  modifier firstChallenge() {
    require(msg.sender != tx.origin);
    _;
  }
 
  modifier secondChallenge() {
    require(gasleft().mod(8191) == 0);
    _;
  }
 
  function claimOwnership() public firstChallenge secondChallenge returns (bool) {
    contractOwner = tx.origin;
    return true;
  }
}
