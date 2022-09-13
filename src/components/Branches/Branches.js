import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Branches = () => {
  return (
    <>
    <CenterDiv>
        <Title>BRANCHES</Title>
        <Box>
        Necessity Technology, Inc hosts these game days for its employees and one of the games 
        were trying who could solve the smart contract the fastest. The contract given to you 
        was about being a kid who has to climb up the tree to get your stuck kite. 
        But no matter how hard you try, you just can’t get to the top. You really want to win the game so you try to analyze the contract really well.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>1. Hack the switch contract and check if tx.origin is secure</Box>
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
        {/* <pre> */}
          <Code>         
          {` 
  // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.16;
        interface Tree {
            function isLastBranch(uint) external returns (bool);
          }
          
        
        contract Branches {
          /*
                  (҂‾ ▵‾)︻デ═一
                  # #### ####
                ###V #|### |/####
                 ##V#/ ||/##/_/##/_#
               ###  V###|/ V # ###
             ##_/_#/_/## | #/###_/_####
            ## #### # / #| /  #### ##/##
            __#_--###  | ###---###-~
              / }{
                }}{
                }}{
                {{}
            , -=-~{ .-^- _                                       (˚▽˚’!)/                                                                                    
                }
                {                                                                  
        */

                    
          bool public top;
          uint public branch;
          
          function climb(uint _branch) public {
            Tree tree = Tree(msg.sender);
          
            if (!tree.isLastBranch(_branch)) {
              branch = _branch;
              top = tree.isLastBranch(branch);
            }
        
        }

              `}
                        
                    

                    

              
          </Code>
        {/* </pre> */}
      </CodeDiv>
      </CenterDiv>

      
    </>
  )
}

export default Branches






