const votingContractAddress = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const votingABI = [
  "function vote(uint256 proposal) public"
];

// Connect wallet and display balance
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      document.getElementById("walletAddress").textContent = address;

      const balance = await provider.getBalance(address);
      document.getElementById("balance").textContent = ethers.formatEther(balance) + " ETH";
    } catch (error) {
      alert("Wallet connection failed: " + error.message);
    }
  } else {
    alert("MetaMask is not installed.");
  }
}

// Send ETH to another address
async function sendETH() {
  const to = document.getElementById("toAddress").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!to || !amount) {
    alert("Please enter a valid address and amount.");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount)
    });

    await tx.wait();
    alert("Transaction successful!");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
}

// Cast a vote (1 or 2)
async function castVote() {
  const proposalValue = parseInt(document.getElementById("proposal").value);

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(votingContractAddress, votingABI, signer);

    const tx = await contract.vote(proposalValue);
    await tx.wait();

    alert(`Successfully voted for Proposal ${proposalValue}!`);
  } catch (err) {
    alert("Voting failed: " + err.message);
  }
}
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      // Display connected address
      document.getElementById("walletAddress").textContent = address;

      // Fetch and display balance
      const balance = await provider.getBalance(address);
      document.getElementById("balance").textContent = ethers.formatEther(balance) + " ETH";
    } catch (error) {
      alert("Wallet connection failed: " + error.message);
    }
  } else {
    alert("MetaMask is not installed.");
  }
}
window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);
    if (accounts.length > 0) {
      const address = accounts[0];
      document.getElementById("walletAddress").textContent = address;

      const balance = await provider.getBalance(address);
      document.getElementById("balance").textContent = ethers.formatEther(balance) + " ETH";
    }
  }
});
