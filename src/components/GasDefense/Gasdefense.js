import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box } from '.'





const GasDefense = () => {
  return (
    <>
    <CenterDiv>
        <Title>GasDefense</Title>
        <Box>
          You and your younger brother both have crypto accounts and wallets
          since you both play crypto games. Your younger brother wants you to
          play his crypto games for more coins but you think you’re wasting time
          if you play games but you don’t earn for your own wallet. The next
          day, in school, while listening to your crypto teacher, she mentioned
          that you can GasDefense the owner of the wallet but there is some hacking
          involved. With what she said, you immediately got the idea of just
          GasDefenseing your account and your brothers account and play his games.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the GasDefense contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select Seller Workspace</Box>
        <Box>
          3a. Call the createInstance with the second account as the player
          address
        </Box>
        <Box>
          3b. Get the _seller address at the log [this is the address that you
          need to attack]{" "}
        </Box>
        <h4>4. Hack the SMART CONTRACT!</h4>
        <CodeDiv>
        <pre>
          <code>
            {" "}
            {` // SPDX-License-Identifier: MIT
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
          </code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default GasDefense






