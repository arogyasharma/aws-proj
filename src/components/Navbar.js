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
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110"
            >
              Sportech
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search sportech..."
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-white shadow-sm"
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
                  className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Create Post</span>
                </button>

                {/* Notification Bell */}
                <button className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 rounded-full hover:bg-gray-100 relative">
                  <Bell className="h-6 w-6" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {/* User Avatar with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-1 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                  >
                    <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-lg ring-2 ring-blue-500/20">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </button>

                  {/* Enhanced User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                      {/* User Profile Header */}
                      <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-500/20">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-900 font-bold text-lg">
                              {user?.attributes?.['custom:name'] || 
                               user?.attributes?.given_name || 
                               'User'}
                            </h3>
                            <p className="text-gray-600 text-sm">{user?.attributes?.email || user?.username}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Pro Member</span>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Menu Items */}
                      <div className="p-2">
                        {/* View Profile */}
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                            <UserCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">View Profile</span>
                            <p className="text-xs text-gray-500">See your public profile</p>
                          </div>
                        </button>

                        {/* Activity & Analytics */}
                        <button
                          onClick={handleActivityClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Activity</span>
                            <p className="text-xs text-gray-500">View your stats & analytics</p>
                          </div>
                        </button>

                        {/* Liked Posts */}
                        <button
                          onClick={handleLikedPostsClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-pink-50 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-all">
                            <Heart className="h-5 w-5 text-pink-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Liked Posts</span>
                            <p className="text-xs text-gray-500">Posts you've liked</p>
                          </div>
                        </button>

                        {/* Bookmarks */}
                        <button
                          onClick={handleBookmarksClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-amber-50 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-all">
                            <Bookmark className="h-5 w-5 text-amber-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Bookmarks</span>
                            <p className="text-xs text-gray-500">Saved posts</p>
                          </div>
                        </button>

                        {/* Settings */}
                        <button
                          onClick={handleSettingsClick}
                          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-all">
                            <Settings className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-medium">Settings</span>
                            <p className="text-xs text-gray-500">Account preferences</p>
                          </div>
                        </button>

                        <div className="border-t border-gray-200 mt-2 pt-2">
                          {/* Sign Out */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-4 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                          >
                            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-all">
                              <LogOut className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <span className="font-medium">Sign Out</span>
                              <p className="text-xs text-gray-500">End your session</p>
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
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors px-4 py-2"
                >
                  Sign In
                </button>

                {/* Signup Button */}
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
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