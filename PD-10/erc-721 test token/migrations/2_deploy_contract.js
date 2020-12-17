var TestErc721Token = artifacts.require("TestErc721Token");

module.exports = function(deployer) {
  deployer.deploy(TestErc721Token);
};