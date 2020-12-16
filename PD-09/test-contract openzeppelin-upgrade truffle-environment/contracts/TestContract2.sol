import "@openzeppelin/upgrades-core/contracts/Initializable.sol";

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/// @title A test contract with useless functionality
/// @author Bas Bastiaansen
/// @notice This contract is made under education circumstances and is therefore not meant for real-world use
contract TestContract2 is Initializable {
    
    modifier onlyOwner() {
        if (contractOwner != address(0)) {
            require(msg.sender == contractOwner);
        }
        _;
    }

    uint256 public value;
    address public contractOwner;

    function initialize(uint256 v) public initializer {
        value = v;
    }

    function set(uint256 v) public {
        value = v;
    }

    function updateOwner(address newOwner) public onlyOwner {
        contractOwner = newOwner;
    }
}
