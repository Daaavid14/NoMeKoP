
function createBattle(playerSpriteFile, opponent) {
    window.lastOpponentUsed = opponent;

    const state = {
        maxHP: 100,
        playerHP: 100,
        oppHP: 100,
        energy: 5,
        maxEnergy: 10,
        turn: "player",
        running: true
    };

    const skills = [
        { name: "Quick Hit", dmg: 15, cost: 1 },
        { name: "Focused Strike", dmg: 25, cost: 2 },
        { name: "Gale Jab", dmg: 30, cost: 3 },
        { name: "Primal Burst", dmg: 55, cost: 5, ultimate: true }
    ];

    const oppSprite = document.getElementById("oppSprite");
    const playerSprite = document.getElementById("playerSprite");

    const oppHPBar = document.getElementById("oppHP");
    const playerHPBar = document.getElementById("playerHP");

    const oppHPText = document.getElementById("oppHPText");
    const playerHPText = document.getElementById("playerHPText");

    const skillCards = document.getElementById("skillCards");
    const energyDots = document.getElementById("energyDots");
    const energyCount = document.getElementById("energyCount");

    const skipTurnBtn = document.getElementById("skipTurnBtn");
    const forfeitBtn = document.getElementById("forfeitBtn");

    const battleOverlay = document.getElementById("battleOverlay");
    const damageLayer = document.getElementById("damageLayer");

    document.getElementById("playerSprite").src = `pokeSprites/${playerSpriteFile}`;
    document.getElementById("oppSprite").src = `pokeSprites/${opponent.sprite}`;

    battleOverlay.setAttribute("aria-hidden","false");

    /* --------------------
       UI Update Functions
    -------------------- */
    function updateEnergy() {
        energyDots.innerHTML = "";
        for (let i = 0; i < state.energy; i++) {
            const dot = document.createElement("div");
            dot.classList.add("energyDot");
            energyDots.appendChild(dot);
        }
        energyCount.textContent = `${state.energy} / ${state.maxEnergy}`;
    }

    function updateHP() {
        const p = (state.playerHP / state.maxHP) * 100;
        const o = (state.oppHP / state.maxHP) * 100;

        playerHPBar.style.width = p + "%";
        oppHPBar.style.width = o + "%";

        playerHPText.textContent = `${state.playerHP} / ${state.maxHP}`;
        oppHPText.textContent = `${state.oppHP} / ${state.maxHP}`;
    }

    function showDamage(target, amount) {
        const txt = document.createElement("div");
        txt.classList.add("damageText");
        txt.textContent = `-${amount}`;

        const rect = target.getBoundingClientRect();
        txt.style.left = rect.left + rect.width/2 + "px";
        txt.style.top = rect.top + "px";

        damageLayer.appendChild(txt);
        setTimeout(()=>txt.remove(), 1000);
    }

    /* --------------------
       Skill Cards
    -------------------- */
    function loadSkillCards() {
        skillCards.innerHTML = "";

        skills.forEach((skill, i) => {
            const card = document.createElement("div");
            card.classList.add("skill-card");

            card.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">⚡ ${skill.cost}</div>
            `;

            card.onclick = () => useSkill(skill);

            skillCards.appendChild(card);
        });

        refreshSkillStates();
    }

    function refreshSkillStates() {
        [...skillCards.children].forEach((card, idx) => {
            const skill = skills[idx];
            if (state.energy < skill.cost) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }
        });
    }

    /* --------------------
       Player Skill Use
    -------------------- */
    function useSkill(skill) {
        if (!state.running || state.turn !== "player") return;
        if (state.energy < skill.cost) return;

        state.energy -= skill.cost;
        updateEnergy();
        refreshSkillStates();

        // Damage opponent
        state.oppHP -= skill.dmg;
        if (state.oppHP < 0) state.oppHP = 0;

        showDamage(oppSprite, skill.dmg);
        updateHP();

        if (state.oppHP <= 0) {
            return endBattle("win");
        }

        // Opponent’s turn
        state.turn = "opponent";
        setTimeout(opponentTurn, 800);
    }

    /* --------------------
       Opponent AI
    -------------------- */
    function opponentTurn() {
        if (!state.running) return;

        const dmg = 10 + Math.floor(Math.random()*18);
        state.playerHP -= dmg;
        if (state.playerHP < 0) state.playerHP = 0;

        showDamage(playerSprite, dmg);
        updateHP();

        if (state.playerHP <= 0) return endBattle("lose");

        // End → back to player turn
        state.energy = Math.min(state.energy + 1, state.maxEnergy);
        updateEnergy();
        refreshSkillStates();

        state.turn = "player";
    }

    /* --------------------
       Skip Turn
    -------------------- */
    skipTurnBtn.onclick = () => {
        state.energy = Math.min(state.energy + 2, state.maxEnergy);

        updateEnergy();
        refreshSkillStates();

        state.turn = "opponent";
        setTimeout(opponentTurn, 600);
    };

    /* --------------------
       Forfeit
    -------------------- */
    forfeitBtn.onclick = () => {
        endBattle("lose");
    };

    /* --------------------
       End Battle
    -------------------- */
    function endBattle(result) {
        state.running = false;

        battleOverlay.setAttribute("aria-hidden","true");

        const w = document.getElementById("winnerOverlay");
        const title = document.getElementById("winnerTitle");
        const sprite = document.getElementById("winnerSprite");

        sprite.style.maxHeight = "200px"; // Winner size D fix

        if (result === "win") {
            title.textContent = "YOU WIN!";
            sprite.src = `pokeSprites/${playerSpriteFile}`;
        } else {
            title.textContent = "YOU LOSE!";
            sprite.src = `pokeSprites/${opponent.sprite}`;
        }

        w.setAttribute("aria-hidden","false");
    }

    /* Start battle! */
    updateHP();
    updateEnergy();
    loadSkillCards();
}