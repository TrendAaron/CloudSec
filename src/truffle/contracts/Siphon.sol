// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 



import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract Siphon {
  
  using SafeMath for uint256;
  mapping(address => uint256) public balances;


  // User can use this to deposit ethereum
  function deposit() public payable {
    require(balances[msg.sender] >= 1);
    balances[msg.sender] = balances[msg.sender].add(msg.value);
  }


  function withdraw(uint _amount) public {
    (bool result, ) = msg.sender.call{value:_amount}("");
    require(result, "Transaction request failed");
    balances[msg.sender] -= _amount;


  }


}
