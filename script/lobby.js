/* lobby.js - match + VS splash + battle integration
   Updated: automatic matchmaking → immediate VS splash → battle
*/

const spriteFiles = [
"Abomasnow_Mega.gif",
"Aerodactyl_Mega.gif",
"Aggron_Mega.gif",
"Alakazam_Mega.gif",
"Altaria_Mega.gif",
"Ampharos_Mega.gif",
"Audino_Mega.gif",
"Banette_Mega.gif",
"Beedrill_Mega.gif",
"Blastoise_Mega.gif",
"Blaziken_Mega.gif",
"Camerupt_Mega.gif",
"Charizard_MegaY.gif",
"Diancie_Mega.gif",
"Gallade_Mega.gif",
"Garchomp_Mega.gif",
"Gardevoir_Mega.gif",
"Gengar_Mega.gif",
"Glalie_Mega.gif",
"Gyarados_Mega.gif",
"Houndoom_Mega.gif",
"Heracross_Mega.gif",
"Kangaskhan_Mega.gif",
"Latios_Mega.gif",
"Lopunny_Mega.gif",
"Lucario_Mega.gif",
"Manectric_Mega.gif",
"Mawile_Mega.gif",
"Medicham_Mega.gif",
"Meganium.gif",
"Metagross_Mega.gif",
"Mewtwo_MegaX.gif",
"Pidgeot_Mega.gif",
"Pinsir_Mega.gif",
"Sceptile_Mega.gif",
"Sableye_Mega.gif",
"Scizor_Mega.gif",
"Sharpedo_Mega.gif",
"Swampert_Mega.gif",
"Steelix_Mega.gif",
"Tyranitar_Mega.gif",
"Venusaur_Mega.gif",
"Rayquaza_Mega.gif"

];

/* ---------- simple audio manager ---------- */
const audioManager = {
    mainVolume: 1.0,
    sfxVolume: 1.0,
    musicVolume: 1.0,
    muted: false,

    updateVolumes() {
        const effectiveMusicVolume = this.muted ? 0 : Number(this.mainVolume) * Number(this.musicVolume);
        const effectiveSfxVolume = this.muted ? 0 : Number(this.mainVolume) * Number(this.sfxVolume);

        const bg = document.getElementById("bgMusic");
        if (bg) bg.volume = effectiveMusicVolume;

        const click = document.getElementById("clickSound");
        if (click) click.volume = effectiveSfxVolume;
    }
};

/* ---------- simple match client abstraction (simulated) ---------- */
const MatchClient = (function(){
    let connected = false;
    let ws = null;

    return {
        connect() {
            connected = true;
            console.info("MatchClient: connected (simulated)");
        },

        disconnect() {
            if (ws) ws.close();
            connected = false;
        },

        isConnected() { return connected; },

        findMatch({onSearching, onFound, onError}) {
            if (!connected) {
                if (onError) onError("Not connected to match server");
                return { cancel: () => {} };
            }

            let cancelled = false;
            onSearching && onSearching();

            let ticks = 0;
            const tickInterval = setInterval(() => {
                ticks++;
                if (cancelled) {
                    clearInterval(tickInterval);
                } else {
                    onSearching && onSearching(`Searching... ${ticks * 1}s`);
                }
            }, 1000);

            const time = 1200 + Math.floor(Math.random() * 2200);
            const timer = setTimeout(() => {
                if (cancelled) return;
                clearInterval(tickInterval);
                const opp = {
                    id: "opp-" + Math.floor(Math.random() * 10000),
                    name: ["Ryu","Mika","Zeru","Kora","Ash","Moe","Lina"][Math.floor(Math.random()*7)],
                    level: 1 + Math.floor(Math.random()*35),
                    sprite: spriteFiles[Math.floor(Math.random()*spriteFiles.length)]
                };
                onFound && onFound(opp);
            }, time);

            return {
                cancel() {
                    cancelled = true;
                    clearTimeout(timer);
                    clearInterval(tickInterval);
                }
            };
        }
    };
})();

