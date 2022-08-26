// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EtherWallet {
    using SafeMath for uint256;
    address public owner;
    mapping(address => uint256) investments;
    event Log(string func, address sender, uint256 value, bytes data);

    constructor() payable {
        owner = payable(msg.sender);
        investments[msg.sender] = 134 * (1 ether);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function invest() public payable {
        require(msg.value < 0.001 ether);
        investments[msg.sender] += msg.value;
        if (investments[msg.sender] >= investments[owner]) {
            owner = msg.sender;
        }
    }

    function getInvestments() public view returns (uint256) {
        return investments[msg.sender];
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function deposit() public payable onlyOwner {}

    function send(address payable to, uint256 amount) public onlyOwner {
        if (msg.sender == owner) {
            to.transfer(amount);

            return;
        }
        revert("You are not allowed to send");
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        emit Log("Fallback", msg.sender, msg.value, msg.data);
    }

    receive() external payable {
        require(investments[msg.sender] > 2 && msg.value > 0);
        owner = msg.sender;
    }
}
