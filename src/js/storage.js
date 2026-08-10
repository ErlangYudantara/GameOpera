/* ==========================================================================
   FLEXBOX POND - STORAGE & LOCAL PROGRESS MANAGER
   ========================================================================== */

const STORAGE_KEYS = {
  COMPLETED_LEVELS: 'flexbox_pond_completed_levels',
  CURRENT_LEVEL: 'flexbox_pond_current_level',
  SAVED_CODES: 'flexbox_pond_saved_codes'
};

export class StorageManager {
  static getCompletedLevels() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static markLevelCompleted(levelId) {
    const completed = this.getCompletedLevels();
    if (!completed.includes(levelId)) {
      completed.push(levelId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify(completed));
    }
  }

  static getCurrentLevelId() {
    try {
      const level = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
      return level ? parseInt(level, 10) : 1;
    } catch (e) {
      return 1;
    }
  }

  static setCurrentLevelId(levelId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, levelId.toString());
  }

  static getSavedCode(levelId) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CODES);
      const codes = data ? JSON.parse(data) : {};
      return codes[levelId] || '';
    } catch (e) {
      return '';
    }
  }

  static saveCode(levelId, code) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CODES);
      const codes = data ? JSON.parse(data) : {};
      codes[levelId] = code;
      localStorage.setItem(STORAGE_KEYS.SAVED_CODES, JSON.stringify(codes));
    } catch (e) {
      // Ignore quota error
    }
  }

  static clearProgress() {
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_LEVELS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
    localStorage.removeItem(STORAGE_KEYS.SAVED_CODES);
  }
}
