import "@openzeppelin/upgrades-core/contracts/Initializable.sol";

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract TestContract is Initializable {

    uint public value;

    function initialize(uint v) public initializer {
        value = v;
    }   

    function set(uint v) public {
        value = v;  
    }
}