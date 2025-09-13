import React, { createContext, useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp, resendSignUpCode, fetchUserAttributes } from 'aws-amplify/auth';
import { cognitoConfig } from '../aws-config';

// Configure Amplify with proper structure
Amplify.configure({
  Auth: {
    Cognito: cognitoConfig.Auth
  }
});

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      console.log('Current user data:', currentUser); // Debug log to see user structure
      
      // Fetch user attributes to get name, email, etc.
      try {
        const userAttributes = await fetchUserAttributes();
        console.log('User attributes:', userAttributes); // Debug log to see attributes structure
        // Merge user info with attributes for easier access
        const userWithAttributes = {
          ...currentUser,
          attributes: userAttributes
        };
        setUser(userWithAttributes);
      } catch (attributeError) {
        console.warn('Could not fetch user attributes:', attributeError);
        // Still set the user even if we can't get attributes
        setUser(currentUser);
      }
    } catch (error) {
      console.log('No authenticated user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const signInResult = await signIn({
        username: email,
        password: password
      });

      if (signInResult.isSignedIn) {
        const currentUser = await getCurrentUser();
        console.log('User logged in:', currentUser); // Debug log to see user structure
        
        // Fetch user attributes after successful login
        try {
          const userAttributes = await fetchUserAttributes();
          console.log('User attributes after login:', userAttributes);
          const userWithAttributes = {
            ...currentUser,
            attributes: userAttributes
          };
          setUser(userWithAttributes);
        } catch (attributeError) {
          console.warn('Could not fetch user attributes after login:', attributeError);
          setUser(currentUser);
        }
        return { success: true };
      } else {
        // Handle additional sign-in steps if needed (MFA, etc.)
        return { success: false, nextStep: signInResult.nextStep };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, attributes = {}) => {
        console.log('2. [AuthContext] Received by register:', { email, attributes });
    try {
      setError(null);
      setLoading(true);
      
      // Use email as username since Cognito User Pool is configured for email sign-in
      const signUpResult = await signUp({
        username: email, // Use email directly as username
        password: password,
        attributes: {
          email: email, // Standard Cognito email attribute
          ...attributes
        }
      });

      return { 
        success: true, 
        nextStep: signUpResult.nextStep,
        userId: signUpResult.userId,
        userSub: signUpResult.userSub,
        username: email // Return the email as username for confirmation
      };
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const confirmRegistration = async (username, confirmationCode) => {
    try {
      setError(null);
      setLoading(true);
      
      await confirmSignUp({
        username: username,
        confirmationCode: confirmationCode
      });

      return { success: true };
    } catch (error) {
      console.error('Confirmation error:', error);
      setError(error.message || 'Confirmation failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async (username) => {
    try {
      setError(null);
      await resendSignUpCode({ username: username });
      return { success: true };
    } catch (error) {
      console.error('Resend confirmation error:', error);
      setError(error.message || 'Failed to resend confirmation');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message || 'Logout failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    confirmRegistration,
    resendConfirmation,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};