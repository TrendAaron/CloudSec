// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 
interface Tree {
  function isLastBranch(uint) external returns (bool);
}
 
 
contract Branches {
 
/*
                            (҂‾ ▵‾)︻デ═一
                            # #### ####
                        ### \/#|### |/####
                       ##\/#/ \||/##/_/##/_#
                     ###  \/###|/ \/ # ###
                   ##_\_#\_\## | #/###_/_####
                  ## #### # \ #| /  #### ##/##
                    __#_--###`  |{,###---###-~
                             \ }{
                              }}{
                              }}{
                              {{}
                        , -=-~{ .-^- _                                       (˚▽˚’!)/                                                                                    
                              `}
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
 
  function see() view public returns(string memory){
    require(top == true,"You haven't reached the top yet");
    return "clear vision of the target!";
  }
 
}
