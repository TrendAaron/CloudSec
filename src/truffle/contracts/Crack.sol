// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
 
contract Crack {
    bool public cracked;  
    bytes32 private helper;
    bytes32 private helper2;  
    bytes32 private secret;
    address public owner;
   
 
    constructor(bytes32 _code) payable{
        cracked = false;
        secret = _code;
        owner = msg.sender;
    }
 
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "You are not the owner"
            );
            _;
    }
 
    modifier req1() {
        uint z;
        assembly { z := extcodesize(caller()) } 
        require(z < 1); 
        _;
    }
 
    modifier req2() {
        require(msg.sender != tx.origin);
        _;
    }
 
    function crack(bytes32 _code)  req1 req2 public {
        if (secret == _code) {
            cracked = true;
            owner = tx.origin;
        }
    }
 
    function getMoney() public  onlyOwner {
        if(msg.sender == owner){
            cracked = true;
        }else{
            cracked = false;
        }
        require(cracked == true, "You haven't cracked the code yet!");
        payable(owner).transfer(address(this).balance);
    }
 
    function getBalance() view public returns(uint) {
        return address(this).balance;
    }
 
    fallback() external payable{}
 
    receive() external payable{}
}
