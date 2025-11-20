// marketplace.js
(async function () {
  // We'll export a small API on window.MarketplaceUI
  async function listNFT(listingIdOrTokenId, tokenId, priceETHInWei = "0", pricePOKE = "0") {
    // listing: nftAddress is NomekopNFTAddress
    try {
      const { getMarketplaceContract, getWalletAddress } = Web3Client;
      const marketplace = getMarketplaceContract();
      const nftAddress = BLOCKCHAIN_CONFIG.NomekopNFTAddress;
      // must have approved marketplace to transfer the NFT
      const tx = await marketplace.listNFT(nftAddress, tokenId, priceETHInWei, pricePOKE);
      await tx.wait();
      return { success: true };
    } catch (err) {
      console.error("listNFT error", err);
      return { success: false, error: err.message || err.toString() };
    }
  }

  async function buyWithETH(listingId, priceInWei) {
    try {
      const m = Web3Client.getMarketplaceContract();
      const tx = await m.buyWithETH(listingId, { value: priceInWei });
      await tx.wait();
      return { success: true };
    } catch (err) {
      console.error("buyWithETH error", err);
      return { success: false, error: err.message || err.toString() };
    }
  }

  async function buyWithPOKE(listingId, pricePOKE) {
    try {
      const poke = Web3Client.getPokeContract();
      const m = Web3Client.getMarketplaceContract();
      const wallet = Web3Client.getWalletAddress();

      // Approve marketplace to spend POKE on buyer behalf
      const allowance = await poke.allowance(wallet, BLOCKCHAIN_CONFIG.MarketplaceAddress);
      if (allowance < pricePOKE) {
        const appTx = await poke.approve(BLOCKCHAIN_CONFIG.MarketplaceAddress, pricePOKE);
        await appTx.wait();
      }

      const tx = await m.buyWithPOKE(listingId);
      await tx.wait();
      return { success: true };
    } catch (err) {
      console.error("buyWithPOKE error", err);
      return { success: false, error: err.message || err.toString() };
    }
  }

  async function cancelListing(listingId) {
    try {
      const m = Web3Client.getMarketplaceContract();
      const tx = await m.cancelListing(listingId);
      await tx.wait();
      return { success: true };
    } catch (err) {
      console.error("cancelListing error", err);
      return { success: false, error: err.message || err.toString() };
    }
  }

  window.MarketplaceUI = {
    listNFT,
    buyWithETH,
    buyWithPOKE,
    cancelListing
  };
})();

