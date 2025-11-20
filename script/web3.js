// web3.js
// Requires: ethers v6 and BLOCKCHAIN_CONFIG in scope (blockchain-config.js)

const Web3Client = (function () {
  let provider = null;
  let signer = null;
  let walletAddress = null;
  let nftContract = null;
  let pokeTokenContract = null;
  let marketplaceContract = null;

  // Minimal ABIs needed for the actions used by the UI.
  const NFT_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function nextTokenId() view returns (uint256)",        // our contract exposes nextTokenId
    "function ownerOf(uint256) view returns (address)",
    "function tokenURI(uint256) view returns (string)",
    "function mintPokemon(string,string,string) external returns (uint256)"
  ];

  const POKE_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"
  ];

  const MARKETPLACE_ABI = [
    "function listNFT(address nftAddress,uint256 tokenId,uint256 priceETH,uint256 pricePOKE) external",
    "function buyWithETH(uint256 listingId) payable external",
    "function buyWithPOKE(uint256 listingId) external",
    "function cancelListing(uint256 listingId) external",
    "event Listed(uint256 indexed listingId, address seller, address nftAddress, uint256 tokenId, uint256 priceETH, uint256 pricePOKE)",
    "event SaleETH(uint256 indexed listingId, address buyer)",
    "event SalePOKE(uint256 indexed listingId, address buyer)",
    "event Cancelled(uint256 indexed listingId)"
  ];

  async function connectWallet() {
    if (!window.ethereum) throw new Error("MetaMask not found");
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    walletAddress = await signer.getAddress();
    // instantiate contracts
    nftContract = new ethers.Contract(BLOCKCHAIN_CONFIG.NomekopNFTAddress, NFT_ABI, signer);
    pokeTokenContract = new ethers.Contract(BLOCKCHAIN_CONFIG.PokeCoinAddress, POKE_ABI, signer);
    marketplaceContract = new ethers.Contract(BLOCKCHAIN_CONFIG.MarketplaceAddress, MARKETPLACE_ABI, signer);
    return walletAddress;
  }

  function isConnected() {
    return !!walletAddress;
  }

  function getSigner() {
    return signer;
  }

  function getProvider() {
    return provider;
  }

  function getContracts() {
    return { nftContract, pokeTokenContract, marketplaceContract };
  }

  // Read all token IDs owned by a wallet by scanning token IDs
  // This uses contract.nextTokenId() to bound the loop (cheap call)
  async function getOwnedTokenIds(addr) {
    if (!nftContract) throw new Error("Contracts not initialized");
    const next = await nftContract.nextTokenId();
    const max = Number(next) - 1;
    const owned = [];
    for (let id = 1; id <= max; id++) {
      try {
        const owner = await nftContract.ownerOf(id);
        if (owner.toLowerCase() === addr.toLowerCase()) {
          owned.push(id);
        }
      } catch (err) {
        // ownerOf may revert if token doesn't exist; skip
      }
    }
    return owned;
  }

  // Read tokenURI (metadata URL)
  async function getTokenURI(tokenId) {
    if (!nftContract) throw new Error("Contracts not initialized");
    return await nftContract.tokenURI(tokenId);
  }

  // Fetch metadata JSON
  async function fetchMetadata(metadataURL) {
    try {
      const res = await fetch(metadataURL);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // Mint (owner-only in the contract). For testing, you probably deploy contract with your wallet as owner.
  async function mintPokemon(name, spriteURL, metadataURL) {
    if (!nftContract) throw new Error("Contracts not initialized");
    const tx = await nftContract.mintPokemon(name, spriteURL, metadataURL);
    const receipt = await tx.wait();
    return receipt;
  }

  // Marketplace helpers (these call contract functions directly, actual UI wrappers live in marketplace.js)
  function getMarketplaceContract() { return marketplaceContract; }
  function getNftContract() { return nftContract; }
  function getPokeContract() { return pokeTokenContract; }
  function getWalletAddress() { return walletAddress; }

  return {
    connectWallet,
    isConnected,
    getSigner,
    getProvider,
    getContracts,
    getWalletAddress,
    getOwnedTokenIds,
    getTokenURI,
    fetchMetadata,
    mintPokemon,
    getMarketplaceContract,
    getNftContract,
    getPokeContract
  };
})();

