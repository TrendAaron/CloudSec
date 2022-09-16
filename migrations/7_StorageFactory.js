const StorageFactory = artifacts.require("StorageFactory"); 
module.exports = (deployer) => {
deployer.deploy(StorageFactory);
}