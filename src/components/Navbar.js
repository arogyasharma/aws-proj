import React, { useState } from 'react';
import { Search, Plus, Bell, User, LogOut, Settings, UserCircle, Heart, Bookmark, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Navbar = ({ onLogoClick, onCreateClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleProfileClick = () => {
    console.log('Navigate to profile page');
    setShowUserMenu(false);
    // TODO: Add navigation to profile page
  };

  const handleSettingsClick = () => {
    console.log('Navigate to settings page');
    setShowUserMenu(false);
    // TODO: Add navigation to settings page
  };

  const handleLikedPostsClick = () => {
    console.log('Navigate to liked posts');
    setShowUserMenu(false);
    // TODO: Add navigation to liked posts page
  };

  const handleBookmarksClick = () => {
    console.log('Navigate to bookmarks');
    setShowUserMenu(false);
    // TODO: Add navigation to bookmarks page
  };

  const handleActivityClick = () => {
    console.log('Navigate to activity/analytics');
    setShowUserMenu(false);
    // TODO: Add navigation to activity page
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900/40 via-blue-900/50 to-teal-900/40 border-b border-purple-500/20 z-50 backdrop-blur-lg bg-opacity-95 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-blue-300 hover:to-teal-300 transition-all duration-300 transform hover:scale-110"
            >
              Sportech
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search sportech..."
                className="block w-full pl-12 pr-4 py-3 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 hover:from-purple-900/30 hover:to-blue-900/30 shadow-inner backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {/* Create Post Button */}
                <button
                  onClick={onCreateClick}
                  className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Create Post</span>
                </button>

                {/* Notification Bell */}
                <button className="p-3 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-dark-400/50 relative">
                  <Bell className="h-6 w-6" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-1 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <div className="w-11 h-11 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center hover:from-green-400 hover:to-teal-400 transition-all duration-300 shadow-lg ring-2 ring-green-500/20">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </button>

                  {/* Enhanced User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl shadow-2xl border border-dark-400/30 z-50 backdrop-blur-sm">
                      {/* User Profile Header */}
                      <div className="p-6 border-b border-dark-400/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-500/20">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg">
                              {user?.attributes?.name || 
                               user?.attributes?.given_name || 
                               'User'}
                            </h3>
                            <p className="text-gray-300 text-sm">{user?.attributes?.email || user?.username}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">Pro Member</span>
                              <span className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded-full">Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Menu Items */}
                      <div className="p-2">
                        {/* View Profile */}
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                            <UserCircle className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">View Profile</span>
                            <p className="text-xs text-gray-400">See your public profile</p>
                          </div>
                        </button>

                        {/* Activity & Analytics */}
                        <button
                          onClick={handleActivityClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-teal-500/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                            <TrendingUp className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Activity</span>
                            <p className="text-xs text-gray-400">View your stats & analytics</p>
                          </div>
                        </button>

                        {/* Liked Posts */}
                        <button
                          onClick={handleLikedPostsClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-red-500/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-all">
                            <Heart className="h-5 w-5 text-pink-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Liked Posts</span>
                            <p className="text-xs text-gray-400">Posts you've liked</p>
                          </div>
                        </button>

                        {/* Bookmarks */}
                        <button
                          onClick={handleBookmarksClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-all">
                            <Bookmark className="h-5 w-5 text-amber-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Bookmarks</span>
                            <p className="text-xs text-gray-400">Saved posts</p>
                          </div>
                        </button>

                        {/* Settings */}
                        <button
                          onClick={handleSettingsClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-500/20 hover:to-slate-500/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-gray-500/20 rounded-lg group-hover:bg-gray-500/30 transition-all">
                            <Settings className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Settings</span>
                            <p className="text-xs text-gray-400">Account preferences</p>
                          </div>
                        </button>

                        <div className="border-t border-dark-400/30 mt-2 pt-2">
                          {/* Sign Out */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-4 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-rose-500/20 rounded-xl transition-all duration-300 group"
                          >
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                              <LogOut className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="flex-1 text-left">
                              <span className="font-medium">Sign Out</span>
                              <p className="text-xs text-gray-400">End your session</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors px-4 py-2"
                >
                  Sign In
                </button>

                {/* Signup Button */}
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;