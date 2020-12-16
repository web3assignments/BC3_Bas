const SimpleBuildingOwnership = artifacts.require("SimpleBuildingOwnership");

module.exports = async function(deployer) {
    await deployer.deploy(SimpleBuildingOwnership);
};