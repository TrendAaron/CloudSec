const VehicleRegister = artifacts.require("VehicleRegister");

module.exports = function (deployer) {
  deployer.deploy(VehicleRegister);
};
