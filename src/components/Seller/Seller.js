import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Seller = () => {
  return (
    <>
    <CenterDiv>
        <Title>Seller</Title>
        <Box>
          The new colorway of Air Jordan 1 Low was released recently and you really wanted to buy it. 
          But when you went to your local nike store they were already out of stock. When you were 
          browsing the web you found an online seller that was selling it for a huge amount of money 
          which is not reasonable. You are a bit low on money right now but you really want to buy them!
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the Seller contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>
          The player needs to buy the item for less than the price asked
        </Box>
        <Box>2. Select Seller Workspace</Box>
        <Box>
          3. Call the createInstance with the second account as the player
          address
        </Box>
        <Box>4. Hack the SMART CONTRACT!</Box>
        <CodeDiv>
        <pre>
          <Code>
            {` 
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

              `}
          </Code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Seller






