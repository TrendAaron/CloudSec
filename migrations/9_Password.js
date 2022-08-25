const Password = artifacts.require("Password");

module.exports = function (deployer) {
  const pa$$word =
    "0x5472656e644d6963726f204379423372536563557231747920313031203a2900";
  deployer.deploy(Password, pa$$word);
};
