const fs = require("fs");
const contract = JSON.parse(
  fs.readFileSync("../src/truffle/build/contracts/Mine.json", "utf8")
);

const Storage = artifacts.require("Storage");

const address = contract.networks["5777"].address;
console.log(address);
module.exports = (deployer) => {
  deployer.deploy(Storage, address);
};
