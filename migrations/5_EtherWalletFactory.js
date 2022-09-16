const EtherWalletFactory = artifacts.require("EtherWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(EtherWalletFactory);
};