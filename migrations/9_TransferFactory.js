const TransferFactory = artifacts.require("TransferFactory");

module.exports = function (deployer) {
  deployer.deploy(TransferFactory);
};


