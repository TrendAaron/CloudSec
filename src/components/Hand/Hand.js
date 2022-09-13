import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Switch = () => {
  return (
    <>
    <CenterDiv>
        <Title>Hand</Title>
        <Box>
          A gambling website is currently hosting a guessing game using smart contracts to ensure the 
          security of the game. The owner of the gambling website uses the website for money laundering 
          for a large underground crime family making their transaction untraceable. 
          The guessing game’s smart contract below is used for generating a random Boolean value by 
          the use of the previous block’s hash value. Based on the construction of the smart contract, you 
          have a 50–50 chance of winning. Exploit the system and eliminate the 50% chance of losing! 
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>
          The Player must take no chance in luck, guess the correct hand, and ensure victory in every 
          transaction. Find the vulnerability in the hand’s smart contract. 
        </Box>
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
          <Code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/releasev3.3/contracts/math/SafeMath.sol';
contract Hand {
  // Player must Identify what hand is holding the coin 

  using SafeMath for uint256;
  uint256 prevHash;
  uint256 ramdomFactor = 
  57896044618658097711785492504343953926634992332820282019728792003956564819968;
  string guessedHand;

  // function for placing coin in different hand
  // user's input could be true or false
  function hideCoin(bool _playerGuess) public returns (string memory) {
    uint256 blockHashValue = uint256(blockhash(block.number.sub(1)));

  if (prevHash == blockHashValue) {
  revert();
  }

  prevHash = blockHashValue;
  // further randomizes the value of the hand
  uint256 randomHand = blockHashValue.div(ramdomFactor);
  // sets the hand's value to randomHand
  bool Hand = randomHand == 1 ? true : false;

  if (Hand == _playerGuess) {
      return guessedHand = "Guessed hand holds the coin";
  } else { 
      return guessedHand = "Guessed hand does not hold the coin";
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

export default Switch






