//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestErc20Token is ERC20 {
    
    constructor(uint256 initialSupply) ERC20("TestErc20Token", "T-ERC20") {
        _setupDecimals(2);
        _mint(msg.sender, initialSupply); 
    }
}