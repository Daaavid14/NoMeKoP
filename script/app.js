// ===== SIMPLE RESET SCRIPT =====

let provider = null;
let signer = null;
let userAddress = null;
let isWalletConnected = false;

// DOM helpers
const $ = id => document.getElementById(id);

// Show popup
function showPopup() {
    $("walletPopup").style.display = "flex";
}

// Hide popup
function hidePopup() {
    $("walletPopup").style.display = "none";
}

// Connect wallet
async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();

        isWalletConnected = true;

        // Update button text
        $("connectWalletBtn").innerText =
            userAddress.slice(0, 6) + "..." + userAddress.slice(-4);

        hidePopup(); // close popup after connecting

    } catch (err) {
        alert("Connection failed: " + err.message);
    }
}

// ===== Attach events after DOM loads =====
document.addEventListener("DOMContentLoaded", () => {

    // Connect wallet button
    $("connectWalletBtn").addEventListener("click", connectWallet);

    // Popup buttons
    $("popupConnectBtn").addEventListener("click", connectWallet);
    $("popupCloseBtn").addEventListener("click", hidePopup);

    // Navigation buttons that REQUIRE connection
    const protectedNav = [
        { id: "navMarketplace", href: "marketplace.html" },
        { id: "navPlayGames", href: "lobby.html" },
        { id: "navCollection", href: "collection.html" },
        { id: "navWhitepaper", href: "whitepaper.html" }
    ];

    protectedNav.forEach(nav => {
        const el = $(nav.id);
        if (!el) return;

        el.addEventListener("click", e => {
            if (!isWalletConnected) {
                e.preventDefault();
                showPopup(); // show popup instead of navigating
                return;
            }
            // Navigate if element has no href attribute
            if (!el.getAttribute("href")) window.location.href = nav.href;
        });
    });
});
