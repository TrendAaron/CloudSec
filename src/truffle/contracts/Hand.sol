// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 



import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract Hand {
  // Player must Identify what hand is holding the coin 


  using SafeMath for uint256;
  uint256 prevHash;
  uint256 ramdomFactor = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  string guessedHand;
  bool hand;


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
    hand = randomHand == 1 ? true : false;


    if (hand == _playerGuess) {
        return guessedHand = "Guessed hand holds the coin";
    } else {       
        return guessedHand = "Guessed hand does not hold the coin";
    }
  }
}
