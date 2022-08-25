// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
interface Customer {
  function getPrice() external view returns (uint);
}
 
contract Seller {
  /*
 
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒██████████▓▓▓▓▓▓▓▓▓▓
  ██████▓▓▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒▒▒██████████▓▓▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒████▓▓▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒▒▒    ████▒▒▒▒      ▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒                  ██████▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒      ██          ██████▒▒▒▒▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▒▒▒▒▒▒▒▒▒▒      ████      ██████▒▒▒▒▒▒▒▒▓▓
  ▓▓▓▓▓▓            ▒▒▒▒▒▒▒▒▒▒      ████▓▓██████  ▒▒▒▒▒▒▒▒▒▒▓▓
  ▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒      ██████        ▒▒▒▒▒▒▒▒▒▒▓▓
  ▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░              ▒▒▒▒▒▒▒▒▒▒▒▒▓▓
  ▓▓░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒              ▒▒▒▒▒▒▒▒▒▒▒▒▓▓
  ▓▓          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓
  ▓▓▒▒▒▒▒▒▒▒                                                ▓▓
  ▓▓▒▒▒▒▒▒▒▒                                                ▓▓
  ▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 
  */
    uint public itemPrice = 3000;
    bool public isItemSold;
    address public owner;
 
    constructor() {
      owner = msg.sender;
    }
 
    function itemSoldPrice() public view returns (uint){
      require(msg.sender == owner,"you are not the seller");
        require( isItemSold == true, "Item is still not sold");
          require( itemPrice >= 3000, "You have been scammed!!");
              return itemPrice;
    }
 
    function buyItem() public {
            Customer _customer = Customer(msg.sender);
            if (_customer.getPrice() >= itemPrice && !isItemSold) { 
                isItemSold = true;
                itemPrice = _customer.getPrice();
        }
    }
}
