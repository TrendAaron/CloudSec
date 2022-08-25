// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 



contract underspending {

  mapping(address => uint) balances;
  uint256 public playerAllowance;
  uint256 coinExchangeValue = 2;
  
  constructor()  {
    balances[msg.sender] = playerAllowance = 100;
  }
  
  function exchange(uint _amountToExchange) public returns (bool) {
    require(balances[msg.sender] - _amountToExchange >= 0);

    balances[msg.sender] -= _amountToExchange;
    balances[msg.sender] += (_amountToExchange * coinExchangeValue);

    return true;
  }
  
  function checkBalanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
