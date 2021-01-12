const SimpleBuildingOwnership = artifacts.require("SimpleBuildingOwnership");

module.exports = async function(deployer) {
    await deployer.deploy(SimpleBuildingOwnership);
    Contract = await SimpleBuildingOwnership.deployed();
    console.log("Contract deployed!");
};