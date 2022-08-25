// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
 
contract Defense {
   
    address public owner;
 
    constructor()  payable{
        owner = payable(msg.sender);
    }
 
    modifier defenseOne() {
        require(msg.sender != tx.origin);
        _;
    }
 
    modifier defenseTwo() {
        uint z;
        assembly { z := extcodesize(caller()) } 
        require(z == 0); 
        _;
    }
 
    modifier defenseThree(bytes8 _defenceKey) {
        require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_defenceKey) == uint64(0) - 1); 
        _;
    }
 
    function penetrate(bytes8 _defenseKey) public defenseOne defenseTwo defenseThree(_defenseKey) returns (bool) {
        owner = tx.origin;
        return true;
    }
 
    modifier onlyOwner {
            require(
                msg.sender == owner,
                "You are not the owner"
                );
            _;
    }
 
    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
 
    function withdraw() public  onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
