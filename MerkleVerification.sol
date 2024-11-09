// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MerkleVerification {
    address public owner;
    bytes32 public merkleRoot;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Constructor to set the owner during deployment
    constructor() {
        owner = msg.sender;
    }

    // Function to set the Merkle root (only callable by the owner)
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    // Function to verify if a transaction hash is part of the Merkle tree using the Merkle proof
    function verifyTransaction(bytes32[] calldata proof, bytes32 transactionHash) external view returns (bool) {
        bytes32 computedHash = transactionHash;

        for (uint256 i = 0; i < proof.length; i++) {
            if (computedHash < proof[i]) {
                computedHash = keccak256(abi.encodePacked(computedHash, proof[i]));
            } else {
                computedHash = keccak256(abi.encodePacked(proof[i], computedHash));
            }
        }

        return computedHash == merkleRoot;
    }
}
