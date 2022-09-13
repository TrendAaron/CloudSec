const Crack = artifacts.require("Crack");

module.exports = function (deployer) {
  const code =
    "0x43617074757265546865466c6167205472656e64204d6963726f203230323220";
  deployer.deploy(Crack, code);
};
