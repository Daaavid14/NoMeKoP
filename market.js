// market.js
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.2/+esm";

/*
  Usage:
  - Set contract addresses below (after deploy on Sepolia)
  - Add HTML elements with ids: connectWalletBtn, accountLabel, listingsDiv, mintForm, listForm, buyForm
  - This file provides helper functions: connect(), initContracts(), createPokemon(), approveMarketplace(), createListing(), buyWithNative(), buyWithToken(), fetchMetadata(), loadListings()
*/

// ---------- CONFIG: replace these after deployment ----------
let NFT_ADDRESS = "0x1D9444B9509D4947E7737486232B6Fc71138d572";         // NomekopPokemons
let TOKEN_ADDRESS = "0x3B0bB7649F8B303BEFc678B77eEcC6333A093ffD";         // PokeToken (ERC20)
let MARKET_ADDRESS = "0xbe86F36E6fFb1CB1C6f7fdDC0fb7fD7669e302c6";     // NomekopMarketplace
const CHAIN = "sepolia"; // used for provider hint
// ----------------------------------------------------------------

let provider, signer, userAddress;
let nftContract, tokenContract, marketContract;

// Minimal ABIs used by this front-end:
const ERC1155_ABI = [
  "function uri(uint256) view returns (string)",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function createPokemon(address to, string memory metadataURI, uint256 initialSupply) returns (uint256)",
  "event PokemonCreated(uint256 indexed tokenId, string uri, uint256 initialSupply)"
];

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const MARKET_ABI = [
  "function createListing(address tokenAddress,uint256 tokenId,uint256 amount,uint256 pricePerUnit,address paymentToken) returns (uint256)",
  "function buyWithNative(uint256 listingId,uint256 buyAmount) payable",
  "function buyWithToken(uint256 listingId,uint256 buyAmount)",
  "function listings(uint256) view returns (address seller,address tokenAddress,uint256 tokenId,uint256 amount,uint256 pricePerUnit,address paymentToken,bool active)",
  "event Listed(uint256 indexed listingId, address seller, address tokenAddr, uint256 tokenId, uint256 amount, uint256 pricePerUnit, address paymentToken)",
  "event Bought(uint256 indexed listingId, address buyer, uint256 amount, uint256 totalPrice)"
];

// ---------- UI hook-up (assumes simple elements exist) ----------
const connectBtn = document.getElementById("connectWalletBtn");
const accountLabel = document.getElementById("accountLabel");
const listingsDiv = document.getElementById("listingsDiv");

connectBtn && (connectBtn.onclick = connect);

// ---------- Connect function ----------
export async function connect() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum, CHAIN);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
  if (connectBtn) connectBtn.innerText = userAddress.slice(0,6) + "..." + userAddress.slice(-4);
  if (accountLabel) accountLabel.innerText = userAddress;
  initContracts();
}

// ---------- Initialize contract objects ----------
export function initContracts() {
  if (!signer) {
    console.warn("No signer, cannot init contracts");
    return;
  }
  nftContract = new ethers.Contract(NFT_ADDRESS, ERC1155_ABI, signer);
  tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
  marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);
}

// ---------- Create a new Pokemon (admin/minter) ----------
export async function createPokemon(metadataURI, initialSupply = 1) {
  if (!nftContract) throw new Error("NFT contract not initialized");
  // metadataURI example: "ipfs://<CID>/metadata.json"
  const tx = await nftContract.createPokemon(await signer.getAddress(), metadataURI, initialSupply);
  const receipt = await tx.wait();
  return receipt;
}

// ---------- Approve marketplace for all seller tokens ----------
export async function approveMarketplace() {
  if (!nftContract) throw new Error("NFT contract not initialized");
  const tx = await nftContract.setApprovalForAll(MARKET_ADDRESS, true);
  return tx.wait();
}

// ---------- Create listing (seller must have tokens and have approved marketplace) ----------
/*
  paymentToken: address(0) for native (ETH), or ERC20 token address for token payments.
  pricePerUnit: for native -> wei (BigInt) (use ethers.parseEther("0.01"))
                for ERC20   -> smallest unit (use ethers.parseUnits(valueStr, decimals))
*/
export async function createListing(tokenAddress, tokenId, amount, pricePerUnit, paymentToken = ethers.ZeroAddress) {
  if (!marketContract) throw new Error("Marketplace contract not initialized");
  const tx = await marketContract.createListing(tokenAddress, tokenId, amount, pricePerUnit, paymentToken);
  const receipt = await tx.wait();
  return receipt;
}

