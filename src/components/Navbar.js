import React from 'react';
import { Search, Plus, Bell, User } from 'lucide-react';

const Navbar = ({ onLogoClick, onCreateClick }) => {
  return (
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

            {/* User Avatar */}
            <button className="p-1 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110">
              <div className="w-11 h-11 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center hover:from-green-400 hover:to-teal-400 transition-all duration-300 shadow-lg ring-2 ring-green-500/20">
                <User className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;