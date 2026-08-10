/* ==========================================================================
   FLEXBOX POND - POND RENDERER & COLLISION DETECTOR
   ========================================================================== */
import { soundEngine } from './audio.js';
import mascotImg from '../assets/mascot.png';

/* SVG Template for Lilypads */
const getLilypadSVG = (color) => `
<div class="lilypad lilypad-${color}">
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95 C25 95 5 75 5 50 C5 35 15 20 30 10 L50 50 Z" />
    <path d="M50 50 L30 10" stroke="rgba(0,0,0,0.15)" stroke-width="3" />
    <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.4)" />
  </svg>
</div>`;

/* Template for Mascot */
const getFrogSVG = (color, id) => `
<div class="frog frog-${color}" id="${id}">
  <img src="${mascotImg}" class="mascot-img" alt="Vetech Mascot" />
</div>`;

export class PondRenderer {
  constructor(onSuccess) {
    this.pondEl = document.getElementById('pond');
    this.lilypadsEl = document.getElementById('lilypads');
    this.confettiCanvas = document.getElementById('confetti-canvas');
    this.onSuccess = onSuccess;
    this.currentLevel = null;
    this.matchedState = false;
  }

  renderLevel(level) {
    this.currentLevel = level;
    this.matchedState = false;

    // Reset Pond container styles
    this.pondEl.removeAttribute('style');
    this.lilypadsEl.removeAttribute('style');

    // Default container setup
    this.pondEl.style.display = 'flex';
    this.lilypadsEl.style.display = 'flex';

    // Apply target style to lilypads layer
    if (level.selector === '#pond') {
      this.lilypadsEl.style.cssText = `display: flex; ${level.targetStyle}`;
    } else {
      this.lilypadsEl.style.display = 'flex';
    }

    // Render Lilypads
    let lilyHtml = '';
    level.frogs.forEach((frog) => {
      lilyHtml += getLilypadSVG(frog.color);
    });
    this.lilypadsEl.innerHTML = lilyHtml;

    // Render Frogs
    let frogHtml = '';
    level.frogs.forEach((frog) => {
      frogHtml += getFrogSVG(frog.color, frog.id);
    });
    this.pondEl.innerHTML = frogHtml;

    // If target selector is individual element (e.g. .frog-red → target lilypad .lilypad-red)
    if (level.selector !== '#pond') {
      // Translate .frog-X selector to matching .lilypad-X on the lilypads layer
      const lilypadSel = level.selector.replace('.frog-', '.lilypad-');
      const targetLily = this.lilypadsEl.querySelector(lilypadSel);
      if (targetLily) {
        targetLily.style.cssText = level.targetStyle;
      }
    }
  }

  applyUserCode(code, isInitialLoad = false) {
    if (!this.currentLevel) return false;

    // Reset styles
    if (this.currentLevel.selector === '#pond') {
      this.pondEl.style.cssText = `display: flex; ${code}`;
    } else {
      // Target specific frog element inside pond
      const targetEl = this.pondEl.querySelector(this.currentLevel.selector);
      if (targetEl) {
        targetEl.style.cssText = code;
      }
    }

    // Wait for transition/layout update before checking bounding boxes
    setTimeout(() => {
      this.checkMatching(isInitialLoad);
    }, 150);
  }

  checkMatching(isInitialLoad = false) {
    const frogs = Array.from(this.pondEl.querySelectorAll('.frog'));
    const lilypads = Array.from(this.lilypadsEl.querySelectorAll('.lilypad'));

    if (frogs.length === 0 || lilypads.length === 0) return false;

    let allMatched = true;

    for (let i = 0; i < frogs.length; i++) {
      const frogRect = frogs[i].getBoundingClientRect();
      const padRect = lilypads[i].getBoundingClientRect();

      const diffX = Math.abs((frogRect.left + frogRect.width / 2) - (padRect.left + padRect.width / 2));
      const diffY = Math.abs((frogRect.top + frogRect.height / 2) - (padRect.top + padRect.height / 2));

      // Tolerance of 15px for matching center
      if (diffX > 15 || diffY > 15) {
        allMatched = false;
        break;
      }
    }

    if (allMatched && !this.matchedState) {
      this.matchedState = true;
      frogs.forEach(f => f.classList.add('matched'));

      if (!isInitialLoad) {
        soundEngine.playRibbit();
        soundEngine.playWinSound();
        this.triggerConfetti();
        if (this.onSuccess) {
          this.onSuccess(true);
        }
      } else {
        if (this.onSuccess) {
          this.onSuccess(false);
        }
      }
      return true;
    } else if (!allMatched) {
      this.matchedState = false;
      frogs.forEach(f => f.classList.remove('matched'));
    }

    return allMatched;
  }

  triggerConfetti() {
    const ctx = this.confettiCanvas.getContext('2d');
    const width = (this.confettiCanvas.width = this.confettiCanvas.offsetWidth);
    const height = (this.confettiCanvas.height = this.confettiCanvas.offsetHeight);

    const particles = [];
    const colors = ['#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#00d2d3', '#ffffff'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.3,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        tilt: Math.random() * 10
      });
    }

    let animationFrame;
    let ticks = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
      });

      ticks++;
      if (ticks < 120) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();
  }
}
