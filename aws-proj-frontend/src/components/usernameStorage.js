// Local storage utilities for username management
// This is a fallback solution when Cognito attributes don't work properly

const USERNAME_STORAGE_KEY = 'user_custom_username';

/**
 * Store username in local storage
 * @param {string} email - User's email (used as key)
 * @param {string} username - Custom username
 */
export const storeUsername = (email, username) => {
  try {
    const usernames = getStoredUsernames();
    usernames[email] = username;
    localStorage.setItem(USERNAME_STORAGE_KEY, JSON.stringify(usernames));
    console.log('Username stored locally:', { email, username });
  } catch (error) {
    console.error('Failed to store username:', error);
  }
};

/**
 * Get username from local storage
 * @param {string} email - User's email
 * @returns {string|null} - Stored username or null
 */
export const getStoredUsername = (email) => {
  try {
    const usernames = getStoredUsernames();
    return usernames[email] || null;
  } catch (error) {
    console.error('Failed to get stored username:', error);
    return null;
  }
};

/**
 * Get all stored usernames
 * @returns {Object} - Object with email as key and username as value
 */
const getStoredUsernames = () => {
  try {
    const stored = localStorage.getItem(USERNAME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to parse stored usernames:', error);
    return {};
  }
};

/**
 * Clear stored username for an email
 * @param {string} email - User's email
 */
export const clearStoredUsername = (email) => {
  try {
    const usernames = getStoredUsernames();
    delete usernames[email];
    localStorage.setItem(USERNAME_STORAGE_KEY, JSON.stringify(usernames));
  } catch (error) {
    console.error('Failed to clear stored username:', error);
  }
};
