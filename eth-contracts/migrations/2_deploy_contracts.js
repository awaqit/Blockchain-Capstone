// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("./RSERC721Token");
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");

module.exports = async function(deployer, network) {

  if (network === 'development') {
    await deployer.deploy(ERC721Mintable);
  }
  
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
 
};
