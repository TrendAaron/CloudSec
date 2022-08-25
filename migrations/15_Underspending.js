const Underspending = artifacts.require("Underspending");

module.exports = function (deployer) {
  deployer.deploy(Underspending);
};
