import React from 'react'
import { CenterDiv,Break,CodeDiv,Title,Box, Code } from '.'





const Dino = () => {
  return (
    <>
    <CenterDiv>
        <Title>Dino</Title>
        <Box>
          Your professor suddenly shows you a smart contract that has 0 balance. He challenges the class 
          to come up with a way to be able to send money to the contract. But upon looking at the 
          contract, you notice that there are no functions you could use to do such a task. There is only a 
          function that you can call to show the current balance of the contract. The contract just won't 
          take your money.
        </Box>
        <Break></Break>
        <Title>Objectives</Title>
        <Box>The player needs to make the balance of the contract greater than 0.</Box>
        
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

  contract Dino {
  /*
                                                                  I NEED MONEY PLEASE!
                                                      ___._
                                                    .'  <0>'-.._
                                                    /  /.--.____")
                                                  |   \   __.-'~
                                                  |  :  -'/
                                                  /:.  :.-'
  __________                                     | : '. |
  '--.____  '--------.______       _.----.-----./      :/
          '--.__              -----/       -.      __ :/ 
                '-.___           :           \   .'  )/
                      '---._           _.-'   ] /  _/
                          '-._      _/     _/ / _/
                              \_ .-'____.-'__< |  \___
                                <_______.\    \_\_---.7
                                |   /'=r_.-'     _\\ =/
                            .--'   /            ._/'>
                          .'   _.-'
                        / .--'
                        /,/
                        |/)
                        'c=,
  */


      function balanceOf() view public returns(uint) {
          return address(this).balance;
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

export default Dino






