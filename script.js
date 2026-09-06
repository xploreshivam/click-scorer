let duration = 5;
let status = 'idle';
let clicks = 0;
let startTime = null;
let timerId = null;
let soundEnabled = true;
let audioCtx = null;

// Sound
function playSound() {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(500, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.035);
  } catch (e) {
    // Audio unsupported or blocked
  }
}

// Reset
function resetGame() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  status = 'idle';
  clicks = 0;
  startTime = null;
  document.body.style.cursor = 'pointer';

  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = '100%';

  const idleState = document.getElementById('idleState');
  if (idleState) idleState.style.display = 'block';

  const runningState = document.getElementById('runningState');
  if (runningState) runningState.style.display = 'none';

  const playingView = document.getElementById('playingView');
  if (playingView) playingView.style.display = 'flex';

  const resultsCard = document.getElementById('resultsCard');
  if (resultsCard) resultsCard.classList.remove('show');
}

// Start
function startGame() {
  status = 'running';
  clicks = 1;
  startTime = performance.now();

  const idleState = document.getElementById('idleState');
  if (idleState) idleState.style.display = 'none';

  const runningState = document.getElementById('runningState');
  if (runningState) runningState.style.display = 'block';

  const liveClicks = document.getElementById('liveClicks');
  if (liveClicks) liveClicks.innerText = clicks.toString();

  playSound();

  timerId = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    const remaining = Math.max(0, duration - elapsed);
    const percent = (remaining / duration) * 100;

    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = percent + '%';

    if (remaining <= 0) {
      finishGame();
    }
  }, 25);
}

// Finish
function finishGame() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  status = 'finished';
  document.body.style.cursor = 'default';

  const bestKey = `click_score_best_${duration}`;
  let best = parseInt(localStorage.getItem(bestKey) || '0', 10);
  if (clicks > best) {
    best = clicks;
    localStorage.setItem(bestKey, best.toString());
  }

  const playingView = document.getElementById('playingView');
  if (playingView) playingView.style.display = 'none';

  const resultsCard = document.getElementById('resultsCard');
  if (resultsCard) resultsCard.classList.add('show');

  const resClicks = document.getElementById('resClicks');
  if (resClicks) resClicks.innerText = clicks.toString();

  const resCps = document.getElementById('resCps');
  if (resCps) resCps.innerText = (clicks / duration).toFixed(1);

  const resBest = document.getElementById('resBest');
  if (resBest) resBest.innerText = best.toString();
}

// Ripple feedback
function triggerRipple(x, y) {
  if (!x && !y) return;
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => {
    if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
  }, 400);
}

// Click
function handleClick(x, y) {
  if (status === 'finished') return;
  if (x !== undefined && y !== undefined) {
    triggerRipple(x, y);
  }
  if (status === 'idle') {
    startGame();
  } else if (status === 'running') {
    clicks++;
    const liveClicks = document.getElementById('liveClicks');
    if (liveClicks) liveClicks.innerText = clicks.toString();
    playSound();
  }
}

// Initialize
function initApp() {
  // Mode Selector
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (status === 'running') return;
      document.querySelectorAll('.mode-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const timeVal = btn.getAttribute('data-time');
      if (timeVal) duration = parseInt(timeVal, 10);
      resetGame();
    });
  });

  // Sound Toggle
  const soundBtn = document.getElementById('soundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      soundBtn.style.opacity = soundEnabled ? '1' : '0.4';
    });
  }

  // Restart Button
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetGame();
    });
  }

  // Global Fullscreen Click & Tap
  window.addEventListener('pointerdown', (e) => {
    const target = e.target;
    if (
      target &&
      (target.closest('.mode-selector') ||
        target.closest('#soundBtn') ||
        target.closest('#resultsCard'))
    ) {
      return;
    }
    handleClick(e.clientX, e.clientY);
  });

  // Keyboard Spacebar & Enter
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (status === 'finished') {
        resetGame();
      } else {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        handleClick(cx, cy);
      }
    } else if (e.code === 'Enter' && status === 'finished') {
      e.preventDefault();
      resetGame();
    }
  });

  resetGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
