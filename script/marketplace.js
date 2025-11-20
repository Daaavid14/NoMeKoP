MarketplaceUI.approvePokeIfNeeded = async function(amountWei) {
    try {
        const poke = Web3Client.getPokeCoinContract();
        const marketAddr = BLOCKCHAIN_CONFIG.MarketplaceAddress;
        const wallet = Web3Client.getSignerAddress();

        const allowance = await poke.allowance(wallet, marketAddr);

        if (BigInt(allowance) >= BigInt(amountWei)) {
            return { success: true, alreadyApproved: true };
        }

        const tx = await poke.approve(marketAddr, amountWei);
        await tx.wait();
        return { success: true };
    } catch (err) {
        console.error("POKE approve error", err);
        return { success: false, error: err.message || err };
    }
};

// ---------------------------------------------------------
// FULL marketplace.js
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    console.log("marketplace.js loaded");

    // ========= DOM Section References =========
    const homeSection = document.getElementById("homeSection");
    const marketplaceSection = document.getElementById("marketplaceSection");
    const marketGrid = document.getElementById("marketGrid");

    // ========= Navbar Buttons =========
    const navHome = document.getElementById("navHome");
    const navMarketplace = document.getElementById("navMarketplace");

    // ========= Page Toggle Functions =========
    function showHome() {
        if (homeSection) homeSection.style.display = "flex";
        if (marketplaceSection) marketplaceSection.style.display = "none";
        window.scrollTo({ top: 0 });
    }

    function showMarketplace() {
        if (homeSection) homeSection.style.display = "none";
        if (marketplaceSection) marketplaceSection.style.display = "block";
        window.scrollTo({ top: 0 });
    }

    // ========= Nav Click Bindings =========
    if (navMarketplace) {
        navMarketplace.addEventListener("click", (e) => {
            e.preventDefault();
            showMarketplace();
        });
    }

    if (navHome) {
        navHome.addEventListener("click", (e) => {
            e.preventDefault();
            showHome();
        });
    }

    // ========= Pokémon List (your spritelist) =========
    const pokemonList = [
        "Absol","Aegislash_Blade","Aegislash_Shield","Aerodactyl","Aggron","Aipom",
        "Alakazam","Altaria","Ambipom","Amoonguss","Ampharos","Anorith","Araquanid",
        "Arbok","Arcanine","Archen","Archeops","Ariados","Armaldo","Aromatisse","Aron",
        "Articuno","Audino","Beedrill","Bibarel","Bidoof","Blaziken","Charmander",
        "Charmeleon","Camerupt","Deoxys","Deoxys_Attack","Deoxys_Defense","Deoxys_Speed",
        "Eevee","Garchomp","Gardevoir","Gallade","Gengar","Giratina_Altered",
        "Giratina_Origin","Heracross","Houndoom","Houndoom_Mega","Keldeo_Ordinary",
        "Keldeo_Resolute","Kyogre","Kyogre_Primal","Kyurem","Kyurem_Black","Kyurem_White",
        "Lycanroc_Dusk","Lycanroc_Midday","Lycanroc_Midnight","Medicham","Meowth",
        "Meowth_Alola","Mewtwo","Pidgeot","Pikachu","Salamence","Sandshrew",
        "Sandshrew_Alola","Sandslash","Sandslash_Alola","Scizor","Steelix",
        "Thundurus_Incarnate","Thundurus_Therian","Tyranitar","Venasaur","Zygarde",
        "Zygarde_10","Zygarde_100"
    ];

    // ========= Marketplace Generation =========
    if (marketGrid && marketGrid.children.length === 0) {

        pokemonList.forEach(name => {

            const card = document.createElement("div");
            card.className = "card";

            const imgPath = `pokeSprites/${name}.gif`;

            card.innerHTML = `
                <img src="${imgPath}" alt="${name}" loading="lazy" onerror="this.src='assets/placeholder.png'">
                <div class="poke-name">${name.replace(/_/g,' ')}</div>
                <button class="buy-btn" data-name="${name}">BUY</button>
            `;

            marketGrid.appendChild(card);
        });

        // Example BUY button interaction
        marketGrid.addEventListener("click", (ev) => {
            const btn = ev.target.closest(".buy-btn");
            if (!btn) return;

            const pokemonName = btn.dataset.name;
            console.log(`BUY clicked for ${pokemonName}`);

            // Placeholder action — replace later with Web3 logic
            alert(`You clicked BUY for ${pokemonName}`);
        });
    }

});
