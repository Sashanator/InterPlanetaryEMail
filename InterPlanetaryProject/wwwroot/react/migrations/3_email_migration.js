const Email = artifacts.require("Email");

module.exports = function(deployer) {
  deployer.deploy(Email);
};
