/* ==========================================================================
   FLEXBOX POND - MAIN APPLICATION CONTROLLER
   ========================================================================== */

import { LEVELS } from './levels.js';
import { StorageManager } from './storage.js';
import { soundEngine } from './audio.js';
import { PondRenderer } from './pond.js';
import { EditorController } from './editor.js';
import { ModalController } from './cheatSheet.js';

class App {
  constructor() {
    this.currentLevelIndex = 0;

    // DOM Elements
    this.levelTitle = document.getElementById('level-title');
    this.levelBadge = document.getElementById('level-badge');
    this.levelInstructions = document.getElementById('level-instructions');
    this.levelHintBox = document.getElementById('level-hint-box');
    this.levelHintText = document.getElementById('level-hint-text');
    this.toggleHintBtn = document.getElementById('toggle-hint-btn');

    this.currentLevelNum = document.getElementById('current-level-num');
    this.totalLevelsNum = document.getElementById('total-levels-num');

    this.prevLevelBtn = document.getElementById('prev-level-btn');
    this.nextLevelBtn = document.getElementById('next-level-btn');
    this.levelSelectorBtn = document.getElementById('level-selector-btn');
    
    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
    this.audioIcon = document.getElementById('audio-icon');
    this.cheatSheetBtn = document.getElementById('cheat-sheet-btn');
    this.resetLevelBtn = document.getElementById('reset-level-btn');

    this.initControllers();
    this.bindEvents();
    this.loadSavedProgress();
  }

  initControllers() {
    // 1. Pond Engine
    this.pondRenderer = new PondRenderer((showModal = true) => {
      this.handleLevelSuccess(showModal);
    });

    // 2. Code Editor Controller
    this.editorController = new EditorController({
      onCodeChange: (code) => {
        const level = LEVELS[this.currentLevelIndex];
        StorageManager.saveCode(level.id, code);
        this.pondRenderer.applyUserCode(code, false);
      },
      onSubmit: () => {
        this.goToNextLevel();
      }
    });

    // 3. Modal Controller
    this.modalController = new ModalController({
      onSelectLevel: (levelId) => {
        const index = LEVELS.findIndex(l => l.id === levelId);
        if (index !== -1) {
          this.loadLevel(index);
        }
      },
      onResetAllProgress: () => {
        StorageManager.clearProgress();
        this.loadLevel(0);
      }
    });
  }

  bindEvents() {
    // Navigation
    this.prevLevelBtn.addEventListener('click', () => {
      soundEngine.playClick();
      if (this.currentLevelIndex > 0) {
        this.loadLevel(this.currentLevelIndex - 1);
      }
    });

    this.nextLevelBtn.addEventListener('click', () => {
      soundEngine.playClick();
      if (this.currentLevelIndex < LEVELS.length - 1) {
        this.loadLevel(this.currentLevelIndex + 1);
      }
    });

    this.levelSelectorBtn.addEventListener('click', () => {
      soundEngine.playClick();
      const level = LEVELS[this.currentLevelIndex];
      this.modalController.showLevelModal(level.id);
    });

    // Audio Mute Toggle
    this.audioToggleBtn.addEventListener('click', () => {
      const isMuted = soundEngine.toggleMute();
      this.audioIcon.textContent = isMuted ? '🔇' : '🔊';
    });

    // Cheat Sheet Button
    this.cheatSheetBtn.addEventListener('click', () => {
      soundEngine.playClick();
      this.modalController.showCheatSheet();
    });

    // Reset Button — resets ALL levels and goes back to Level 1
    this.resetLevelBtn.addEventListener('click', () => {
      soundEngine.playClick();
      StorageManager.clearProgress();
      this.loadLevel(0);
    });

    // Toggle Hint Box
    this.toggleHintBtn.addEventListener('click', () => {
      soundEngine.playClick();
      this.levelHintBox.classList.toggle('hidden');
    });
  }

  loadSavedProgress() {
    const savedLevelId = StorageManager.getCurrentLevelId();
    const index = LEVELS.findIndex(l => l.id === savedLevelId);
    this.totalLevelsNum.textContent = LEVELS.length.toString();
    this.loadLevel(index !== -1 ? index : 0);
  }

  loadLevel(index) {
    this.currentLevelIndex = index;
    const level = LEVELS[index];
    StorageManager.setCurrentLevelId(level.id);

    // Update Header Level Info
    this.currentLevelNum.textContent = level.id.toString();
    this.levelTitle.textContent = `Level ${level.id}: ${level.title}`;
    this.levelBadge.textContent = level.badge;
    this.levelInstructions.innerHTML = level.instructions;
    this.levelHintText.innerHTML = level.hint;
    this.levelHintBox.classList.add('hidden');

    // Update Nav Buttons
    this.prevLevelBtn.disabled = (index === 0);
    this.nextLevelBtn.disabled = (index === LEVELS.length - 1);

    // Dynamic selector static label if targeting individual frog
    const codeStaticEls = document.querySelectorAll('.code-static');
    if (codeStaticEls.length >= 2) {
      codeStaticEls[0].innerHTML = `${level.selector || '#pond'} {<br>&nbsp;&nbsp;display: flex;`;
    }

    // Load Code in Editor & Render Pond
    const savedCode = StorageManager.getSavedCode(level.id);
    this.editorController.loadLevel(level, savedCode);
    this.pondRenderer.renderLevel(level);

    // Apply Code directly with initial load flag = true
    const initialCode = this.editorController.getCode();
    this.pondRenderer.applyUserCode(initialCode, true);
  }

  handleLevelSuccess(showModal = true) {
    const level = LEVELS[this.currentLevelIndex];
    StorageManager.markLevelCompleted(level.id);
    this.editorController.setSuccessStatus(true);

    // Trigger celebration modal only when user actively solves it
    if (showModal) {
      setTimeout(() => {
        if (this.currentLevelIndex < LEVELS.length - 1) {
          this.modalController.showVictory(() => {
            this.goToNextLevel();
          });
        }
      }, 600);
    }
  }

  goToNextLevel() {
    if (this.currentLevelIndex < LEVELS.length - 1) {
      this.loadLevel(this.currentLevelIndex + 1);
    }
  }
}

// Inisialisasi Aplikasi ketika DOM siap
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
