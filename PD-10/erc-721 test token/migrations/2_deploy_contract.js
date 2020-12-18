var TestErc721Token = artifacts.require("TestErc721Token");

module.exports = async function(deployer) {
    await deployer.deploy(TestErc721Token);
    Contract = await TestErc721Token.deployed();
    await Contract.addHouse("1234AB");
};