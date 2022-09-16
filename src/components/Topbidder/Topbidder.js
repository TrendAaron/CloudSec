import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box } from '.'





const TopBidder = () => {
  return (
    <>
    <CenterDiv>
        <Title>TopBidder</Title>
        <Box>
          You and your younger brother both have crypto accounts and wallets
          since you both play crypto games. Your younger brother wants you to
          play his crypto games for more coins but you think you’re wasting time
          if you play games but you don’t earn for your own wallet. The next
          day, in school, while listening to your crypto teacher, she mentioned
          that you can TopBidder the owner of the wallet but there is some hacking
          involved. With what she said, you immediately got the idea of just
          TopBiddering your account and your brothers account and play his games.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the TopBidder contract and check if tx.origin is secure</Box>
        <Box>2. Drain the account of its balance</Box>
        <Break></Break>

        <Title>How To Play</Title>
        <Box>***** LOOK FOR THE VULNERABILITY AT THE SMART CONTRACT *****</Box>
        <Box>1.Open Remix IDE</Box>
        <Box>2. Select TopBidder Workspace</Box>
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
contract TopBidder {
  address payable topBidder;
  uint public currentBid;
  address payable public owner;
  constructor() payable {
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

              `}
          </code>
        </pre>
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default TopBidder