// ---------- Buy listing with native (ETH) ----------
export async function buyWithNative(listingId, buyAmount, pricePerUnitWei) {
  if (!marketContract) throw new Error("Marketplace contract not initialized");
  // compute total and send as value
  const total = BigInt(pricePerUnitWei.toString()) * BigInt(buyAmount);
  const tx = await marketContract.buyWithNative(listingId, buyAmount, { value: total });
  return tx.wait();
}

// ---------- Buy listing with ERC20 token ----------
export async function buyWithToken(listingId, buyAmount) {
  if (!marketContract || !tokenContract) throw new Error("Contracts not initialized");
  // fetch listing to know which token and price to pay
  const L = await marketContract.listings(listingId);
  if (L.paymentToken === ethers.ZeroAddress) throw new Error("Listing expects native payment");
  const pricePerUnit = L.pricePerUnit;
  const total = BigInt(pricePerUnit.toString()) * BigInt(buyAmount);

  // ensure allowance
  const allowance = await tokenContract.allowance(await signer.getAddress(), MARKET_ADDRESS);
  if (BigInt(allowance.toString()) < total) {
    const approveTx = await tokenContract.approve(MARKET_ADDRESS, total.toString());
    await approveTx.wait();
  }

  const tx = await marketContract.buyWithToken(listingId, buyAmount);
  return tx.wait();
}

// ---------- Fetch metadata (IPFS uri -> JSON) ----------
export async function fetchMetadata(tokenId) {
  if (!nftContract) throw new Error("NFT contract not initialized");
  const uri = await nftContract.uri(tokenId);
  const url = uri.startsWith("ipfs://") ? uri.replace("ipfs://", "https://ipfs.io/ipfs/") : uri;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch metadata");
  return resp.json();
}

// ---------- Load recent listings (basic scanning using known listing ids) ----------
export async function loadListings(maxId = 50) {
  if (!marketContract) return;
  listingsDiv && (listingsDiv.innerHTML = "Loading...");
  const html = [];
  for (let id = 1; id <= maxId; id++) {
    try {
      const L = await marketContract.listings(id);
      if (L.active) {
        // fetch metadata from token contract
        const metaUri = await (new ethers.Contract(L.tokenAddress, ["function uri(uint256) view returns (string)"], provider)).uri(L.tokenId);
        const metadata = await fetch(metaUri.startsWith("ipfs://") ? metaUri.replace("ipfs://", "https://ipfs.io/ipfs/") : metaUri).then(r => r.json()).catch(() => null);
        html.push(`
          <div style="border:1px solid #ccc;padding:8px;margin:6px;">
            <strong>Listing #${id}</strong><br/>
            Seller: ${L.seller}<br/>
            Token: ${L.tokenAddress} #${L.tokenId}<br/>
            Amount: ${L.amount.toString()}<br/>
            Price/unit: ${L.pricePerUnit.toString()} ${L.paymentToken === ethers.ZeroAddress ? "wei (native)" : "ERC20"}<br/>
            Name: ${metadata?.name || "n/a"}<br/>
            <button onclick="window.market_buy_native(${id},1)">Buy 1 (native)</button>
            <button onclick="window.market_buy_token(${id},1)">Buy 1 (token)</button>
          </div>
        `);
      }
    } catch (e) {
      // skip missing ids
    }
  }
  listingsDiv && (listingsDiv.innerHTML = html.length ? html.join("") : "No active listings found (in scanned range).");
}

// ---------- Helpers for quick UI binding (expose to window) ----------
window.market_connect = connect;
window.market_createPokemon = async (uri, supply) => { await connectIfNeeded(); return createPokemon(uri, supply); };
window.market_approve = async () => { await connectIfNeeded(); return approveMarketplace(); };
window.market_createListing = async (tokenAddr, tokenId, amount, priceWei, paymentTokenAddr) => { await connectIfNeeded(); return createListing(tokenAddr, tokenId, amount, priceWei, paymentTokenAddr); };
window.market_buy_native = async (id, amt) => { await connectIfNeeded(); const L = await marketContract.listings(id); return buyWithNative(id, amt, L.pricePerUnit); };
window.market_buy_token = async (id, amt) => { await connectIfNeeded(); return buyWithToken(id, amt); };
window.market_loadListings = async (max) => { await connectIfNeeded(); return loadListings(max || 50); };

async function connectIfNeeded() {
  if (!signer) await connect();
}
