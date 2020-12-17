//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestErc20Token is ERC20 {
    
    constructor(uint256 initialSupply) public ERC20("TestErc20Token", "T-ERC20") {
        _mint(msg.sender, initialSupply);
    }
}