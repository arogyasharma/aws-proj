import React from 'react';
import { Search, Plus, Bell, User } from 'lucide-react';

const Navbar = ({ onLogoClick, onCreateClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-200 border-b border-dark-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
            >
              VibeShare
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search VibeShare..."
                className="block w-full pl-10 pr-3 py-2 border border-dark-300 rounded-full bg-dark-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Create Post Button */}
            <button
              onClick={onCreateClick}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Create Post</span>
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-6 w-6" />
            </button>

            {/* User Avatar */}
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;