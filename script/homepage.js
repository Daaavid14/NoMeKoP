
// homepage.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("homepage.js loaded");

  // DOM refs
  const connectBtn = document.getElementById("connectWalletBtn");
  const navHome = document.getElementById("navHome");
  const navMarketplace = document.getElementById("navMarketplace");
  const homeSection = document.getElementById("homeSection");
  const marketplaceSection = document.getElementById("marketplaceSection");
  const marketGrid = document.getElementById("marketGrid");

  // Helper: shorten address
  function shortAddr(addr) {
    if (!addr) return "";
    return addr.slice(0,6) + "..." + addr.slice(-4);
  }

  // Connect wallet action
  async function handleConnectWallet() {
    try {
      const addr = await Web3Client.connectWallet();
      console.log("Connected:", addr);
      connectBtn.innerText = shortAddr(addr);
      // Optionally load owned tokens and marketplace listings now
      await loadOwnedAndListings();
    } catch (err) {
      console.error("connect wallet failed", err);
      alert("Wallet connection failed: " + (err.message || err));
    }
  }

  // Toggle UI
  function showHome() {
    homeSection.style.display = "flex";
    marketplaceSection.style.display = "none";
    window.scrollTo({ top: 0 });
  }
  function showMarketplace() {
    homeSection.style.display = "none";
    marketplaceSection.style.display = "block";
    window.scrollTo({ top: 0 });
  }

  navHome?.addEventListener("click", (e) => { e.preventDefault(); showHome(); });
  navMarketplace?.addEventListener("click", (e) => { e.preventDefault(); showMarketplace(); });

  connectBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    await handleConnectWallet();
  });

  // Load owned tokens and on-chain marketplace listings
  async function loadOwnedAndListings() {
    if (!Web3Client || !Web3Client.isConnected()) {
      console.warn("Web3Client not connected yet.");
      return;
    }

    // 1) load wallet
    const wallet = Web3Client.getWalletAddress();
    console.log("Wallet:", wallet);

    // 2) load owned tokens (if your contract supports nextTokenId/ownerOf)
    let ownedIds = [];
    try {
      ownedIds = await Web3Client.getOwnedTokenIds(wallet);
      console.log("Owned token ids:", ownedIds);
    } catch (err) {
      console.warn("getOwnedTokenIds failed (maybe NFT ABI or contract differs):", err);
    }

    // 3) load marketplace on-chain events or listings if your contract exposes getters
    // If your Marketplace contract does not expose a listAll function, you will need to
    // either read events or maintain an off-chain index. For now we will just display
    // the frontend-local sprites and show BUY -> will call buyWithETH/buyWithPOKE.

    // Render UI with ownedIds info so we can show "SELL" where applicable
    renderMarketplaceCards(ownedIds);
  }

  // Render cards with BUY/SELL hooked to on-chain functions
  function renderMarketplaceCards(ownedIds = [
    
  ]) {
    // The "marketplace.js" already generated sprite cards in marketGrid.
    // We will enhance each card: add random price and attach handlers.
    if (!marketGrid) return;

    // For each .card in grid: add price and update button behavior
    const cards = Array.from(marketGrid.querySelectorAll(".card"));

    cards.forEach(card => {
      // Already has data from marketplace.js: image and .poke-name and buy-btn.
      const nameEl = card.querySelector(".poke-name");
      const buyBtn = card.querySelector(".buy-btn");

      // add price display (random demo price if none)
      let priceEl = card.querySelector(".price");
      if (!priceEl) {
        priceEl = document.createElement("div");
        priceEl.className = "price";
        priceEl.style.margin = "6px 0";
        priceEl.style.fontWeight = "700";
        priceEl.style.color = "#222";
        // Generate random price demo: 0.001 - 0.05 ETH
        const randEth = (Math.random() * 0.049 + 0.001).toFixed(4);
        priceEl.innerText = `${randEth} ETH`;
        // store price as data attribute in wei (string)
        priceEl.dataset.priceWei = BigInt(Math.floor(Number(randEth) * 1e18)).toString();
        card.insertBefore(priceEl, buyBtn);
      }

      // If user owns this pokemon (by name or id), show SELL instead of BUY
      const pokeName = nameEl ? nameEl.innerText.replace(/\s+/g,'_') : null;
      const isOwned = ownedIds && ownedIds.length > 0 && ownedIds.some(id => String(id) === pokeName); // <--- adapt if ownedIds are tokenIds vs sprite names
      // We use name-based ownership only as a demo. In a real setup ownedIds are numeric tokenIds.
      if (isOwned) {
        buyBtn.innerText = "SELL";
        buyBtn.classList.add("sell-btn");
      } else {
        buyBtn.innerText = "BUY";
        buyBtn.classList.remove("sell-btn");
      }

      // Attach click (delegation also exists inside marketplace.js but we override)
      buyBtn.onclick = async (e) => {
        e.preventDefault();
        // require wallet
        if (!Web3Client.isConnected()) {
          try {
            await Web3Client.connectWallet();
            connectBtn.innerText = shortAddr(Web3Client.getWalletAddress());
          } catch (err) {
            alert("Please connect your wallet first.");
            return;
          }
        }

        const priceWei = priceEl ? priceEl.dataset.priceWei : null;

        if (buyBtn.classList.contains("sell-btn")) {
          // SELL: show listing UI using MarketplaceUI.listNFT (this assumes you have a tokenId)
          // For demo: we attempt to list a tokenId = 1 (you should replace with actual owned token id).
          const tokenIdToList = ownedIds[0] || 1;
          const ethPrice = priceEl.dataset.priceWei || "0";
          try {
            const res = await MarketplaceUI.listNFT(null, tokenIdToList, ethPrice, "0");
            if (res.success) {
              alert("Listed for sale on marketplace.");
            } else alert("List failed: " + res.error);
          } catch (err) {
            alert("Listing error: " + err);
          }
          return;
        }

        // BUY flow: call MarketplaceUI.buyWithETH or buyWithPOKE
        // Here we demo buyWithETH
        if (!priceWei) {
          alert("Price unavailable");
          return;
        }

        const listingId = 0; // if your marketplace expects a listingId, adapt here
        try {
          // In your marketplaces.js you have buyWithETH(listingId, priceInWei)
          const result = await MarketplaceUI.buyWithETH(listingId, priceWei);
          if (result.success) {
            alert("Purchase successful!");
            // refresh owned list
            await loadOwnedAndListings();
          } else {
            alert("Purchase failed: " + result.error);
          }
        } catch (err) {
          console.error(err);
          alert("Transaction error: " + (err.message || err));
        }
      };
    });
  }

  // On load: if connected already (page refresh after connect) update button
  try {
    if (Web3Client && Web3Client.isConnected()) {
      connectBtn.innerText = shortAddr(Web3Client.getWalletAddress());
      loadOwnedAndListings();
    }
  } catch (e) {}

  // If marketplace.js generated cards after homepage.js loaded, re-run render once
  // Wait briefly to let marketplace.js populate the grid
  setTimeout(() => renderMarketplaceCards(), 500);
});
