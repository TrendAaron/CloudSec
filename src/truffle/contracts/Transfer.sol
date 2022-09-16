// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Transfer is ERC20 {
    uint256 public transferLockedTime = block.timestamp + 5 * 365 days;
    uint256 public playerSupply;
    address public player;

    constructor(address _playerAddr) ERC20("TrendMicroCoin", "TMC") {
        player = _playerAddr;
        playerSupply = 1000000 * (10**uint256(decimals()));
        _mint(player, playerSupply);
        emit Transfer(address(0), player, playerSupply);
    }

    modifier transferLock() {
        if (msg.sender == player) {
            require(block.timestamp > transferLockedTime);
            _;
        } else {
            _;
        }
    }

    function transfer(address _receiverAddr, uint256 _amount)
        public
        override
        transferLock
        returns (bool)
    {
        return super.transfer(_receiverAddr, _amount);
    }
}
