const Branches = artifacts.require("Branches");

module.exports = function (deployer) {
  deployer.deploy(Branches);
};
