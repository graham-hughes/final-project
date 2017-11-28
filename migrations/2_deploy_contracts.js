var StoreFront = artifacts.require("./StoreFront.sol");
var Presentoken = artifacts.require("./Presentoken.sol");

module.exports = function(deployer) {
	deployer.deploy(Presentoken);
	deployer.deploy(StoreFront);
};
