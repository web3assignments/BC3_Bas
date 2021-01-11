var TestErc721Token = artifacts.require("TestErc721Token");

module.exports = async function(deployer) {
    await deployer.deploy(TestErc721Token);
    Contract = await TestErc721Token.deployed();
    await Contract.addHouse("ipfs://QmfQpEpcY78tGEGVJriRLA89hzJH62J2naGT6SHarPcUct");
};