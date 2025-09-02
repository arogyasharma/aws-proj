import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader, X, AlertCircle, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
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

    const result = await register(
      formData.email, 
      formData.password, 
      { 
        name: formData.name,
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
      setFormData({ email: '', password: '', confirmPassword: '', name: '' });
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
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setConfirmationCode('');
    setGeneratedUsername('');
    setError('');
    setStep('signup');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl shadow-2xl w-full max-w-md border border-dark-400/30">
        {/* Header */}
        <div className="p-6 border-b border-dark-300/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {step === 'signup' ? 'Create Account' : 'Verify Email'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className={`p-4 rounded-xl border flex items-center space-x-3 mb-6 ${
              error.includes('resent') 
                ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                : 'bg-red-500/20 border-red-500/30 text-red-300'
            }`}>
              {error.includes('resent') ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <span className="text-sm">{error}</span>
            </div>
          )}

          {step === 'signup' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password (min 8 characters)"
                    className="w-full px-4 py-3 pr-12 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 pr-12 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <span>Create Account</span>
                )}
              </button>

              {/* Switch to Login */}
              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    disabled={isLoading}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-300 text-sm">
                  We've sent a confirmation code to <span className="text-blue-400 font-semibold">{formData.email}</span>
                </p>
              </div>

              {/* Confirmation Code */}
              <div>
                <label className="block text-sm font-semibold text-green-300 mb-3">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300 text-center text-lg tracking-wider"
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={isLoading || !confirmationCode}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <span>Verify Email</span>
                )}
              </button>

              {/* Resend Code */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-sm"
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