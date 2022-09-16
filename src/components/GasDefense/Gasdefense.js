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
        <Box>2. Select GasDefense Workspace</Box>
        <Box>
          3. Call the createInstance with the second account as the player
          address
        </Box>
        <Box>4. Hack the SMART CONTRACT!</Box>
        <CodeDiv>
        <pre>
          <code>
            {" "}
            {` 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
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

              `}
          </code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default GasDefense






