window.onload = async function () {
    // Check if MetaMask is installed
    if (window.ethereum) {
        // Initialize Web3 instance
        const web3 = new Web3(window.ethereum);

        // Set the contract ABI and address (replace with actual values)
        const contractABI = [
            [
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "_merkleRoot",
                            "type": "bytes32"
                        }
                    ],
                    "name": "setMerkleRoot",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "merkleRoot",
                    "outputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes32[]",
                            "name": "proof",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "transactionHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "verifyTransaction",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        ];

        const contractAddress = "0x9114d61f3cda63d09184363acc6d5aa7a2cf120e"; // Replace with your deployed contract address
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Request account access if not already connected
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        // Handle form submission
        document.getElementById("verifyForm").addEventListener("submit", async (event) => {
            event.preventDefault();

            const txHash = document.getElementById("txHash").value;
            const merkleProof = JSON.parse(document.getElementById("merkleProof").value); // Expecting an array in JSON format

            // Convert inputs to the correct types (e.g., bytes32)
            const transactionHash = web3.utils.keccak256(txHash);

            try {
                const isValid = await contract.methods.verifyTransaction(merkleProof, transactionHash).call({ from: currentAccount });
                document.getElementById("verificationStatus").textContent = isValid ? "Transaction is valid!" : "Transaction is not valid!";
            } catch (error) {
                console.error(error);
                document.getElementById("verificationStatus").textContent = "Error verifying transaction!";
            }
        });
    } else {
        alert("MetaMask is not installed!");
    }
};
