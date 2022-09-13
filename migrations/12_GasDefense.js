const GasDefense = artifacts.require("GasDefense");

module.exports = function (deployer) {
  deployer.deploy(GasDefense);
};
