/* ===========================
   FINAL lobby.js - TCG integrated
   Uses base Pokémon names for lookups
   Prebuilds pokemon DB from your sprite list
   Displays 3v3 thumbnails in battle overlay
   API Key: 29ce5536-8e65-4bba-a65b-91ca17805a52
   =========================== */

/* ---------- Your original pokemonData (kept for stats & names) ---------- */
const pokemonData = {
  "Abomasnow_Mega.gif": { 
    name:"Abomasnow", 
    type:"🌱Grass  ❄️Ice",
    hp:100, atk:132, def:105, spd:30, 
    skills:["Icy Vine","Avalanche Toss","Frostbite Spore","Gaia Guard"] 
  },
  "Aerodactyl_Mega.gif": { 
    name:"Aerodactyl", 
    type:"Rock / Flying", 
    hp:100, atk:135, def:85, spd:150, 
    skills:["Stone Peck","Sky Crush","Wing Gust","Rocky Shell"] 
  },
  /* ... (all entries you provided earlier) ... */
  "Rayquaza_Mega.gif": { 
    name:"Rayquaza", 
    type:"Dragon/Flying", 
    hp:100, atk:180, def:100, spd:115,
    skills:["Sky Serpent","Celestial Storm","Tempest Shred","Dragon Scales"] 
  }
};

/* ---------- Your original (now unused for skills) pokemonDB definitions removed at runtime ----------
   We'll prebuild an actual battle DB from spriteFiles and TCG API below.
-------------------------------------------------------------------------- */

/* ---------- spriteFiles (your list) ---------- */
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

/* ===========================
   TCG API: config, caching, normalization
   =========================== */
const POKEMON_TCG_API_KEY = "29ce5536-8e65-4bba-a65b-91ca17805a52";
const TCG_CACHE = {}; // card cache by normalized name

// Name normalization map — add entries as needed
const NAME_NORMALIZATION = {
  // common examples; add more entries as you find mismatches
  "Abomasnow": "Abomasnow",
  "Aerodactyl": "Aerodactyl",
  "Aggron": "Aggron",
  "Alakazam": "Alakazam",
  "Altaria": "Altaria",
  "Ampharos": "Ampharos",
  "Audino": "Audino",
  "Banette": "Banette",
  "Beedrill": "Beedrill",
  "Blastoise": "Blastoise",
  "Blaziken": "Blaziken",
  "Camerupt": "Camerupt",
  "Charizard": "Charizard",
  "Diancie": "Diancie",
  "Gallade": "Gallade",
  "Garchomp": "Garchomp",
  "Gardevoir": "Gardevoir",
  "Gengar": "Gengar",
  "Glalie": "Glalie",
  "Gyarados": "Gyarados",
  "Houndoom": "Houndoom",
  "Heracross": "Heracross",
  "Kangaskhan": "Kangaskhan",
  "Latios": "Latios",
  "Lopunny": "Lopunny",
  "Lucario": "Lucario",
  "Manectric": "Manectric",
  "Mawile": "Mawile",
  "Medicham": "Medicham",
  "Meganium": "Meganium",
  "Metagross": "Metagross",
  "Mewtwo": "Mewtwo",
  "Pidgeot": "Pidgeot",
  "Pinsir": "Pinsir",
  "Sceptile": "Sceptile",
  "Sableye": "Sableye",
  "Scizor": "Scizor",
  "Sharpedo": "Sharpedo",
  "Swampert": "Swampert",
  "Steelix": "Steelix",
  "Tyranitar": "Tyranitar",
  "Venusaur": "Venusaur",
  "Rayquaza": "Rayquaza",
  // Most entries will be normalized by stripping suffixes; include special mappings here
};

