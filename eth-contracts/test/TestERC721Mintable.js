var RSERC721Token = artifacts.require('RSERC721Token');

contract('RSERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await RSERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, "");
            await this.contract.mint(account_two, 2, "");
            await this.contract.mint(account_two, 3, "");
            await this.contract.mint(account_two, 4, "");
        })

        it('should return total supply', async function () { 
            let total = await this.contract.totalSupply.call();
            assert.equal(total.toNumber(), 4, "result should be 4");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_two, {from: account_one});
            assert.equal(balance.toNumber(), 4, "balance of account_two should be 4");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1);
            let expectedURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"
            assert.equal(uri, expectedURI, 'URI is not currect');
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 1, {
                from: account_two
            });
            assert(await this.contract.ownerOf(1), account_one, 'Owner should be account_one');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await RSERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let didFailed = false;
            try {
                await this.contract.mint(account_two,1,"",{from: account_two});
              } catch (e) {
                didFailed = true;
              }
              assert.equal(didFailed, true, 'should fail when address is not currect owner');
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call({from: account_one});
            assert.equal(account_one, owner, "account_one should equal to owner");
        })

    });
})