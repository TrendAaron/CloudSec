// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Level.sol";
import "./Transfer.sol";

contract TransferFactory is Level {
    function createInstance(address _player)
        public
        payable
        override
        returns (address)
    {
        return address(new Transfer(_player));
    }

    function validateInstance(address payable _instance, address _player)
        public
        view
        override
        returns (bool)
    {
        Transfer instance = Transfer(_instance);
        return instance.balanceOf(_player) == 0;
    }
}