// Normalize filenames/labels into TCG-friendly card names
function normalizeNameFromFile(fileNameOrBase) {
  if (!fileNameOrBase) return null;
  // If it looks like a filename, remove extension
  let base = fileNameOrBase.replace(/\.[^/.]+$/, "");
  // Remove common suffixes like _Mega, _Shiny, _X, _Y, _Alolan, _Galarian
  base = base.replace(/_Mega|_Shiny|_Alolan|_Galarian|_X|_Y/gi, "");
  // Replace underscores with spaces
  base = base.replace(/_/g, " ").trim();

  // Try explicit mapping
  if (NAME_NORMALIZATION[base]) return NAME_NORMALIZATION[base];

  // Common special cases for gendered forms
  if (/nidoran/i.test(base)) {
    if (/male/i.test(base) || /♂/.test(base)) return "Nidoran♂";
    if (/female/i.test(base) || /♀/.test(base)) return "Nidoran♀";
  }

  // Mr Mime / Mime Jr punctuation
  base = base.replace(/\bMr\b Mime/i, "Mr. Mime");
  base = base.replace(/\bMime Jr\b/i, "Mime Jr.");

  // Capitalize words
  return base.split(" ").map(s => {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(" ");
}

// Fetch card by name using the TCG v2 cards endpoint
async function fetchTCGPokemonByName(name) {
  if (!name) return null;
  const key = String(name).toLowerCase();
  if (TCG_CACHE[key] !== undefined) return TCG_CACHE[key];

  try {
    // Try exact-match search with quotes, then fallback to unquoted
    const quoted = encodeURIComponent(`"${name}"`);
    const url1 = `https://api.pokemontcg.io/v2/cards?q=name:${quoted}`;
    let res = await fetch(url1, { headers: { "X-Api-Key": POKEMON_TCG_API_KEY }});
    if (!res.ok) {
      // if non-200, record null and return
      console.warn("TCG API non-200:", res.status);
      TCG_CACHE[key] = null;
      return null;
    }
    const j = await res.json();
    if (j && Array.isArray(j.data) && j.data.length) {
      TCG_CACHE[key] = j.data[0];
      return j.data[0];
    }

    // Fallback: try without quotes
    const url2 = `https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(name)}`;
    res = await fetch(url2, { headers: { "X-Api-Key": POKEMON_TCG_API_KEY }});
    if (!res.ok) {
      TCG_CACHE[key] = null;
      return null;
    }
    const j2 = await res.json();
    if (j2 && Array.isArray(j2.data) && j2.data.length) {
      TCG_CACHE[key] = j2.data[0];
      return j2.data[0];
    }

    // Nothing found
    TCG_CACHE[key] = null;
    return null;
  } catch (err) {
    console.error("fetchTCGPokemonByName error", err);
    TCG_CACHE[key] = null;
    return null;
  }
}

// Map TCG attack object to skill shape
function mapTCGAttackToSkill(attack) {
  let damageNum = 0;
  if (attack && attack.damage) {
    const m = String(attack.damage).match(/(\d+)/);
    if (m) damageNum = parseInt(m[1], 10);
  }
  const cost = (Array.isArray(attack.cost) ? attack.cost.length : 1) || 1;

  return {
    name: attack.name || "Attack",
    damage: damageNum,
    dmg: damageNum,
    cost: cost,
    text: attack.text || ""
  };
}

/* ===========================
   Build battle-ready Pokémon objects
   =========================== */
async function buildBattlePokemonFromLocal(fileName) {
  const localData = (pokemonData[fileName] || {});
  const displayName = localData.name || fileName.replace(/\.[^/.]+$/, "").replace(/_Mega|_Shiny|_Alolan|_Galarian|_X|_Y/gi, "").replace(/_/g," ").trim();
  const normalized = NAME_NORMALIZATION[displayName] || normalizeNameFromFile(displayName);
  const card = await fetchTCGPokemonByName(normalized);

  // Determine HP
  const hpVal = (card && card.hp && Number(card.hp)) || (localData.hp) || 100;
  const maxHP = hpVal;

  // Determine stats fallback
  const ATK = localData.atk || 100;
  const DEF = localData.def || 100;
  const SPD = localData.spd || 100;

  // Get skills
  let skills = [];
  if (card && Array.isArray(card.attacks) && card.attacks.length) {
    skills = card.attacks.map(mapTCGAttackToSkill);
  } else if (Array.isArray(localData.skills) && localData.skills.length) {
    // convert local strings or objects
    skills = localData.skills.map(s => {
      if (typeof s === "string") return { name: s, dmg: 40, damage: 40, cost: 1 };
      return {
        name: s.name || "Skill",
        dmg: s.damage || s.dmg || 0,
        damage: s.damage || s.dmg || 0,
        cost: s.cost || 1,
        text: s.text || ""
      };
    });
  } else {
    // default fallback skills
    skills = [
      { name: "Tackle", dmg: 30, damage:30, cost: 1, text: "" },
      { name: "Power Strike", dmg: 60, damage:60, cost: 2, text: "" },
      { name: "Guard", dmg: 0, damage:0, cost: 1, shield: 40, text: "" }
    ];
  }

  return {
    sprite: fileName,
    name: localData.name || normalized || fileName,
    hp: hpVal,
    maxHP: maxHP,
    ATK: ATK,
    DEF: DEF,
    SPD: SPD,
    skills: skills
  };
}

/* ===========================
   Prebuild the in-memory pokemon DB from spriteFiles
   This helps avoid repeated fetches during match setup.
   =========================== */
let PREBUILT_POKEMON_DB = []; // filled with buildBattlePokemonFromLocal results

async function prebuildPokemonDB() {
  try {
    const builds = await Promise.all(spriteFiles.map(fn => buildBattlePokemonFromLocal(fn)));
    PREBUILT_POKEMON_DB = builds.filter(Boolean);
    console.log("Prebuilt pokemon DB:", PREBUILT_POKEMON_DB.length, "entries");
  } catch (e) {
    console.error("Failed to prebuild Pokemon DB:", e);
  }
}

/* ===========================
   UI / Game code (adapted to use PREBUILT_POKEMON_DB)
   Shows 3-player and 3-enemy sprites thumbnails in battle overlay
   =========================== */

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

    return {
        connect() {
            connected = true;
            console.info("MatchClient: connected (simulated)");
        },
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

/* ---------- Battle logic (createBattle adapted) ---------- */

async function createBattle(playerSpriteFile, opponent) {
    // Ensure PREBUILT_POKEMON_DB exists (build on demand if not)
    if (!PREBUILT_POKEMON_DB || PREBUILT_POKEMON_DB.length === 0) {
      // fire and forget prebuild
      prebuildPokemonDB().catch(()=>{});
    }

    const battleOverlay = document.getElementById("battleOverlay");
    if (!battleOverlay) {
      console.error("battleOverlay element missing in DOM");
      return;
    }
    battleOverlay.setAttribute("aria-hidden", "false");

    // Build teams: pick 3 random distinct entries from PREBUILT_POKEMON_DB (fallback to on-the-fly builder)
    const chooseRandomBattlePokemon = async () => {
      if (PREBUILT_POKEMON_DB && PREBUILT_POKEMON_DB.length) {
        const idx = Math.floor(Math.random() * PREBUILT_POKEMON_DB.length);
        // make a deep-ish copy to avoid shared state
        const base = PREBUILT_POKEMON_DB[idx];
        return JSON.parse(JSON.stringify(base));
      } else {
        // fallback: pick random sprite and build on-the-fly
        const file = spriteFiles[Math.floor(Math.random() * spriteFiles.length)];
        return await buildBattlePokemonFromLocal(file);
      }
    };

    const playerTeam = [
      await chooseRandomBattlePokemon(),
      await chooseRandomBattlePokemon(),
      await chooseRandomBattlePokemon()
    ];
    const enemyTeam = [
      await chooseRandomBattlePokemon(),
      await chooseRandomBattlePokemon(),
      await chooseRandomBattlePokemon()
    ];

    // Keep team thumbnails visible: create containers if not present
    let playerThumbs = document.getElementById("playerTeamThumbnails");
    let enemyThumbs = document.getElementById("enemyTeamThumbnails");

    if (!playerThumbs) {
      playerThumbs = document.createElement("div");
      playerThumbs.id = "playerTeamThumbnails";
      playerThumbs.style.position = "absolute";
      playerThumbs.style.left = "20px";
      playerThumbs.style.bottom = "80px";
      playerThumbs.style.display = "flex";
      playerThumbs.style.gap = "8px";
      battleOverlay.appendChild(playerThumbs);
    }

    if (!enemyThumbs) {
      enemyThumbs = document.createElement("div");
      enemyThumbs.id = "enemyTeamThumbnails";
      enemyThumbs.style.position = "absolute";
      enemyThumbs.style.right = "20px";
      enemyThumbs.style.top = "80px";
      enemyThumbs.style.display = "flex";
      enemyThumbs.style.gap = "8px";
      battleOverlay.appendChild(enemyThumbs);
    }

    // Populate thumbnails
    playerThumbs.innerHTML = "";
    enemyThumbs.innerHTML = "";
    playerTeam.forEach((p, i) => {
      const el = document.createElement("img");
      el.src = `pokeSprites/${p.sprite}`;
      el.alt = p.name || p.sprite;
      el.style.width = "80px";
      el.style.height = "80px";
      el.style.objectFit = "contain";
      el.style.borderRadius = "8px";
      el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
      el.dataset.index = i;
      playerThumbs.appendChild(el);
    });
    enemyTeam.forEach((p, i) => {
      const el = document.createElement("img");
      el.src = `pokeSprites/${p.sprite}`;
      el.alt = p.name || p.sprite;
      el.style.width = "80px";
      el.style.height = "80px";
      el.style.objectFit = "contain";
      el.style.borderRadius = "8px";
      el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
      el.dataset.index = i;
      enemyThumbs.appendChild(el);
    });

    // Track current active positions
    let currentPlayer = 0;
    let currentEnemy = 0;

    // energy and UI elements
    let energy = 3;
    const maxEnergy = 10;

    const playerSprite = document.getElementById("playerSprite");
    const oppSprite = document.getElementById("oppSprite");

    const playerHPBar = document.getElementById("playerHP");
    const enemyHPBar = document.getElementById("oppHP");
    const playerHPText = document.getElementById("playerHPText");
    const enemyHPText = document.getElementById("oppHPText");

    const skillCards = document.getElementById("skillCards");
    const skipBtn = document.getElementById("skipTurnBtn");
    const forfeitBtn = document.getElementById("forfeitBtn");

    const damageLayer = document.getElementById("damageLayer") || battleOverlay;

    const energyDots = document.getElementById("energyDots");
    const energyCount = document.getElementById("energyCount");

    function updateSprites() {
        if (playerSprite) playerSprite.src = `pokeSprites/${playerTeam[currentPlayer].sprite}`;
        if (oppSprite) oppSprite.src = `pokeSprites/${enemyTeam[currentEnemy].sprite}`;
        updateHP();
        highlightActiveThumbnails();
    }

    function highlightActiveThumbnails() {
      // subtle highlight of active slot
      [...playerThumbs.children].forEach((el, idx) => {
        el.style.opacity = idx === currentPlayer ? "1" : "0.45";
        el.style.transform = idx === currentPlayer ? "translateY(-6px)" : "translateY(0)";
        el.style.transition = "all 220ms ease";
      });
      [...enemyThumbs.children].forEach((el, idx) => {
        el.style.opacity = idx === currentEnemy ? "1" : "0.45";
        el.style.transform = idx === currentEnemy ? "translateY(-6px)" : "translateY(0)";
        el.style.transition = "all 220ms ease";
      });
    }

    function updateHP() {
        const p = playerTeam[currentPlayer];
        const e = enemyTeam[currentEnemy];
        if (playerHPBar) playerHPBar.style.width = (p.hp / p.maxHP * 100) + "%";
        if (enemyHPBar) enemyHPBar.style.width  = (e.hp / e.maxHP * 100) + "%";
        if (playerHPText) playerHPText.textContent = `${p.hp} / ${p.maxHP}`;
        if (enemyHPText) enemyHPText.textContent  = `${e.hp} / ${e.maxHP}`;
    }

    function updateEnergyUI() {
        if (!energyDots || !energyCount) return;
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
        if (!skillCards) return;
        [...skillCards.children].forEach(card => {
            const cost = Number(card.dataset.cost || 0);
            if (energy < cost) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }
        });
    }

    function showDamage(target, text) {
        const dm = document.createElement("div");
        dm.classList.add("damageText");
        dm.textContent = text;
        // position relative to target if possible
        if (target && target.getBoundingClientRect) {
          const rect = target.getBoundingClientRect();
          dm.style.position = "fixed";
          dm.style.left = (rect.left + rect.width / 2) + "px";
          dm.style.top  = (rect.top - 20) + "px";
        } else {
          dm.style.position = "absolute";
          dm.style.left = "50%";
          dm.style.top  = "50%";
        }
        dm.style.zIndex = 9999;
        damageLayer.appendChild(dm);
        setTimeout(() => dm.remove(), 2000);
    }

    // Render skill cards (skills come from TCG or fallback)
    function renderCards() {
        if (!skillCards) return;
        skillCards.innerHTML = "";
        const skills = (playerTeam[currentPlayer] && playerTeam[currentPlayer].skills) || [];
        skills.forEach(skill => {
            const card = document.createElement("div");
            card.classList.add("skill-card");
            card.dataset.cost = skill.cost || 1;
            const dmgText = (skill.damage || skill.dmg) ? ` • Dmg: ${skill.damage || skill.dmg}` : "";
            const shieldText = skill.shield ? ` • Shield: ${skill.shield}` : "";
            card.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">⚡ ${skill.cost || 1}${dmgText}${shieldText}</div>
            `;
            card.onclick = () => useSkill(skill);
            skillCards.appendChild(card);
        });
        refreshCardStates();
    }

    function useSkill(skill) {
        if (energy < (skill.cost || 1)) return;
        const player = playerTeam[currentPlayer];
        const enemy = enemyTeam[currentEnemy];
        energy -= (skill.cost || 1);
        updateEnergyUI();

        const damageVal = skill.damage || skill.dmg || 0;
        if (damageVal > 0) {
            enemy.hp = Math.max(0, enemy.hp - damageVal);
            showDamage(oppSprite || document.body, `-${damageVal}`);
        }
        if (skill.shield) {
            player.shield = (player.shield || 0) + skill.shield;
            showDamage(playerSprite || document.body, `+${skill.shield} Shield`);
        }
        updateHP();

        if (enemy.hp <= 0) {
            currentEnemy++;
            if (currentEnemy >= enemyTeam.length) return endBattle("win");
            updateSprites();
        }
        setTimeout(enemyAttack, 1200);
    }

    function playerAttack(skill) {
        const enemy = enemyTeam[currentEnemy];
        if (energy < (skill.cost || 1)) return;
        energy -= (skill.cost || 1);
        updateEnergyUI();

        let damage = skill.dmg || skill.damage || 0;
        // MISS 20%
        if (Math.random() <= 0.20) {
            showDamage(oppSprite || document.body, "MISS");
            return setTimeout(enemyAttack, 3000);
        }
        // CRIT 1.5%
        if (Math.random() <= 0.015) {
            damage *= 2;
            showDamage(oppSprite || document.body, "CRIT!");
        }
        enemy.hp -= damage;
        if (enemy.hp < 0) enemy.hp = 0;
        showDamage(oppSprite || document.body, `-${damage}`);
        updateHP();
        if (enemy.hp <= 0) {
            currentEnemy++;
            if (currentEnemy >= enemyTeam.length) return endBattle("win");
            updateSprites();
        }
        setTimeout(enemyAttack, 3000);
    }

    function enemyAttack() {
        const player = playerTeam[currentPlayer];
        let dmg = Math.floor(25 + Math.random()*60);
        if (Math.random() <= 0.20) {
            showDamage(playerSprite || document.body, "MISS");
            return nextTurn();
        }
        if (Math.random() <= 0.015) {
            dmg *= 2;
            showDamage(playerSprite || document.body, "CRIT!");
        }
        player.hp -= dmg;
        if (player.hp < 0) player.hp = 0;
        showDamage(playerSprite || document.body, `-${dmg}`);
        updateHP();
        if (player.hp <= 0) {
            currentPlayer++;
            if (currentPlayer >= playerTeam.length) return endBattle("lose");
            updateSprites();
        }
        nextTurn();
    }

    function nextTurn() {
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergyUI();
        renderCards();
    }

    skipBtn && (skipBtn.onclick = () => {
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergyUI();
        enemyAttack();
    });

    forfeitBtn && (forfeitBtn.onclick = () => endBattle("lose"));

    function endBattle(state) {
        battleOverlay.setAttribute("aria-hidden", "true");
        const winnerOverlay = document.getElementById("winnerOverlay");
        const title = document.getElementById("winnerTitle");
        const sprite = document.getElementById("winnerSprite");
        if (state === "win") {
            title.textContent = "YOU WIN!";
            sprite.src = `pokeSprites/${playerTeam[0].sprite}`;
        } else {
            title.textContent = "YOU LOSE!";
            sprite.src = `pokeSprites/${enemyTeam[0].sprite}`;
        }
        winnerOverlay.setAttribute("aria-hidden", "false");
    }

    // Start battle visuals
    updateSprites();
    updateEnergyUI();
    renderCards();
}

/* ---------- winner screen helper ---------- */
function showWinnerScreen(result, playerSpriteFile, opponent) {
    const overlay = document.getElementById("winnerOverlay");
    const title = document.getElementById("winnerTitle");
    const sprite = document.getElementById("winnerSprite");
    const victorySound = document.getElementById("victorySound");
    const defeatSound = document.getElementById("defeatSound");
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) bgMusic.pause();
    if (result === "win") {
        title.textContent = "YOU WIN!";
        sprite.src = `pokeSprites/${playerSpriteFile}`;
        victorySound && (victorySound.currentTime = 0, victorySound.volume = 1.0, victorySound.play().catch(()=>{}));
    } else {
        title.textContent = "YOU LOSE!";
        sprite.src = `pokeSprites/${opponent.sprite}`;
        defeatSound && (defeatSound.currentTime = 0, defeatSound.volume = 1.0, defeatSound.play().catch(()=>{}));
    }
    overlay.setAttribute("aria-hidden", "false");
    if (typeof startFireworks === "function") {
      try { startFireworks(); } catch (e) {}
    }
}

/* ===== MULTIPLAYER MATCH SERVER INTEGRATION (unchanged) ===== */
const MATCH_SERVER = (location.hostname === 'localhost') ? 'ws://localhost:3000' : 'wss://your.match.server:443';
let battleWS = null;
function connectMatchServer() {
  battleWS = new WebSocket(MATCH_SERVER);
  battleWS.onopen = () => console.log("Connected to match server");
  battleWS.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      handleServerMessage(data);
    } catch (e) { console.error(e); }
  };
  battleWS.onclose = () => console.log("Match server disconnected");
}

async function joinMatch() {
  if (!battleWS || battleWS.readyState !== WebSocket.OPEN) connectMatchServer();
  const wallet = Web3Client && Web3Client.getWalletAddress ? Web3Client.getWalletAddress() : null;
  const equipped = JSON.parse(localStorage.getItem("equippedPokemon") || "[]");
  let meta = { power: 50, equipped };
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
    meta = { power: metas.reduce((s,m)=> s + ((m && m.power) ? Number(m.power) : 20), 0), equipped: metas };
  }
  const payload = { type: 'join', wallet, meta };
  battleWS.send(JSON.stringify(payload));
  setLobbyStatus("🔎 Searching for opponent...");
}

function handleServerMessage(data) {
  if (!data || !data.type) return;
  if (data.type === 'match_found') {
    setLobbyStatus("⚔ Match found — Preparing battle...");
    const playerSprite = spriteFiles[0];
    createBattle(playerSprite, data.opponent);
  } else if (data.type === 'match_result') {
    const youWin = data.yourSide === data.winner;
    setLobbyStatus( youWin ? "🏆 You won!" : "💀 You lost" );
  }
}

function setLobbyStatus(msg) {
  const el = document.getElementById('status');
  if (el) { el.innerText = msg; el.style.display = 'block'; el.style.opacity = '1'; }
}

/* ---------- UI helper: showPokemon / navigation ---------- */
let currentPokemonIndex = 0;
function showPokemon(i) {
    const file = spriteFiles[i];
    const p = pokemonData[file] || {};
    const sliderSprite = document.getElementById("sliderSprite");
    if (sliderSprite) sliderSprite.src = `pokeSprites/${file}`;
    const infoName = document.getElementById("infoName");
    const infoType = document.getElementById("infoType");
    const infoHP = document.getElementById("infoHP");
    const infoAtk = document.getElementById("infoAtk");
    const infoDef = document.getElementById("infoDef");
    if (infoName) infoName.textContent = p?.name || "---";
    if (infoType) infoType.textContent = "" + (p?.type || "");
    if (infoHP) infoHP.textContent = " HP: " + (p?.hp || "--");
    if (infoAtk) infoAtk.textContent = "ATK: " + (p?.atk || "--");
    if (infoDef) infoDef.textContent = "DEF: " + (p?.def || "--");
}

/* ---------- DOM wiring & initialization ---------- */
document.addEventListener("DOMContentLoaded", () => {
    // audio & controls
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

    // Back and rematch buttons
    winnerLobbyBtn && winnerLobbyBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        const battleOverlay = document.getElementById("battleOverlay");
        battleOverlay.setAttribute("aria-hidden", "true");
        showLobby();
    });

    winnerRematchBtn && winnerRematchBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        document.getElementById("battleOverlay").setAttribute("aria-hidden", "false");
        const playerSprite = document.getElementById("playerSprite").src.split("/").pop();
        createBattle(playerSprite, lastOpponentUsed);
    });

    mainVolume && (mainVolume.value = audioManager.mainVolume);
    sfxVolume && (sfxVolume.value = audioManager.sfxVolume);
    musicVolume && (musicVolume.value = audioManager.musicVolume);
    audioManager.updateVolumes();

    function hideLobby() {
        if (buttons) {
          buttons.style.opacity = "0";
          setTimeout(() => buttons.style.display = "none", 300);
        }
        backToLobby && (backToLobby.style.display = "block");
    }

    function showLobby() {
        settingsSection && (settingsSection.style.display = "none");
        audioPanel && (audioPanel.style.display = "none");
        pokeSpritesPanel && (pokeSpritesPanel.style.display = "none");
        const tb = document.querySelector(".top-bar");
        if (tb) tb.style.display = "flex";
        if (buttons) { buttons.style.display = "flex"; buttons.style.opacity = "1"; }
        backToLobby && (backToLobby.style.display = "none");
    }

    function showStatus(msg) {
        hideLobby();
        clickSound && clickSound.play();
        if (status) {
          status.innerText = msg;
          status.style.display = "block";
          setTimeout(() => status.style.opacity = "1", 50);
        }
    }

    backToLobby && backToLobby.addEventListener("click", () => {
        clickSound && clickSound.play();
        showLobby();
    });

    settingsBtn && settingsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        clickSound && clickSound.play();
        hideLobby();
        setTimeout(() => { settingsSection && (settingsSection.style.display = "block"); }, 300);
    });

    pokeSprites && pokeSprites.addEventListener("click", (e) => {
        const tb = document.querySelector(".top-bar");
        if (tb) tb.style.display = "none";
        currentPokemonIndex = 0;
        showPokemon(0);
        e.preventDefault();
        clickSound && clickSound.play();
        hideLobby();
        pokeSpritesPanel && (pokeSpritesPanel.style.display = "block");
        backToLobby && (backToLobby.style.display = "block");
        loadAllSprites();
    });

    achievements && achievements.addEventListener("click", (e) => {
        e.preventDefault();
        showStatus("🏆 Opening Collections...");
    });

    const fullscreenToggle = document.getElementById("fullscreenToggle");
    fullscreenToggle && fullscreenToggle.addEventListener("click", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
      else document.exitFullscreen().catch(()=>{});
    });

    audioSettingsBtn && audioSettingsBtn.addEventListener("click", () => {
        clickSound && clickSound.play();
        settingsSection && (settingsSection.style.display = "none");
        audioPanel && (audioPanel.style.display = "block");
        backToSettings && (backToSettings.style.display = "block");
        backToLobby && (backToLobby.style.display = "none");
    });

    backToSettings && backToSettings.addEventListener("click", () => {
        clickSound && clickSound.play();
        audioPanel && (audioPanel.style.display = "none");
        settingsSection && (settingsSection.style.display = "block");
        backToSettings.style.display = "none";
        backToLobby && (backToLobby.style.display = "block");
    });

    mainVolume && mainVolume.addEventListener("input", (e) => { audioManager.mainVolume = e.target.value; audioManager.updateVolumes();});
    sfxVolume && sfxVolume.addEventListener("input", (e) => { audioManager.sfxVolume = e.target.value; audioManager.updateVolumes();});
    musicVolume && musicVolume.addEventListener("input", (e) => { audioManager.musicVolume = e.target.value; audioManager.updateVolumes();});

    function loadAllSprites() {
        const container = document.getElementById("spritesContainer");
        if (container && container.children.length) return;
        const spritesContainerLocal = container || spritesContainer;
        spriteFiles.forEach(file => {
            const box = document.createElement("div");
            box.classList.add("sprite-box");
            const img = document.createElement("img");
            img.src = `pokeSprites/${file}`;
            img.alt = file;
            box.appendChild(img);
            (spritesContainerLocal || spritesContainer).appendChild(box);
        });
    }

    /* ---------- Matchmaking flow ---------- */
    MatchClient.connect();
    let currentSearch = null;
    let currentOpponent = null;
    let lastOpponentUsed = null;

    function openMatchOverlay() {
        matchOverlay && matchOverlay.setAttribute('aria-hidden','false');
    }
    function closeMatchOverlay() {
        matchOverlay && matchOverlay.setAttribute('aria-hidden','true');
        searchingView && (searchingView.style.display = '');
        foundView && (foundView.style.display = 'none');
    }

    findMatchBtn && findMatchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        clickSound && clickSound.play();
        hideLobby();
        openMatchOverlay();
        searchingView && (searchingView.style.display = 'block');
        foundView && (foundView.style.display = 'none');

        currentSearch = MatchClient.findMatch({
            onSearching: (msg) => {
                if (searchingView) searchingView.querySelector('h3').innerText = typeof msg === 'string' ? msg : 'Searching for match...';
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

    cancelSearchBtn && cancelSearchBtn.addEventListener('click', (e) => {
        clickSound && clickSound.play();
        if (currentSearch && currentSearch.cancel) currentSearch.cancel();
        currentSearch = null;
        closeMatchOverlay();
        showLobby();
    });

    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            if (matchOverlay && matchOverlay.getAttribute('aria-hidden') === 'false') {
                if (currentSearch && currentSearch.cancel) currentSearch.cancel();
                currentSearch = null;
                closeMatchOverlay();
                showLobby();
            }
        }
    });

    // Preload sprites
    (function preloadSprites() {
        spriteFiles.forEach(f => {
            const img = new Image();
            img.src = `pokeSprites/${f}`;
        });
    })();

    // Kick off async prebuild of pokemon DB (non-blocking)
    prebuildPokemonDB().catch(()=>{});

    /* ---------- VS splash controller ---------- */
    function startVsSplash() {
        if (!currentOpponent) {
            console.warn("startVsSplash called without opponent");
            showLobby();
            return;
        }
        vsPlayerSprite && (vsPlayerSprite.src = `pokeSprites/${spriteFiles[0]}`);
        vsOppSprite && (vsOppSprite.src = `pokeSprites/${currentOpponent.sprite}`);
        vsPlayerName && (vsPlayerName.textContent = "");
        vsOppName && (vsOppName.textContent = currentOpponent.name);
        vsOverlay && vsOverlay.setAttribute("aria-hidden", "false");
        if (vsFlash) { vsFlash.style.animation = "flashEffect .9s ease-out"; }
        if (vsSparks) { vsSparks.style.opacity = "1"; vsSparks.style.animation = "sparksFlash .7s ease-out"; }
        if (vsImpact) { vsImpact.style.opacity = "1"; vsImpact.style.animation = "impactPunch .45s ease-out"; }
        if (vsSound) { vsSound.volume = 1.0; vsSound.play().catch(()=>{}); }
        clickSound && clickSound.play();
        setTimeout(() => {
            if (vsFlash) vsFlash.style.animation = "";
            if (vsSparks) vsSparks.style.opacity = "0";
            if (vsImpact) vsImpact.style.opacity = "0";
        }, 3000);
        setTimeout(() => {
            vsOverlay && vsOverlay.setAttribute("aria-hidden", "true");
            const playerSprite = spriteFiles[0];
            createBattle(playerSprite, currentOpponent);
            currentOpponent = null;
        }, 3000);
    }

    /* ---------- View Details: fetch TCG attacks then show ---------- */
    const viewDetailsBtn = document.getElementById("viewDetailsBtn");
    viewDetailsBtn && viewDetailsBtn.addEventListener("click", async () => {
        const file = spriteFiles[currentPokemonIndex];
        const p = pokemonData[file] || {};
        const pokemonName = p.name || file.replace(/_.+$/, "").replace(".gif","");

        // fetch TCG skills (with fallback)
        const normalized = normalizeNameFromFile(pokemonName);
        const card = await fetchTCGPokemonByName(normalized);
        let skills = [];
        if (card && Array.isArray(card.attacks) && card.attacks.length) {
          skills = card.attacks.map(mapTCGAttackToSkill);
        } else if (p && Array.isArray(p.skills)) {
          skills = p.skills.map(s => (typeof s === "string") ? { name: s, dmg:40, damage:40, cost:1 } : { name: s.name||"Skill", dmg:s.damage||s.dmg||0, damage:s.damage||s.dmg||0, cost:s.cost||1, text:s.text||"" });
        } else {
          skills = [
            { name: "Tackle", dmg: 30, damage:30, cost: 1, text: "" },
            { name: "Power Strike", dmg: 60, damage:60, cost: 2, text: "" }
          ];
        }

        const skillsList = document.getElementById("skillsList");
        if (skillsList) {
            skillsList.innerHTML = skills.length
                ? skills.map(s => `
                    <div class="skill-card">
                      <div class="skill-name">${s.name}</div>
                      <div class="skill-meta">⚡ ${s.cost} • Dmg: ${s.damage || s.dmg}</div>
                      ${s.text ? `<div class="skill-desc">${s.text}</div>` : ""}
                    </div>
                  `).join("")
                : `<div class="skill-card">No skills found for ${pokemonName}</div>`;
        }

        const skillsPanel = document.getElementById("skillsPanel");
        skillsPanel && (skillsPanel.style.display = "block");
    });

    const closeSkills = document.getElementById("closeSkills");
    closeSkills && closeSkills.addEventListener("click", () => {
        const skillsPanel = document.getElementById("skillsPanel");
        skillsPanel && (skillsPanel.style.display = "none");
    });

}); // end DOMContentLoaded

/* ---------- Expose debug helpers ---------- */
window.TCG = {
  fetchCard: fetchTCGPokemonByName,
  mapAttack: mapTCGAttackToSkill,
  cache: TCG_CACHE,
  normalizeName: normalizeNameFromFile,
  prebuild: prebuildPokemonDB,
  db: () => PREBUILT_POKEMON_DB
};
window.BattleClient = { connectMatchServer: connectMatchServer, joinMatch: joinMatch };
