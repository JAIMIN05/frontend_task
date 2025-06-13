import { initialNotes } from '../store/notesData';

/**
 * Saves notes array to localStorage
 * @param {Array} notes - Array of note objects to save
 * @returns {boolean} - Success status
 */
export const saveNotes = (notes) => {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('Failed to save notes:', error);
    return false;
  }
};

/**
 * Loads notes from localStorage
 * @returns {Array} - Array of note objects or initial notes if none found
 */
export const loadNotes = () => {
  try {
    const savedNotes = localStorage.getItem('notes');
    if (!savedNotes) {
      return initialNotes;
    }
    
    const parsedNotes = JSON.parse(savedNotes);
    if (!Array.isArray(parsedNotes)) {
      throw new Error('Stored notes is not an array');
    }
    
    return parsedNotes;
  } catch (error) {
    console.error('Failed to load notes:', error);
    return initialNotes;
  }
};