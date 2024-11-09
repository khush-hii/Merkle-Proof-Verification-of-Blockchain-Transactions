Merkle Proof Verification of Blockchain Transactions

Overview

This project implements a smart contract on the Ethereum-based Sepolia or zkSync testnets to verify if a transaction is included in a block's Merkle tree. Users can submit a Merkle proof to check if a specific transaction hash is part of the tree. The contract stores the Merkle root and allows verification via a simple ReactJS frontend using Web3.js.

Features
Merkle Root Storage: Stores Merkle root of a block's transactions.
Transaction Verification: Verifies if a transaction is part of the Merkle tree using a Merkle proof.
Owner Access Control: Only the contract owner can set the Merkle root.
Gas Optimization: Efficient gas usage for proof verification.
Frontend Interface: Simple UI to interact with the blockchain.
Prerequisites
MetaMask: Configured for Sepolia or zkSync testnet.
Alchemy: (Optional) for RPC access.
Remix IDE: For deploying the contract.
Node.js: To run the ReactJS frontend.
Setup Instructions
Deploy the Smart Contract

Clone the repository and open Remix IDE.
Paste the MerkleVerification.sol code and deploy it to Sepolia or zkSync.
Save the contract address post-deployment.
Set the Merkle Root

Use the owner's address to call the setMerkleRoot function with the correct Merkle root from the block’s transactions.
Frontend Setup

Install dependencies:
bash
Copy code
npm install web3 react react-dom
Set up Web3.js in app.js to interact with the smart contract using the ABI and contract address.
Run the Application

Open index.html in your browser.
Connect MetaMask to the correct testnet.
Input the transaction hash and Merkle proof to verify.
Smart Contract Functions
setMerkleRoot(bytes32 _merkleRoot): Allows the owner to set the Merkle root.
verifyTransaction(bytes32[] calldata proof, bytes32 transactionHash): Verifies if a transaction is part of the Merkle tree.
Example Input and Output
Input:
Transaction Hash: 0x123...abc
Merkle Proof: ["0xabc...", "0xdef...", "0xghi..."]
Output:
"Transaction is valid" if the proof matches the Merkle root.
"Transaction is not valid" if the proof does not match.
Gas Optimization & Access Control
Gas Optimization: Minimizes storage and computations.
Access Control: Only the contract owner can set the Merkle root.
Edge Cases
Invalid or empty proofs return false.
Only valid Merkle roots can be used for verification.
Troubleshooting
Ensure MetaMask is connected to the correct testnet and unlocked.
Double-check the contract address in the frontend.
Verify Merkle proof format (array of bytes32).
Additional Considerations
Testing: Test with multiple blocks and proofs.
Security: Implement rate-limiting and further gas optimizations for production use.
