/* ==========================================================================
   FLEXBOX POND - MODAL CONTROLLERS & CHEAT SHEET GUIDE
   ========================================================================== */

import { LEVELS } from './levels.js';
import { StorageManager } from './storage.js';
import { soundEngine } from './audio.js';

export class ModalController {
  constructor({ onSelectLevel, onResetAllProgress }) {
    this.onSelectLevel = onSelectLevel;
    this.onResetAllProgress = onResetAllProgress;

    // Elements
    this.levelModal = document.getElementById('level-modal');
    this.levelGrid = document.getElementById('level-grid');
    this.closeLevelBtn = document.getElementById('close-level-modal');

    this.cheatsheetModal = document.getElementById('cheatsheet-modal');
    this.closeCheatsheetBtn = document.getElementById('close-cheatsheet-modal');
    this.cheatSheetContent = this.cheatsheetModal.querySelector('.cheat-sheet-content');

    this.victoryModal = document.getElementById('victory-modal');
    this.victoryNextBtn = document.getElementById('victory-next-btn');

    this.bindEvents();
    this.initCheatSheet();
  }

  bindEvents() {
    this.closeLevelBtn.addEventListener('click', () => this.hideLevelModal());
    this.closeCheatsheetBtn.addEventListener('click', () => this.hideCheatSheet());

    // Click outside modal to close
    [this.levelModal, this.cheatsheetModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });
  }

  /* Level Selector Modal */
  showLevelModal(currentLevelId) {
    const completed = StorageManager.getCompletedLevels();
    this.levelGrid.innerHTML = '';

    LEVELS.forEach(level => {
      const isCompleted = completed.includes(level.id);
      const isActive = level.id === currentLevelId;

      const card = document.createElement('div');
      card.className = `level-card-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      
      card.innerHTML = `
        <div class="level-card-num">${level.id}</div>
        <div class="level-card-title">${level.title}</div>
        <div class="level-card-status">${isCompleted ? '✓ Selesai' : level.badge}</div>
      `;

      card.addEventListener('click', () => {
        soundEngine.playClick();
        this.hideLevelModal();
        if (this.onSelectLevel) {
          this.onSelectLevel(level.id);
        }
      });

      this.levelGrid.appendChild(card);
    });

    this.levelModal.classList.remove('hidden');
  }

  hideLevelModal() {
    this.levelModal.classList.add('hidden');
  }

  /* Cheat Sheet Modal */
  showCheatSheet() {
    this.cheatsheetModal.classList.remove('hidden');
  }

  hideCheatSheet() {
    this.cheatsheetModal.classList.add('hidden');
  }

  initCheatSheet() {
    this.cheatSheetContent.innerHTML = `
      <div class="cheatsheet-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem;">
        <div class="cs-card" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="color: var(--accent-green-bright); margin-bottom: 0.5rem;">justify-content</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Meratakan elemen secara horizontal (pada sumbu utama):</p>
          <ul style="font-family: var(--font-mono); font-size: 0.82rem; list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
            <li><code>flex-start</code>: Rata kiri (default)</li>
            <li><code>flex-end</code>: Rata kanan</li>
            <li><code>center</code>: Tepat di tengah</li>
            <li><code>space-between</code>: Jarak sama antar elemen</li>
            <li><code>space-around</code>: Jarak simetris sekeliling</li>
          </ul>
        </div>

        <div class="cs-card" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="color: var(--accent-green-bright); margin-bottom: 0.5rem;">align-items</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Meratakan elemen secara vertikal (pada sumbu silang):</p>
          <ul style="font-family: var(--font-mono); font-size: 0.82rem; list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
            <li><code>flex-start</code>: Rata atas</li>
            <li><code>flex-end</code>: Rata bawah</li>
            <li><code>center</code>: Tepat di tengah vertikal</li>
            <li><code>stretch</code>: Meregang memenuhi kontainer</li>
            <li><code>baseline</code>: Rata garis dasar teks</li>
          </ul>
        </div>

        <div class="cs-card" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="color: var(--accent-green-bright); margin-bottom: 0.5rem;">flex-direction</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Arah alur susunan kontainer:</p>
          <ul style="font-family: var(--font-mono); font-size: 0.82rem; list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
            <li><code>row</code>: Horizontal kiri ke kanan (default)</li>
            <li><code>row-reverse</code>: Horizontal kanan ke kiri</li>
            <li><code>column</code>: Vertikal atas ke bawah</li>
            <li><code>column-reverse</code>: Vertikal bawah ke atas</li>
          </ul>
        </div>

        <div class="cs-card" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="color: var(--accent-green-bright); margin-bottom: 0.5rem;">order & align-self</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Properti khusus untuk elemen individual:</p>
          <ul style="font-family: var(--font-mono); font-size: 0.82rem; list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
            <li><code>order: 1</code>: Mengubah urutan relatif elemen</li>
            <li><code>align-self: flex-end</code>: Perataan vertikal khusus elemen ini saja</li>
          </ul>
        </div>
      </div>
    `;
  }

  /* Victory Celebration Modal */
  showVictory(onNext) {
    this.victoryModal.classList.remove('hidden');
    
    // Clean old event listener by replacing button node
    const newNextBtn = this.victoryNextBtn.cloneNode(true);
    this.victoryNextBtn.parentNode.replaceChild(newNextBtn, this.victoryNextBtn);
    this.victoryNextBtn = newNextBtn;

    this.victoryNextBtn.addEventListener('click', () => {
      soundEngine.playClick();
      this.victoryModal.classList.add('hidden');
      if (onNext) onNext();
    });
  }
}
