import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader, X, AlertCircle, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
   
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('signup'); // 'signup' or 'confirm'
  const [confirmationCode, setConfirmationCode] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState(''); // Store generated username
  
  const { register, confirmRegistration, resendConfirmation } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      return 'Please fill in all fields';
    }
    
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

      console.log('1. [SignupModal] Sending to register:', { 
      email: formData.email, 
      attributes: { name: formData.name } 
    });

    const result = await register(
      formData.email, 
      formData.password, 
      { 
        'custom:name': formData.name,
        preferred_username: formData.name
      }
    );
    
    if (result.success) {
      setGeneratedUsername(result.username); // Store the generated username
      setStep('confirm');
    } else {
      setError(result.error || 'Registration failed');
    }
    setIsLoading(false);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!confirmationCode) {
      setError('Please enter the confirmation code');
      setIsLoading(false);
      return;
    }

    const result = await confirmRegistration(generatedUsername, confirmationCode);
    
    if (result.success) {
      onClose();
      // Reset form
      setFormData({ name: '' ,email: '', password: '', confirmPassword: ''});
      setConfirmationCode('');
      setGeneratedUsername('');
      setStep('signup');
      // Could show a success message or automatically log in
    } else {
      setError(result.error || 'Confirmation failed');
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    
    const result = await resendConfirmation(generatedUsername);
    
    if (result.success) {
      setError('Confirmation code resent to your email');
    } else {
      setError(result.error || 'Failed to resend code');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setFormData({ name: '' ,email: '', password: '', confirmPassword: '' });
    setConfirmationCode('');
    setGeneratedUsername('');
    setError('');
    setStep('signup');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'signup' ? 'Sign up for Sportech' : 'Verify your email'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className={`p-3 rounded-lg border flex items-center space-x-2 mb-4 ${
              error.includes('resent') 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {error.includes('resent') ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="text-sm">{error}</span>
            </div>
          )}

          {step === 'signup' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password (min 8 characters)"
                    className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Sign Up</span>
                )}
              </button>

              {/* Switch to Login */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">
                  We've sent a confirmation code to <span className="text-blue-600 font-medium">{formData.email}</span>
                </p>
              </div>

              {/* Confirmation Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-lg tracking-wider"
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={isLoading || !confirmationCode}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Verify Email</span>
                )}
              </button>

              {/* Resend Code */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                  disabled={isLoading}
                >
                  Resend confirmation code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;