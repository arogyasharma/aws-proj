// Utility functions for user data extraction
import { getStoredUsername } from './usernameStorage';

/**
 * Extract username from user object
 * Tries multiple possible locations in order of preference
 * @param {Object} user - User object from AuthContext
 * @returns {string} - Username or 'anonymous' if not found
 */
export const getUserName = (user) => {
  if (!user) return 'anonymous';
  
  // First try local storage (most reliable for custom usernames)
  const email = user?.attributes?.email;
  if (email) {
    const storedUsername = getStoredUsername(email);
    if (storedUsername) {
      return storedUsername;
    }
  }
  
  // Try all possible username locations in order of preference
  if (user?.attributes?.name) {
    return user.attributes.name;
  }
  
  if (user?.attributes?.given_name) {
    return user.attributes.given_name;
  }
  
  if (user?.attributes?.preferred_username) {
    return user.attributes.preferred_username;
  }
  
  // Fallback to email username part
  if (email) {
    return email.split('@')[0];
  }
  
  // Try other possible locations for username
  return user?.username || // UUID as fallback
         'anonymous';
};

/**
 * Extract display name from user object
 * @param {Object} user - User object from AuthContext
 * @returns {string} - Display name or 'User' if not found
 */
export const getDisplayName = (user) => {
  if (!user) return 'User';
  
  // Try all possible display name locations in order of preference
  if (user?.attributes?.name) {
    return user.attributes.name;
  }
  
  if (user?.attributes?.given_name) {
    return user.attributes.given_name;
  }
  
  if (user?.attributes?.preferred_username) {
    return user.attributes.preferred_username;
  }
  
  return user?.attributes?.email || // Use email as display name if no name available
         user?.username || 
         'User';
};

/**
 * Extract email from user object
 * @param {Object} user - User object from AuthContext
 * @returns {string} - Email or empty string if not found
 */
export const getUserEmail = (user) => {
  if (!user) return '';
  
  return user?.attributes?.email || 
         user?.username || 
         '';
};

/**
 * Get full email address for display purposes
 * @param {Object} user - User object from AuthContext
 * @returns {string} - Full email address or 'anonymous' if not found
 */
export const getFullEmail = (user) => {
  if (!user) return 'anonymous';
  
  return user?.attributes?.email || 'anonymous';
};
