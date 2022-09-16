const PasswordFactory = artifacts.require("PasswordFactory"); 
module.exports = function (deployer) {
  deployer.deploy(PasswordFactory); 
}