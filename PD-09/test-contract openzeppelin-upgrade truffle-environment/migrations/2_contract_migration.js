const TestContract = artifacts.require("TestContract");

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function(deployer) {
    const Test = await deployProxy(TestContract, [3], { deployer });
    console.log(`Address of TestContract: ${Test.address}`);
    var bnx = await Test.value();
    console.log(`Initialized with 3, value is now ${bnx.toString()}`);
    await Test.set(6);
    var bnx = await Test.value();
    console.log(`Called function set(6), value is now ${bnx.toString()}`);
}