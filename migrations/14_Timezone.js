const Timezone = artifacts.require("Timezone");

module.exports = function (deployer) {
  deployer.deploy(Timezone);
};
