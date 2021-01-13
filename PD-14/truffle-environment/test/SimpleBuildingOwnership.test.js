const truffleAssert = require('truffle-assertions');
const BN = require('bn.js');

const SimpleBuildingOwnership = artifacts.require("SimpleBuildingOwnership");

contract("destruct contract tests", async accounts => {

    it("should abort with error duo to wrong msg.sender", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await truffleAssert.reverts(instance.destruct({ from: accounts[1] }));
    });

    it("should work with first account as destruct authority", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.destruct({ from: accounts[0] });
    });
});

contract("addBuilding tests", async accounts => {

    it("should add building", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        let result = await instance.addBuilding('test-building', 5, { from: accounts[2] });
        truffleAssert.eventEmitted(result, 'NewBuilding', (ev) => {
            return ev.index.eq(0) && ev.amountOfParts.eq(5), ev.fillPartsAuthority === accounts[2];
        });

        result = await instance.getBuilding.call(0);
        assert.equal(result[0], 'test-building');
        assert.equal(result[1].length, 5);
        assert.equal(result[2], accounts[2]);
    });
});

contract("fillBuildingPart tests", async accounts => {

    it("should not fill building part due to wrong authority", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 5, { from: accounts[2] });
        await truffleAssert.reverts(instance.fillBuildingPart(0, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[1] }));
    });

    it("should fill one building part", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 5, { from: accounts[2] });
        await instance.fillBuildingPart(1, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[2] });
        let result = await instance.getBuildingPart.call(1);
        assert.equal(result[0], accounts[0]);
        assert.equal(result[1], 'test-street');
        assert.equal(result[2], '20a');
        assert.equal(result[3], '1234AB');
        assert.equal(result[4], 'test-city');
    });

    it("should not fill building part due to already filled", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 5, { from: accounts[2] });
        await instance.fillBuildingPart(2, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[2] });
        await truffleAssert.reverts(instance.fillBuildingPart(2, 0, 'test-street2', '3t', '1234YZ', 'test-city2', accounts[4], { from: accounts[2] }));
    });

    it("should fill all building parts", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 2, { from: accounts[2] });
        await instance.fillBuildingPart(3, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[2] });
        await instance.fillBuildingPart(3, 1, 'test-street-2', '20b', '1234AC', 'test-city', accounts[1], { from: accounts[2] });
        let result = await instance.getBuilding.call(3);
        assert.equal(result[0], 'test-building');
        assert.equal(result[1].length, 2);
        assert.equal(result[2], '0x0000000000000000000000000000000000000000');
    });
});

contract("transferBuildingPartOwnership tests", async accounts => {

    it("should not transfer due to not from owner", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 5, { from: accounts[2] });
        await instance.fillBuildingPart(0, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[2] });
        await truffleAssert.reverts(instance.transferBuildingPartOwnership(1, accounts[1], { from: accounts[2] }));
    });

    it("should transfer owner", async () => {
        let instance = await SimpleBuildingOwnership.deployed();
        await instance.addBuilding('test-building', 5, { from: accounts[2] });
        await instance.fillBuildingPart(1, 0, 'test-street', '20a', '1234AB', 'test-city', accounts[0], { from: accounts[2] });
        let result = await instance.getBuildingPart.call(2);
        assert.equal(result[0], accounts[0]);
        await instance.transferBuildingPartOwnership(2, accounts[1], { from: accounts[0] });
        result = await instance.getBuildingPart.call(2);
        assert.equal(result[0], accounts[1]);
    });
});