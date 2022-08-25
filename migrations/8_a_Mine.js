const Mine = artifacts.require("Mine");

module.exports = (deployer) => {
  deployer.deploy(Mine);
};
