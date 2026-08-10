/* ==========================================================================
   FLEXBOX POND - LIVE CODE EDITOR CONTROLLER
   ========================================================================== */

export class EditorController {
  constructor({ onCodeChange, onSubmit }) {
    this.textarea = document.getElementById('css-input');
    this.lineNumbersEl = document.getElementById('line-numbers');
    this.suggestionBar = document.getElementById('suggestion-bar');
    this.statusIndicator = document.getElementById('status-indicator');
    this.statusText = document.getElementById('status-text');
    this.submitBtn = document.getElementById('submit-btn');
    
    this.onCodeChange = onCodeChange;
    this.onSubmit = onSubmit;
    this.currentLevel = null;

    this.bindEvents();
  }

  bindEvents() {
    this.textarea.addEventListener('input', () => {
      this.updateLineNumbers();
      if (this.onCodeChange) {
        this.onCodeChange(this.textarea.value);
      }
    });

    this.textarea.addEventListener('keydown', (e) => {
      // Tab key support in textarea
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        this.textarea.value = this.textarea.value.substring(0, start) + "  " + this.textarea.value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
        
        if (this.onCodeChange) {
          this.onCodeChange(this.textarea.value);
        }
      }
    });

    this.submitBtn.addEventListener('click', () => {
      if (this.onSubmit && !this.submitBtn.disabled) {
        this.onSubmit();
      }
    });
  }

  loadLevel(level, savedCode = '') {
    this.currentLevel = level;
    this.textarea.value = savedCode || level.defaultCode || '';
    this.updateLineNumbers();
    this.renderSuggestions(level.suggestions || []);
    this.setSuccessStatus(false);
  }

  getCode() {
    return this.textarea.value;
  }

  updateLineNumbers() {
    const lines = this.textarea.value.split('\n').length;
    const numLines = Math.max(lines, 3);
    let html = '';
    for (let i = 1; i <= numLines; i++) {
      html += `${i}<br>`;
    }
    this.lineNumbersEl.innerHTML = html;
  }

  renderSuggestions(suggestions) {
    this.suggestionBar.innerHTML = '';
    suggestions.forEach(item => {
      const pill = document.createElement('button');
      pill.className = 'suggest-pill';
      pill.textContent = item;
      pill.addEventListener('click', () => {
        this.insertTextAtCursor(item + (item.endsWith(':') ? ' ' : '; '));
      });
      this.suggestionBar.appendChild(pill);
    });
  }

  insertTextAtCursor(text) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const val = this.textarea.value;

    this.textarea.value = val.substring(0, start) + text + val.substring(end);
    this.textarea.selectionStart = this.textarea.selectionEnd = start + text.length;
    this.textarea.focus();

    this.updateLineNumbers();
    if (this.onCodeChange) {
      this.onCodeChange(this.textarea.value);
    }
  }

  setSuccessStatus(isSuccess, message = '') {
    if (isSuccess) {
      this.statusIndicator.classList.add('success');
      this.statusIndicator.classList.remove('error');
      this.statusText.textContent = message || 'Sempurna! Semua kodok mendarat tepat pada teratai.';
      this.submitBtn.disabled = false;
    } else {
      this.statusIndicator.classList.remove('success');
      this.statusText.textContent = message || 'Sesuaikan sintaks Flexbox di atas...';
      this.submitBtn.disabled = true;
    }
  }
}
