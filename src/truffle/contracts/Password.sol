// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract Password {
    bool public locked;
    bytes32 private code;
    address public owner;
    event Log(string func, address sender, uint256 value);

    constructor(bytes32 _code) payable {
        locked = true;
        code = _code;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function unlock(bytes32 _code) public {
        if (code == _code) {
            locked = false;
        }
    }

    function withdraw() public onlyOwner {
        require(locked == false, "The account is locked!");
        payable(owner).transfer(address(this).balance);
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        require(locked == false && msg.value > 0);
        owner = msg.sender;
    }

    // receive() external payable{
    //     emit Log("Receive",msg.sender,msg.value);
    // }
}
