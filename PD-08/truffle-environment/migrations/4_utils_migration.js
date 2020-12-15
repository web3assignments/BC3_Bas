const Addresses = artifacts.require("Addresses");
const Integers = artifacts.require("Integers");
const Strings = artifacts.require("Strings");

module.exports = async function(deployer) {
    await deployer.deploy(Addresses);
    await deployer.deploy(Integers);
    await deployer.deploy(Strings);
};