pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RSERC721Token {
    Verifier private verifierContract;

    constructor(address verifierAddress) public
    {
        verifierContract = Verifier(verifierAddress);
    }

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address to_address;
    }

// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted
mapping (bytes32 => Solution) private solutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 index,  address to_address);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution( uint256 index, address to, bytes32 key) internal {
        solutions[key] = Solution(index, to);
        emit SolutionAdded(index, to);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

function mintNFT(
        address _to,
        uint256 index,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public returns(bool) {

        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        require(solutions[key].to_address == address(0), "already exist");

        require(verifierContract.verifyTx(a, b, c, input), "Invalid solution");

        addSolution(index, _to, key);

        return super.mint(_to, index, "");
    }
}


























