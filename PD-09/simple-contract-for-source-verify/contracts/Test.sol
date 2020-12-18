//SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

contract Test {

    address payable private owner;
    uint public value;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }
 
    function setValue(uint _value) external {
        value = _value;
    }

    function destruct() external onlyOwner {
        selfdestruct(owner);
    }
}