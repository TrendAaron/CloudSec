const Transfer = artifacts.require("Transfer");

module.exports = function (deployer,networks,account) {
  deployer.deploy(Transfer, account[1]);
};


