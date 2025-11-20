// battle.js
(function () {
  const MATCH_SERVER = (location.hostname === 'localhost') ? 'ws://localhost:3000' : 'wss://your.match.server:443';
  let ws = null;

  function connectMatchServer() {
    ws = new WebSocket(MATCH_SERVER);
    ws.onopen = () => console.log("Connected to match server");
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        handleServerMessage(data);
      } catch (e) { console.error(e); }
    };
    ws.onclose = () => console.log("Match server disconnected");
  }

  async function joinMatch() {
    if (!ws || ws.readyState !== WebSocket.OPEN) connectMatchServer();

    // get wallet and equipped NFT list from localStorage (as used earlier)
    const wallet = Web3Client.getWalletAddress ? Web3Client.getWalletAddress() : null;
    const equipped = JSON.parse(localStorage.getItem("equippedPokemon") || "[]");

    // Build meta: fetch metadata for each equipped token (only if token ids used)
    // Here we assume equipped array contains filenames OR token ids - adapt accordingly.
    let meta = { power: 50, equipped };

    // If equipped contains tokenIds, attempt to load their metadata
    if (equipped.length > 0 && /^\d+$/.test(String(equipped[0]))) {
      // token ids numeric
      const metas = [];
      for (let t of equipped) {
        try {
          const tokenURI = await Web3Client.getTokenURI(Number(t));
          const md = await Web3Client.fetchMetadata(tokenURI);
          metas.push(md);
        } catch (e) { metas.push(null); }
      }
      // derive simple power
      meta = { power: metas.reduce((s,m) => s + ((m && m.power) ? Number(m.power) : 20), 0), equipped: metas };
    }

    const payload = { type: 'join', wallet, meta };
    ws.send(JSON.stringify(payload));
    showStatus("🔎 Searching for opponent...");
  }

  function handleServerMessage(data) {
    if (!data || !data.type) return;
    if (data.type === 'match_found') {
      showStatus("⚔ Match found — Preparing battle...");
      // optionally render opponent and your equipped sprites inside #battleArena
    } else if (data.type === 'match_result') {
      const youWin = data.yourSide === data.winner;
      showStatus(youWin ? "🏆 You won!" : "💀 You lost");
      // optionally call on-chain reward flow (not automatic)
    }
  }

  function showStatus(msg) {
    const el = document.getElementById('status'); if (!el) return;
    el.innerText = msg; el.style.display = 'block'; el.style.opacity = '1';
  }

  window.BattleClient = { connectMatchServer, joinMatch };
})();
