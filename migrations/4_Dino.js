const Dino = artifacts.require("Dino");

module.exports = function (deployer) {
  deployer.deploy(Dino);
};
