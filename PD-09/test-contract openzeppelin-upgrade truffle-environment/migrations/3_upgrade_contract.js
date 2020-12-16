const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
var TestContract = artifacts.require("TestContract");
var TestContract2 = artifacts.require("TestContract2");

module.exports = async function(deployer) {    
    const Test = await TestContract.deployed();
    const Test2 = await upgradeProxy(Test.address, TestContract2, { deployer });
    console.log(`Address of TestContract: ${Test.address}`);
    console.log(`Address of TestContract2: ${Test2.address}`);
    await Test2.set(7);
    var bnx = await Test2.value();
    console.log(`Called function set(7), value is now ${bnx.toString()}`);
    var bnx = await Test2.contractOwner();
    console.log(`Called contractOwner, ${bnx.toString()}`);
    await Test2.updateOwner("0xDd8434AbebA8c228836a94EACA24568F774417DA");
    var bnx = await Test2.contractOwner();
    console.log(`Called function updateOwner(0xDd8434AbebA8c228836a94EACA24568F774417DA), contractOwner is now ${bnx.toString()}`);
}