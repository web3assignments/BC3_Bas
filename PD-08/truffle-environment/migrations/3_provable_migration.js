const Buffer = artifacts.require("Buffer");
const CBOR = artifacts.require("CBOR");
const usingProvable = artifacts.require("usingProvable");

module.exports = async function(deployer) {
    await deployer.deploy(Buffer);
    await deployer.deploy(CBOR);
    await deployer.deploy(usingProvable);
};