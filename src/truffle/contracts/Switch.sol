// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 
contract Switch {
 
    address public owner;
 
    constructor() payable  {
        owner = msg.sender;
    }
 
    modifier onlyOwner {
            require(
                msg.sender == owner,
                "You are not the owner"
                );
                _;
        }
 
    function switchOwners(address _newOwner) public {
        if (tx.origin != msg.sender) {
        owner = _newOwner;
        }
    }
 
 
    function withdraw() public  onlyOwner {
        payable(owner).transfer(address(this).balance);
 
    }
 
    function getBalance() view public returns(uint) {
        return address(this).balance;
    }
 
 
 
}
