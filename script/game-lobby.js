// lobby_axie.js — basic match / vs / battle flow (client-side simulation)

(() => {
  const playBtn = document.getElementById('playBtn');
  const matchOverlay = document.getElementById('matchOverlay');
  const searchingView = document.getElementById('searchingView');
  const foundView = document.getElementById('foundView');
  const cancelSearch = document.getElementById('cancelSearch');
  const acceptMatch = document.getElementById('acceptMatch');
  const declineMatch = document.getElementById('declineMatch');

  const vsOverlay = document.getElementById('vsOverlay');
  const vsPlayerSprite = document.getElementById('vsPlayerSprite');
  const vsOppSprite = document.getElementById('vsOppSprite');
  const vsSound = document.getElementById('vsSound');

  const battleOverlay = document.getElementById('battleOverlay');
  const returnToLobbyBtn = document.getElementById('returnToLobbyBtn');

  const winnerOverlay = document.getElementById('winnerOverlay');
  const winnerLobbyBtn = document.getElementById('winnerLobbyBtn');
  const winnerRematchBtn = document.getElementById('winnerRematchBtn');

  const statusBox = document.getElementById('status');
  const clickSound = document.getElementById('clickSound');

  let searchTimeout = null;
  let simulateFoundTimeout = null;

  function playClick() { if (clickSound) clickSound.currentTime = 0, clickSound.play().catch(()=>{}); }

  function showMatchOverlay() {
    playClick();
    matchOverlay.setAttribute('aria-hidden', 'false');
    searchingView.style.display = 'block';
    foundView.style.display = 'none';
    statusBox.style.display = 'none';
    // simulate searching then found (replace with real matchmaking)
    simulateFoundTimeout = setTimeout(() => {
      searchingView.style.display = 'none';
      foundView.style.display = 'block';
    }, 1600);
  }

  function cancelMatch() {
    playClick();
    matchOverlay.setAttribute('aria-hidden', 'true');
    clearTimeout(simulateFoundTimeout);
  }

  function declineMatchHandler() {
    playClick();
    // hide overlay and return to lobby
    matchOverlay.setAttribute('aria-hidden', 'true');
    statusBox.textContent = 'Match declined.';
    statusBox.style.display = 'block';
    setTimeout(()=>statusBox.style.display='none',1200);
  }

  function acceptMatchHandler() {
    playClick();
    // Hide match overlay and show VS
    matchOverlay.setAttribute('aria-hidden','true');
    showVSOverlay();
  }

  function showVSOverlay() {
    vsOverlay.setAttribute('aria-hidden','false');
    // play sound if available
    if (vsSound) { vsSound.currentTime = 0; vsSound.play().catch(()=>{}); }
    // animate for a short time, then open battle
    setTimeout(()=> {
      vsOverlay.setAttribute('aria-hidden','true');
      openBattle();
    }, 1700);
  }

  function openBattle() {
    battleOverlay.setAttribute('aria-hidden','false');
    // small simulated battle progress to auto-declare a winner after time
    setTimeout(()=> simulateBattleEnd(true), 6000); // 6 seconds for demo
  }

  function closeBattle() {
    battleOverlay.setAttribute('aria-hidden','true');
  }

  function simulateBattleEnd(playerWon = true) {
    // play victory/defeat sound if available
    if (playerWon && document.getElementById('victorySound')) {
      const v = document.getElementById('victorySound');
      v.currentTime = 0;
      v.play().catch(()=>{});
    }
    closeBattle();
    showWinner(playerWon);
  }

  function showWinner(playerWon) {
    const title = document.getElementById('winnerTitle');
    title.textContent = playerWon ? 'YOU WIN!' : 'YOU LOSE';
    winnerOverlay.setAttribute('aria-hidden','false');
  }

  function hideWinner() {
    winnerOverlay.setAttribute('aria-hidden','true');
  }

  // event bindings
  playBtn?.addEventListener('click', showMatchOverlay);
  cancelSearch?.addEventListener('click', cancelMatch);
  acceptMatch?.addEventListener('click', acceptMatchHandler);
  declineMatch?.addEventListener('click', declineMatchHandler);

  returnToLobbyBtn?.addEventListener('click', () => {
    playClick();
    closeBattle();
  });

  winnerLobbyBtn?.addEventListener('click', () => {
    playClick();
    hideWinner();
    // return to lobby default state
  });
  winnerRematchBtn?.addEventListener('click', () => {
    playClick();
    hideWinner();
    showMatchOverlay();
  });

  // Keyboard escape to cancel overlays
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (matchOverlay.getAttribute('aria-hidden') === 'false') cancelMatch();
      if (vsOverlay.getAttribute('aria-hidden') === 'false') vsOverlay.setAttribute('aria-hidden','true');
      if (battleOverlay.getAttribute('aria-hidden') === 'false') closeBattle();
      if (winnerOverlay.getAttribute('aria-hidden') === 'false') hideWinner();
    }
  });

  // small helper: if images fail to load, fallback to uploaded preview image
  const fallbackPreview = '/mnt/data/6343f256-1f8c-4955-8146-849465c978d4.png';
  [vsPlayerSprite, vsOppSprite].forEach(img => {
    if (!img) return;
    img.addEventListener('error', ()=>{ img.src = fallbackPreview; });
  });

})();
