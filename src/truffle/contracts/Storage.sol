// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract Mine {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function thisIsMine() public {
        owner = msg.sender;
    }
}

contract Storage {
    address public owner;
    Mine mineContract;
    event Log(bool result);

    constructor(address _mineAddress) payable {
        mineContract = Mine(_mineAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        (bool result, bytes memory data) = address(mineContract).delegatecall(
            abi.encodeWithSignature("thisIsMine()")
        );
        emit Log(result);
        require(result, "delegatecall failed");
        data;
    }
}
