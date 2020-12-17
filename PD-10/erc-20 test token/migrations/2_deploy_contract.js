var TestErc20Token = artifacts.require("TestErc20Token");

module.exports = function(deployer) {
  deployer.deploy(TestErc20Token, 10000);
};