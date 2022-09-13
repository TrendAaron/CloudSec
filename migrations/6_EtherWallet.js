const EtherWallet = artifacts.require("EtherWallet");

module.exports = function (deployer) {
  deployer.deploy(EtherWallet);
};

const EtherWalletFactory = artifacts.require("EtherWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(EtherWalletFactory);
};
