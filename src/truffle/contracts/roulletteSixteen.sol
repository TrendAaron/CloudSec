// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract roulletteSixteen {
    uint256 public winCondition = 16 ether;
    address public Claimant; 


    uint256 public balance;
    
    
    function viewBalance() public view returns (uint256) {
        return address(this).balance;
    }


    function deposit() public payable {
        require(msg.value == 1 ether, "The amount of ether should be only be equal to 1");


        balance = balance + msg.value;
        // deposit is equal to 16 or not
        balance = address(this).balance;
        require(balance < winCondition, "Balance is less than 16, YOu lose");


        if (balance == winCondition) {
            Claimant = msg.sender;
        }  else {
        }
    }


    function Reward() public {
            require(msg.sender == Claimant, "Address is eligible for the reward");   


            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Failed to send the reward");


    }
}
