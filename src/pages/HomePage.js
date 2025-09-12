import React from 'react';
import PostCard from '../components/PostCard';
import { TrendingUp, Users, Star, Zap, Heart, MessageCircle, Search, Bell, Plus, Home, Compass, User, Settings, LogOut, Bookmark, UserPlus } from 'lucide-react';

const HomePage = ({ onPostClick }) => {
  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      type: 'video',
      username: 'alex_creator',
      timestamp: '2 hours ago',
      caption: 'Check out this amazing sunset timelapse! 🌅',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/4a5568/ffffff?text=Video+Thumbnail',
      likes: 1234,
      comments: 89
    },
    {
      id: 2,
      type: 'text',
      username: 'sarah_thoughts',
      timestamp: '4 hours ago',
      content: 'Just finished reading an incredible book about space exploration. The way the author describes the vastness of the universe really puts things into perspective. Sometimes we get so caught up in our daily problems that we forget how small we are in the grand scheme of things. 🚀✨',
      likes: 567,
      comments: 23
    },
    {
      id: 3,
      type: 'video',
      username: 'mike_adventures',
      timestamp: '6 hours ago',
      caption: 'Mountain biking through the forest trails! 🚵‍♂️',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/2d3748/ffffff?text=Mountain+Biking',
      likes: 892,
      comments: 45
    },
    {
      id: 4,
      type: 'text',
      username: 'emma_foodie',
      timestamp: '8 hours ago',
      content: 'Tried making homemade pasta for the first time today! It was definitely more challenging than I expected, but the results were so worth it. There\'s something magical about creating something delicious from scratch. Next up: learning how to make the perfect marinara sauce! 🍝👩‍🍳',
      likes: 445,
      comments: 67
    },
    {
      id: 5,
      type: 'video',
      username: 'david_music',
      timestamp: '12 hours ago',
      caption: 'Late night guitar session 🎸 Working on a new song',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/1a202c/ffffff?text=Guitar+Session',
      likes: 678,
      comments: 34
    },
    {
      id: 6,
      type: 'text',
      username: 'lisa_artist',
      timestamp: '1 day ago',
      content: 'Spent the entire weekend working on a new painting. Art has this incredible way of helping me process emotions and experiences. Each brushstroke feels like I\'m putting a piece of my soul onto the canvas. Can\'t wait to share the finished piece with you all! 🎨',
      likes: 789,
      comments: 56
    },
    {
      id: 7,
      type: 'video',
      username: 'tech_explorer',
      timestamp: '1 day ago',
      caption: 'Building my first drone from scratch! This project taught me so much about engineering and problem-solving 🚁',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/2563eb/ffffff?text=Drone+Project',
      likes: 1156,
      comments: 78
    },
    {
      id: 8,
      type: 'text',
      username: 'nature_lover',
      timestamp: '2 days ago',
      content: 'Just returned from an incredible week of camping in the mountains. There\'s something profoundly peaceful about disconnecting from technology and reconnecting with nature. The silence, the fresh air, and the star-filled nights reminded me of what truly matters. We need to protect these wild spaces for future generations! 🏔️⭐',
      likes: 923,
      comments: 67
    },
    {
      id: 9,
      type: 'video',
      username: 'fitness_coach',
      timestamp: '2 days ago',
      caption: 'Morning workout routine that changed my life! Consistency is key 💪',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/059669/ffffff?text=Fitness+Routine',
      likes: 1435,
      comments: 94
    },
    {
      id: 10,
      type: 'text',
      username: 'book_enthusiast',
      timestamp: '3 days ago',
      content: 'Just finished reading "The Midnight Library" and I\'m absolutely blown away. This book made me reflect on all the different paths our lives could take and the infinite possibilities that exist in every moment. It\'s a beautiful reminder that it\'s never too late to change direction and pursue what truly makes us happy. Highly recommend! 📚✨',
      likes: 634,
      comments: 45
    },
    {
      id: 11,
      type: 'video',
      username: 'travel_vlogger',
      timestamp: '3 days ago',
      caption: 'Hidden waterfall discovered on my latest adventure! Sometimes the best destinations aren\'t on any map 🌊',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://via.placeholder.com/640x360/0891b2/ffffff?text=Hidden+Waterfall',
      likes: 2187,
      comments: 156
    },
    {
      id: 12,
      type: 'text',
      username: 'startup_founder',
      timestamp: '4 days ago',
      content: 'Two years ago, I was working a corporate job that drained my soul. Today, I\'m proud to announce that our startup just reached 100,000 users! The journey hasn\'t been easy - there were countless nights of doubt, failed pitches, and moments where giving up seemed like the only option. But every obstacle taught me something valuable. To anyone considering taking the leap: your dreams are valid, and the world needs what only you can create! 🚀💡',
      likes: 1789,
      comments: 234
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Your Profile</h3>
                    <p className="text-sm text-gray-500">@yourhandle</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Menu</h3>
                  <nav className="space-y-1">
                    {[
                      { icon: Home, label: 'Home', active: true },
                      { icon: Compass, label: 'Explore' },
                      { icon: Bookmark, label: 'Saved' },
                      { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href="#"
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          item.active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Trending
                </h3>
                <div className="space-y-2">
                  {['#TechInnovation', '#CreativeArts', '#Sustainability', '#DigitalNomad'].map((topic) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 hover:underline cursor-pointer">{topic}</span>
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 10}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Create Post Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                      What's on your mind?
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Plus className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">Live</span>
                  </button>
                </div>
              </div>

              {/* Posts Feed */}
              {mockPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <PostCard post={post} onCommentClick={onPostClick} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              {/* Suggested Users */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Suggestions for you</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">See All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Creative', handle: '@alex_creative', mutual: '5 mutual friends' },
                    { name: 'Sarah Explorer', handle: '@sarah_explorer', mutual: '12 mutual friends' },
                    { name: 'Mike Tech', handle: '@mike_tech', mutual: '3 mutual friends' },
                    { name: 'Emma Chef', handle: '@emma_chef', mutual: '8 mutual friends' },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.mutual}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Creators */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Top Creators
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Creative', followers: '12.3K', verified: true },
                    { name: 'Sarah Explorer', followers: '9.8K', verified: false },
                    { name: 'Mike Tech', followers: '15.1K', verified: true },
                  ].map((creator, index) => (
                    <div key={creator.name} className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        {creator.verified && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white">
                            <Star className="h-1.5 w-1.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{creator.name}</p>
                        <p className="text-xs text-gray-500">{creator.followers} followers</p>
                      </div>
                      <span className="text-lg">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex flex-wrap gap-2">
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Help</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                  </div>
                  <p className="mt-2">© 2024 Sportech. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 p-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <Search className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">Search</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <Plus className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">Create</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 relative">
            <Bell className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">Activity</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;