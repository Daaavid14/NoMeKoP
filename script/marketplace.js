    // Update addresses to your deployed contracts
    const CONFIG = { nftAddress: "0x61F9680688aA57E9aF56F21091B860fEF9Ffb1A9", marketplaceAddress: "0x932eAF9A08C1E465A94db0ceDDEdB30aF3D371f6", chainIdHex: "0x5" };
    const marketplaceAbi = [
      "event ItemListed(address indexed nftAddress,uint256 indexed tokenId,address indexed seller,uint256 priceWei)",
      "event ItemBought(address indexed nftAddress,uint256 indexed tokenId,address indexed buyer,uint256 priceWei)",
      "function listings(address,uint256) view returns (address seller,uint256 priceWei)",
      "function buyItem(address nftAddress,uint256 tokenId) payable external"
    ];
    let provider, signer;

    function short(a){return a ? a.slice(0,6) + "..." + a.slice(-4) : "";}
    async function connect() {
      if(!window.ethereum) return alert("Install MetaMask");
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      document.getElementById("connectWalletBtn").innerText = short(await signer.getAddress());
      renderListings();
    }

    document.getElementById("connectWalletBtn").addEventListener("click", connect);

    /* Fetch listings by querying past ItemListed events (simple indexer) */
    async function fetchListedEvents() {
      const readProvider = provider || new ethers.JsonRpcProvider(window.ethereum ? await window.ethereum.request({ method: 'eth_chainId' }) : undefined);
      // Build filter
      const marketplace = new ethers.Contract(CONFIG.marketplaceAddress, marketplaceAbi, readProvider);
      const filter = marketplace.filters.ItemListed(CONFIG.nftAddress);
      // Query logs (fromBlock 0 to latest). For production pick a reasonable fromBlock.
      const logs = await readProvider.getLogs({ ...filter, fromBlock: 0, toBlock: "latest" });
      const iface = new ethers.Interface(marketplaceAbi);
      const events = logs.map(log => iface.parseLog(log));
      return events;
    }

    async function renderListings() {
      const container = document.getElementById("listings");
      container.innerHTML = "Loading listings (scans logs)...";
      try {
        // Simple scan of ItemListed events and check if listing still exists via contract view
        const readProvider = provider || new ethers.JsonRpcProvider(window.ethereum ? await window.ethereum.request({ method: 'eth_chainId' }) : undefined);
        const marketplace = new ethers.Contract(CONFIG.marketplaceAddress, marketplaceAbi, readProvider);
        // Query ItemListed events for this NFT contract
        const iface = new ethers.Interface(marketplaceAbi);
        const filter = marketplace.filters.ItemListed(CONFIG.nftAddress);
        const logs = await readProvider.getLogs({ ...filter, fromBlock: 0, toBlock: "latest" });
        const events = logs.map(log => iface.parseLog(log));
        // Map the latest listing for each tokenId
        const latest = {};
        for(const ev of events) {
          const tid = ev.args.tokenId.toString();
          latest[tid] = { seller: ev.args.seller, priceWei: ev.args.priceWei.toString() };
        }
        // For each candidate, verify it's still listed by calling listings mapping view
        const keys = Object.keys(latest);
        if(keys.length === 0) {
          container.innerHTML = "<i>No listings found.</i>";
          return;
        }
        container.innerHTML = "";
        for(const tid of keys) {
          const info = await marketplace.listings(CONFIG.nftAddress, tid);
          const seller = info.seller;
          const priceWei = info.priceWei.toString();
          if(priceWei === "0") continue; // not listed
          const priceEth = ethers.formatUnits(priceWei, "ether");
          const div = document.createElement("div"); div.className = "card";
          div.innerHTML = `<div class="row"><strong>Token #${tid}</strong> · Seller: ${short(seller)} · Price: ${priceEth} ETH</div>`;
          const buyBtn = document.createElement("button");
          buyBtn.innerText = "Buy";
          buyBtn.addEventListener("click", async ()=> {
            if(!signer) return alert("Connect wallet");
            const mktWithSigner = new ethers.Contract(CONFIG.marketplaceAddress, marketplaceAbi, signer);
            const tx = await mktWithSigner.buyItem(CONFIG.nftAddress, tid, { value: ethers.parseUnits(priceEth, "ether") });
            await tx.wait();
            alert("Bought token " + tid);
            renderListings();
          });
          div.appendChild(buyBtn);
          container.appendChild(div);
        }
      } catch(err) {
        console.error(err);
        container.innerHTML = "Error loading listings: " + (err?.message || err);
      }
    }