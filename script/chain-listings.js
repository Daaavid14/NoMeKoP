// call this after Web3Client is initialized (e.g. after connectWallet) or on page load if provider available
async function loadListingsFromChain(fromBlock = 0) {
  // returns array of { listingId, seller, nftAddress, tokenId, priceETH, pricePOKE, metadata: {name,image,...} }
  if (!window.Web3Client) throw new Error("Web3Client not available");
  const marketplace = Web3Client.getMarketplaceContract();
  const provider = Web3Client.getProvider();

  if (!marketplace || !provider) {
    console.warn("Marketplace contract or provider not ready yet");
    return [];
  }

  try {
    // Query Listed events from the marketplace contract.
    // .queryFilter should be available on ethers Contract; fallback to provider.getLogs if necessary.
    let events = [];
    try {
      // prefer contract.queryFilter (easier decoding)
      const filter = marketplace.filters.Listed();
      events = await marketplace.queryFilter(filter, fromBlock, "latest");
    } catch (errQuery) {
      console.warn("queryFilter failed, falling back to provider.getLogs:", errQuery);
      // fallback: build topic for Listed event using contract.interface
      const iface = marketplace.interface;
      const topic = iface.getEventTopic("Listed"); // ethers.Interface provides this
      const rawLogs = await provider.getLogs({
        address: BLOCKCHAIN_CONFIG.MarketplaceAddress,
        fromBlock,
        toBlock: "latest",
        topics: [topic]
      });
      // decode each raw log
      events = rawLogs.map(log => marketplace.interface.parseLog(log));
      // NOTE: parseLog returns { name, signature, args } but isn't a full event object; adapt below
    }

    // Parse events into listing objects
    const listings = [];

    for (const ev of events) {
      // If event is a full Event object from queryFilter:
      // ev.args => array-like with named properties; ev.args.listingId etc
      // If ev came from parseLog fallback, ev is the parsed log directly.
      const args = ev.args || ev; // fallback
      // Normalizing field names if they are arrays (ethers returns BigInt for uints)
      const listingId = args.listingId !== undefined ? args.listingId.toString() : (args[0] ? args[0].toString() : null);
      const seller = args.seller || args[1] || null;
      const nftAddress = args.nftAddress || args[2] || null;
      const tokenId = args.tokenId !== undefined ? args.tokenId.toString() : (args[3] ? args[3].toString() : null);
      const priceETH = args.priceETH !== undefined ? args.priceETH.toString() : (args[4] ? args[4].toString() : "0");
      const pricePOKE = args.pricePOKE !== undefined ? args.pricePOKE.toString() : (args[5] ? args[5].toString() : "0");

      // fetch metadata (if NFT contract is the NomekopNFT)
      let metadata = null;
      try {
        // If your NFT is the NomekopNFT we can use the Web3Client to call tokenURI
        // If tokenId isn't numeric or the NFT isn't the NomekopNFT, skip.
        const nftContract = Web3Client.getNftContract(); // this is NomekopNFT per web3.js
        if (nftContract && nftAddress && nftAddress.toLowerCase() === BLOCKCHAIN_CONFIG.NomekopNFTAddress.toLowerCase()) {
          const tokenURI = await Web3Client.getTokenURI(Number(tokenId));
          // handle ipfs:// links
          let fetchURL = tokenURI;
          if (typeof fetchURL === "string" && fetchURL.startsWith("ipfs://")) {
            fetchURL = fetchURL.replace("ipfs://", "https://ipfs.io/ipfs/");
          }
          const res = await fetch(fetchURL);
          if (res.ok) {
            metadata = await res.json();
            // If metadata.image is ipfs:// convert
            if (metadata && metadata.image && metadata.image.startsWith("ipfs://")) {
              metadata.image = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
            // If metadata.image is a relative filename (e.g. "Charizard.gif"), map to spriteBaseURL
            if (metadata && metadata.image && !metadata.image.startsWith("http")) {
              metadata.image = (BLOCKCHAIN_CONFIG.spriteBaseURL || "./pokeSprites/") + metadata.image;
            }
          }
        }
      } catch (errMeta) {
        console.warn("metadata fetch failed for tokenId", tokenId, errMeta);
        metadata = null;
      }

      listings.push({
        listingId,
        seller,
        nftAddress,
        tokenId,
        priceETH,   // string (wei)
        pricePOKE,  // string (wei)
        metadata
      });
    }

    return listings;
  } catch (err) {
    console.error("loadListingsFromChain error", err);
    return [];
  }
}

// ------------------------------------------------------
// STEP 2: RENDER ALL LISTINGS TO MARKETPLACE GRID
// ------------------------------------------------------
async function renderListingsToGrid(listings) {
  if (!marketGrid) return;
  marketGrid.innerHTML = ""; // clear existing cards

  for (const listing of listings) {
    const card = document.createElement("div");
    card.className = "card";

    // metadata fallback
    const meta = listing.metadata || {};
    const displayName = meta.name || `#${listing.tokenId}`;
    let imgSrc = meta.image || `${BLOCKCHAIN_CONFIG.spriteBaseURL || './pokeSprites/'}${displayName.replace(/\s+/g,'_')}.gif`;

    // create DOM
    card.innerHTML = `
      <img src="${imgSrc}" alt="${displayName}" loading="lazy" onerror="this.src='assets/placeholder.png'">
      <div class="poke-name">${displayName}</div>
      <div class="price">${formatWeiToEth(listing.priceETH)} ETH</div>
      <div style="margin-top:8px;">
        <button class="buy-btn" data-listing="${listing.listingId}" data-pricewei="${listing.priceETH}">BUY</button>
      </div>
    `;

    marketGrid.appendChild(card);
  }

  // Attach one delegated click handler for BUY buttons
  marketGrid.addEventListener("click", async (ev) => {
    const btn = ev.target.closest(".buy-btn");
    if (!btn) return;
    btn.disabled = true;
    const listingId = btn.dataset.listing;
    const priceWei = btn.dataset.pricewei;

    try {
      if (!Web3Client.isConnected()) {
        await Web3Client.connectWallet();
        // update connect button UI if you have one
        const cb = document.getElementById("connectWalletBtn");
        if (cb) cb.innerText = shortAddr(Web3Client.getWalletAddress());
      }

      // call on-chain buy (ETH)
      const res = await MarketplaceUI.buyWithETH(listingId, priceWei);
      if (res && res.success) {
        alert("Purchase successful!");
        // re-load listings to reflect updated state
        const refreshed = await loadListingsFromChain();
        await renderListingsToGrid(refreshed);
      } else {
        alert("Purchase failed: " + (res && res.error ? res.error : "unknown"));
      }
    } catch (err) {
      console.error("buy error", err);
      alert("Transaction failed: " + (err.message || err));
    } finally {
      btn.disabled = false;
    }
  }, { once: false });
}

// helper to show ETH from wei string
function formatWeiToEth(weiStr) {
  try {
    // ethers.parseEther expects decimal string; use ethers.formatUnits for wei -> eth
    return ethers.formatUnits(BigInt(weiStr).toString(), 18);
  } catch (e) {
    return "0";
  }
}
// ------------------------------------------------------
// Helper: Format wei into readable ETH
// ------------------------------------------------------
function formatWeiToEth(weiStr) {
    try {
        return ethers.formatUnits(BigInt(weiStr), 18);
    } 
    catch (e) {
        return "0";
    }
}

// ------------------------------------------------------
// Helper: Shorten wallet address for UI
// ------------------------------------------------------
function shortAddr(addr) {
    if (!addr) return "";
    return addr.slice(0,6) + "..." + addr.slice(-4);
}

// ------------------------------------------------------
// STEP 3: Initialize on page load
// Load listings and render them
// ------------------------------------------------------
async function initMarketplaceView() {
    try {
        const listings = await loadListingsFromChain();
        await renderListingsToGrid(listings);
    } catch (err) {
        console.error("initMarketplaceView failed:", err);
    }
}


// ------------------------------------------------------
// CALL INIT AUTOMATICALLY WHEN PAGE LOADS
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    // If wallet is already connected, use it
    if (Web3Client && Web3Client.isConnected()) {
        const connectBtn = document.getElementById("connectWalletBtn");
        if (connectBtn) {
            connectBtn.innerText = shortAddr(Web3Client.getWalletAddress());
        }
    }

    // Load marketplace listings immediately (read-only allowed)
    await initMarketplaceView();
});
