const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

const proofs = require('../../zokrates/code/square/proof');
const index = 1;
contract('SolnSquareVerifier', accounts => {

    describe('Test SolnSquareVerifier', () => {

        beforeEach(async () => {
                const verifier = await Verifier.new({
                    from: accounts[0]
                });
                this.contract = await SolnSquareVerifier.new(verifier.address, {
                    from: accounts[0]
                });
            });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it("should be able to add new solution for contract", async ()=>{
            let proof = proofs.proof;
            let inputs = proofs.inputs;
            const result = await this.contract.mintNFT.call(
                accounts[1],
                index,
                proof.a,
                proof.b,
                proof.c,
                inputs
            );

            assert.equal(result, true, "solution can't be added duplicate");
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("should ERC721 token minted for contract", async ()=>{
            const result = await this.contract.mint.call(accounts[1], index, "", {
                from: accounts[0]
            });

            assert.equal(result, true, 'ERC721 token was not minted');
        });
    });


});