function createBattle(playerSpriteFile, opponent) {

    //////////////////////////////////////////////////////////////
    // 3v3 ROUND ROBIN AXIE STYLE BATTLE WITH ENERGY SYSTEM
    //////////////////////////////////////////////////////////////

    const battleOverlay = document.getElementById("battleOverlay");
    battleOverlay.setAttribute("aria-hidden", "false");

    // ====== 3 Pokémon per team ======
    const playerTeam = [
        { sprite: spriteFiles[0], maxHP: 120, hp: 120 },
        { sprite: spriteFiles[1], maxHP: 120, hp: 120 },
        { sprite: spriteFiles[2], maxHP: 120, hp: 120 }
    ];

    const enemyTeam = [
        { sprite: opponent.sprite, maxHP: 120, hp: 120 },
        { sprite: spriteFiles[Math.floor(Math.random()*spriteFiles.length)], maxHP: 120, hp: 120 },
        { sprite: spriteFiles[Math.floor(Math.random()*spriteFiles.length)], maxHP: 120, hp: 120 }
    ];

    let currentPlayer = 0;
    let currentEnemy  = 0;

    // ====== ENERGY SYSTEM ======
    let energy = 3;
    const maxEnergy = 10;

    // ====== UI ELEMENTS (already in your game) ======
    const playerSprite = document.getElementById("playerSprite");
    const oppSprite     = document.getElementById("oppSprite");

    const playerHPBar   = document.getElementById("playerHP");
    const enemyHPBar    = document.getElementById("oppHP");
    const playerHPText  = document.getElementById("playerHPText");
    const enemyHPText   = document.getElementById("oppHPText");

    const skillCards    = document.getElementById("skillCards");
    const skipBtn       = document.getElementById("skipTurnBtn");
    const forfeitBtn    = document.getElementById("forfeitBtn");

    const damageLayer   = document.getElementById("damageLayer");

    const energyDots    = document.getElementById("energyDots");
    const energyCount   = document.getElementById("energyCount");

    //////////////////////////////////////////////////////////////
    // UI UPDATE HELPERS
    //////////////////////////////////////////////////////////////

    function updateSprites() {
        playerSprite.src = `pokeSprites/${playerTeam[currentPlayer].sprite}`;
        oppSprite.src = `pokeSprites/${enemyTeam[currentEnemy].sprite}`;
        updateHP();
    }

    function updateHP() {
        const p = playerTeam[currentPlayer];
        const e = enemyTeam[currentEnemy];

        playerHPBar.style.width = (p.hp / p.maxHP * 100) + "%";
        enemyHPBar.style.width  = (e.hp / e.maxHP * 100) + "%";

        playerHPText.textContent = `${p.hp} / ${p.maxHP}`;
        enemyHPText.textContent  = `${e.hp} / ${e.maxHP}`;
    }

    function updateEnergy() {
        energyDots.innerHTML = "";

        for (let i = 0; i < energy; i++) {
            const dot = document.createElement("div");
            dot.classList.add("energyDot");
            energyDots.appendChild(dot);
        }

        energyCount.textContent = `${energy} / ${maxEnergy}`;

        refreshCardStates();
    }

    function refreshCardStates() {
        [...skillCards.children].forEach(card => {
            const cost = Number(card.dataset.cost);
            if (energy < cost) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }
        });
    }

    // Floating damage numbers
    function showDamage(target, text) {
        const dm = document.createElement("div");
        dm.classList.add("damageText");
        dm.textContent = text;

        const rect = target.getBoundingClientRect();
        dm.style.left = (rect.left + rect.width / 2) + "px";
        dm.style.top  = (rect.top - 10) + "px";

        damageLayer.appendChild(dm);
        setTimeout(() => dm.remove(), 2000);
    }

    //////////////////////////////////////////////////////////////
    // SKILL / CARDS
    //////////////////////////////////////////////////////////////

    function generateCards() {
        const names = ["Horn Jab", "Leaf Burst", "Wing Smash", "Shell Bash", "Quill Strike"];

        const cards = [];

        for (let i = 0; i < 3; i++) {
            cards.push({
                name: names[Math.floor(Math.random()*names.length)],
                dmg: Math.floor(25 + Math.random()*55),
                cost: Math.floor(1 + Math.random()*3) // 1–3 energy
            });
        }

        return cards;
    }

    function renderCards() {
        skillCards.innerHTML = "";
        const cards = generateCards();

        cards.forEach(skill => {
            const card = document.createElement("div");
            card.classList.add("skill-card");
            card.dataset.cost = skill.cost;

            card.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">⚡ ${skill.cost} • Dmg: ${skill.dmg}</div>
            `;

            card.onclick = () => playerAttack(skill);
            skillCards.appendChild(card);
        });

        refreshCardStates();
    }

    //////////////////////////////////////////////////////////////
    // PLAYER ATTACK TURN
    //////////////////////////////////////////////////////////////

    function playerAttack(skill) {
        const enemy = enemyTeam[currentEnemy];

        // Not enough energy
        if (energy < skill.cost) return;

        // Spend energy
        energy -= skill.cost;
        updateEnergy();

        let damage = skill.dmg;

        // 10% MISS
        if (Math.random() <= 0.20) {
            showDamage(oppSprite, "MISS");
            return setTimeout(enemyAttack, 3000);
        }

        // 1% CRITICAL — double damage
        if (Math.random() <= 0.015) {
            damage *= 2;
            showDamage(oppSprite, "CRIT!");
        }

        enemy.hp -= damage;
        if (enemy.hp < 0) enemy.hp = 0;

        showDamage(oppSprite, `-${damage}`);
        updateHP();

        // Enemy fainted
        if (enemy.hp <= 0) {
            currentEnemy++;

            // All enemy down → victory
            if (currentEnemy >= enemyTeam.length) {
                return endBattle("win");
            }

            updateSprites();
        }

        setTimeout(enemyAttack, 3000)
    }

    //////////////////////////////////////////////////////////////
    // ENEMY ATTACK
    //////////////////////////////////////////////////////////////

    function enemyAttack() {

        const player = playerTeam[currentPlayer];

        let dmg = Math.floor(25 + Math.random()*60);

        // MISS
        if (Math.random() <= 0.20) {
            showDamage(playerSprite, "MISS");
            return nextTurn();
        }

        // CRITICAL
        if (Math.random() <= 0.015) {
            dmg *= 2;
            showDamage(playerSprite, "CRIT!");
        }

        player.hp -= dmg;
        if (player.hp < 0) player.hp = 0;

        showDamage(playerSprite, `-${dmg}`);
        updateHP();

        // Player fainted
        if (player.hp <= 0) {
            currentPlayer++;

            // All player fainted → defeat
            if (currentPlayer >= playerTeam.length) {
                return endBattle("lose");
            }

            updateSprites();
        }

        nextTurn();
    }

    //////////////////////////////////////////////////////////////
    // TURN TRANSITION
    //////////////////////////////////////////////////////////////

    function nextTurn() {
        // Enemy turn replenishes 1 energy
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergy();
        renderCards();
    }

    //////////////////////////////////////////////////////////////
    // BUTTONS: KEEP YOURS
    //////////////////////////////////////////////////////////////

    skipBtn.onclick = () => {
        // Skip gives +1 energy
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergy();
        enemyAttack();
    };

    forfeitBtn.onclick = () => {
        endBattle("lose");
    };

    //////////////////////////////////////////////////////////////
    // END MATCH
    //////////////////////////////////////////////////////////////

    function endBattle(state) {
        battleOverlay.setAttribute("aria-hidden", "true");

        const winnerOverlay = document.getElementById("winnerOverlay");
        const title = document.getElementById("winnerTitle");
        const sprite = document.getElementById("winnerSprite");

        sprite.style.maxHeight = "300px"; // Winner size D fix

        if (state === "win") {
            title.textContent = "YOU WIN!";
            sprite.src = `pokeSprites/${playerTeam[0].sprite}`;
        } else {
            title.textContent = "YOU LOSE!";
            sprite.src = `pokeSprites/${enemyTeam[0].sprite}`;
        }

        winnerOverlay.setAttribute("aria-hidden", "false");
    }

    //////////////////////////////////////////////////////////////
    // START BATTLE
    //////////////////////////////////////////////////////////////

    updateSprites();
    updateEnergy();
    renderCards();
}


function showWinnerScreen(result, playerSpriteFile, opponent) {
    const overlay = document.getElementById("winnerOverlay");
    const title = document.getElementById("winnerTitle");
    const sprite = document.getElementById("winnerSprite");

    const victorySound = document.getElementById("victorySound");
    const defeatSound = document.getElementById("defeatSound");

    // Stop battle music if any
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) bgMusic.pause();

    // WIN or LOSE text + sprite
    if (result === "win") {
        title.textContent = "YOU WIN!";
        sprite.src = `pokeSprites/${playerSpriteFile}`;

        victorySound.currentTime = 0;
        victorySound.volume = 1.0;
        victorySound.play().catch(()=>{});
    } else {
        title.textContent = "YOU LOSE!";
        sprite.src = `pokeSprites/${opponent.sprite}`;

        defeatSound.currentTime = 0;
        defeatSound.volume = 1.0;
        defeatSound.play().catch(()=>{});
    }

    overlay.setAttribute("aria-hidden", "false");

    startFireworks(); // fireworks start
}

// ===== MULTIPLAYER MATCH SERVER INTEGRATION =====
const MATCH_SERVER = (location.hostname === 'localhost')
  ? 'ws://localhost:3000'
  : 'wss://your.match.server:443';

let battleWS = null;

function connectMatchServer() {
  battleWS = new WebSocket(MATCH_SERVER);

  battleWS.onopen = () => {
    console.log("Connected to match server");
  };

  battleWS.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      handleServerMessage(data);
    } catch (e) {
      console.error(e);
    }
  };

  battleWS.onclose = () => {
    console.log("Match server disconnected");
  };
}

async function joinMatch() {
  if (!battleWS || battleWS.readyState !== WebSocket.OPEN) {
    connectMatchServer();
  }

  const wallet = Web3Client.getWalletAddress ? Web3Client.getWalletAddress() : null;
  const equipped = JSON.parse(localStorage.getItem("equippedPokemon") || "[]");

  let meta = { power: 50, equipped };

  // If equipped contains tokenIds, try to load metadata
  if (equipped.length > 0 && /^\d+$/.test(String(equipped[0]))) {
    const metas = [];

    for (let t of equipped) {
      try {
        const tokenURI = await Web3Client.getTokenURI(Number(t));
        const md = await Web3Client.fetchMetadata(tokenURI);
        metas.push(md);
      } catch (e) {
        metas.push(null);
      }
    }

    meta = {
      power: metas.reduce((s,m)=> s + ((m && m.power) ? Number(m.power) : 20), 0),
      equipped: metas
    };
  }

  const payload = {
    type: 'join',
    wallet,
    meta
  };

  battleWS.send(JSON.stringify(payload));
  setLobbyStatus("🔎 Searching for opponent...");
}

function handleServerMessage(data) {
  if (!data || !data.type) return;

  if (data.type === 'match_found') {
    setLobbyStatus("⚔ Match found — Preparing battle...");

    // After server match is found, start battle here:
    const playerSprite = spriteFiles[0]; // Replace if dynamic
    createBattle(playerSprite, data.opponent);

  } else if (data.type === 'match_result') {
    const youWin = data.yourSide === data.winner;
    setLobbyStatus( youWin ? "🏆 You won!" : "💀 You lost" );
  }
}

function setLobbyStatus(msg) {
  const el = document.getElementById('status');
  if (el) {
    el.innerText = msg;
    el.style.display = 'block';
    el.style.opacity = '1';
  }
}

// Expose as global if needed
window.BattleClient = { connectMatchServer, joinMatch };




/* ---------- UI logic + wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const clickSound = document.getElementById("clickSound");
    const buttons = document.querySelector(".buttons");
    const status = document.getElementById("status");
    const settingsSection = document.getElementById("settingsSection");
    const backToLobby = document.getElementById("backToLobby");

    const findMatchBtn = document.getElementById("find-match");
    const pokeSprites = document.getElementById("poke-sprites");
    const achievements = document.getElementById("achievements");
    const settingsBtn = document.getElementById("settings");

    const audioPanel = document.getElementById("audioSettingsPanel");
    const backToSettings = document.getElementById("backToSettings");
    const audioSettingsBtn = document.getElementById("audioSettings");

    const mainVolume = document.getElementById("mainVolume");
    const sfxVolume = document.getElementById("sfxVolume");
    const musicVolume = document.getElementById("musicVolume");

    const pokeSpritesPanel = document.getElementById("pokeSpritesPanel");
    const spritesContainer = document.getElementById("spritesContainer");

    const matchOverlay = document.getElementById("matchOverlay");
    const searchingView = document.getElementById("searchingView");
    const foundView = document.getElementById("foundView");
    const cancelSearchBtn = document.getElementById("cancelSearch");
    const oppAvatar = document.getElementById("oppAvatar");
    const oppName = document.getElementById("oppName");
    const oppInfo = document.getElementById("oppInfo");

    const vsOverlay = document.getElementById("vsOverlay");
    const vsFlash = document.getElementById("vsFlash");
    const vsSparks = document.getElementById("vsSparks");
    const vsImpact = document.getElementById("vsImpact");
    const vsSound = document.getElementById("vsSound");
    const vsPlayerSprite = document.getElementById("vsPlayerSprite");
    const vsOppSprite = document.getElementById("vsOppSprite");
    const vsPlayerName = document.getElementById("vsPlayerName");
    const vsOppName = document.getElementById("vsOppName");

    const winnerOverlay = document.getElementById("winnerOverlay");
    const winnerLobbyBtn = document.getElementById("winnerLobbyBtn");
    const winnerRematchBtn = document.getElementById("winnerRematchBtn");

    winnerLobbyBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        // Close battle and go lobby
        const battleOverlay = document.getElementById("battleOverlay");
        battleOverlay.setAttribute("aria-hidden", "true");
        showLobby();
    });

    winnerRematchBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        // start a fresh battle with same settings
        document.getElementById("battleOverlay").setAttribute("aria-hidden", "false");


       const playerSprite = document.getElementById("playerSprite").src.split("/").pop();
        createBattle(playerSprite, lastOpponentUsed);
    });


    mainVolume.value = audioManager.mainVolume;
    sfxVolume.value = audioManager.sfxVolume;
    musicVolume.value = audioManager.musicVolume;
    audioManager.updateVolumes();

    function hideLobby() {
        buttons.style.opacity = "0";
        setTimeout(() => buttons.style.display = "none", 300);
        backToLobby.style.display = "block";
    }

    function showLobby() {
        settingsSection.style.display = "none";
        audioPanel.style.display = "none";
        pokeSpritesPanel.style.display = "none";

        buttons.style.display = "flex";
        buttons.style.opacity = "1";
        backToLobby.style.display = "none";
    }   

    function showStatus(msg) {
        hideLobby();
        if (clickSound) clickSound.play();

        status.innerText = msg;
        status.style.display = "block";
        setTimeout(() => status.style.opacity = "1", 50);
    }

    backToLobby.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        showLobby();
    });

    settingsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (clickSound) clickSound.play();
        hideLobby();
        setTimeout(() => {
            settingsSection.style.display = "block";
        }, 300);
    });

    pokeSprites.addEventListener("click", (e) => {
        e.preventDefault();
        if (clickSound) clickSound.play();
        hideLobby();
        pokeSpritesPanel.style.display = "block";
        backToLobby.style.display = "block";
        loadAllSprites();
    });

    achievements.addEventListener("click", (e) => {
        e.preventDefault();
        showStatus("🏆 Opening Collections...");
    });

    document.getElementById("fullscreenToggle").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(()=>{});
    } else {
        document.exitFullscreen().catch(()=>{});
    }
});

    audioSettingsBtn.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        settingsSection.style.display = "none";
        audioPanel.style.display = "block";
        backToSettings.style.display = "block";
        backToLobby.style.display = "none";
    });

    backToSettings.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        audioPanel.style.display = "none";
        settingsSection.style.display = "block";
        backToSettings.style.display = "none";
        backToLobby.style.display = "block";
    });

    mainVolume.addEventListener("input", (e) => {
        audioManager.mainVolume = e.target.value;
        audioManager.updateVolumes();
    });

    sfxVolume.addEventListener("input", (e) => {
        audioManager.sfxVolume = e.target.value;
        audioManager.updateVolumes();
    });

    musicVolume.addEventListener("input", (e) => {
        audioManager.musicVolume = e.target.value;
        audioManager.updateVolumes();
    });

    function loadAllSprites() {
        if (spritesContainer.children.length) return;
        spriteFiles.forEach(file => {
            const box = document.createElement("div");
            box.classList.add("sprite-box");

            const img = document.createElement("img");
            img.src = `pokeSprites/${file}`;
            img.alt = file;
            box.appendChild(img);

            spritesContainer.appendChild(box);
        });
    }

    /* ---------- Matchmaking flow ---------- */
    MatchClient.connect();

    let currentSearch = null;
    let currentOpponent = null;

    function openMatchOverlay() {
        matchOverlay.setAttribute('aria-hidden','false');
    }
    function closeMatchOverlay() {
        matchOverlay.setAttribute('aria-hidden','true');
        searchingView.style.display = '';
        foundView.style.display = 'none';
    }

    findMatchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (clickSound) clickSound.play();

        hideLobby();
        openMatchOverlay();
        searchingView.style.display = 'block';
        foundView.style.display = 'none';

        currentSearch = MatchClient.findMatch({
            onSearching: (msg) => {
                searchingView.querySelector('h3').innerText = typeof msg === 'string' ? msg : 'Searching for match...';
            },
            onFound: (opp) => {
                currentOpponent = opp;
                lastOpponentUsed = opp;

                closeMatchOverlay();
                startVsSplash();
            },
            onError: (err) => {
                showStatus("Match error: " + err);
                closeMatchOverlay();
            }
        });
    });

    cancelSearchBtn.addEventListener('click', (e) => {
        if (clickSound) clickSound.play();
        if (currentSearch && currentSearch.cancel) currentSearch.cancel();
        currentSearch = null;
        closeMatchOverlay();
        showLobby();
    });

    /* ESC handling: cancel searching or ignore if in battle */
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            if (matchOverlay.getAttribute('aria-hidden') === 'false') {
                if (currentSearch && currentSearch.cancel) currentSearch.cancel();
                currentSearch = null;
                closeMatchOverlay();
                showLobby();
            }
        }
    });

    /* Preload sprites */
    (function preloadSprites() {
        spriteFiles.forEach(f => {
            const img = new Image();
            img.src = `pokeSprites/${f}`;
        });
    })();

    /* ---------- VS splash controller ---------- */
    function startVsSplash() {
        if (!currentOpponent) {
            console.warn("startVsSplash called without opponent");
            showLobby();
            return;
        }

        // set sprites and names
        vsPlayerSprite.src = `pokeSprites/${spriteFiles[0]}`; // player choice; change as needed
        vsOppSprite.src = `pokeSprites/${currentOpponent.sprite}`;
        vsPlayerName.textContent = "";
        vsOppName.textContent = currentOpponent.name;

        // open VS overlay
        vsOverlay.setAttribute("aria-hidden", "false");

        // visual effects
        vsFlash.style.animation = "flashEffect .9s ease-out";
        vsSparks.style.opacity = "1";
        vsSparks.style.animation = "sparksFlash .7s ease-out";
        vsImpact.style.opacity = "1";
        vsImpact.style.animation = "impactPunch .45s ease-out";

        // sound
        if (vsSound) { vsSound.volume = 1.0; vsSound.play().catch(()=>{}); }
        if (clickSound) clickSound.play();

        // clear temporary effects
        setTimeout(() => {
            vsFlash.style.animation = "";
            vsSparks.style.opacity = "0";
            vsImpact.style.opacity = "0";
        }, 3000);

        // after the animation, close VS and open battle
        setTimeout(() => {
            vsOverlay.setAttribute("aria-hidden", "true");
            // start battle
            const playerSprite = spriteFiles[0];
            createBattle(playerSprite, currentOpponent);
            currentOpponent = null;
        }, 3000);
    }

});
