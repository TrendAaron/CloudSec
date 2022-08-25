// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0; 
contract Mine {
 
  address public owner;
 
  constructor()  {
    owner =  msg.sender;
  }
 
  function thisIsMine() public {
    owner = msg.sender;
  }

}
 
contract Storage {
 
  address public owner;
  Mine mineContract;
 
    constructor(address _mineAddress) payable  {
        mineContract = Mine(_mineAddress);
        owner = msg.sender;
    }
 
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "You are not the owner"
            );
            _;
    }
 
 
    function withdraw() public  onlyOwner {
        payable(owner).transfer(address(this).balance);
 
    }
 
    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
 
    fallback() external  {
 
        (bool result, bytes memory data) = address(mineContract).delegatecall(
            abi.encodeWithSignature("thisIsMine()")
              
            
        );
        require(result, "delegatecall failed");
        data; 
    }
}
