const CoinFlipOracle = artifacts.require("CoinFlipOracle");

module.exports = function(deployer,network,accounts) {
  deployer.deploy(CoinFlipOracle);
};
