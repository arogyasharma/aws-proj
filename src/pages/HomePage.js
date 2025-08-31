import React from 'react';
import PostCard from '../components/PostCard';
import { TrendingUp, Users, Star, Zap, Heart, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-500/5 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/50 to-teal-900/40 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4 animate-fade-in">
                Welcome to Sportech
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                Connect, share, and discover amazing content from our vibrant community of creators and innovators
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">25.4K</div>
                  <div className="text-sm text-purple-300">Active Users</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <Heart className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">1.2M</div>
                  <div className="text-sm text-blue-300">Likes Given</div>
                </div>
                
                <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <MessageCircle className="h-8 w-8 text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">456K</div>
                  <div className="text-sm text-teal-300">Comments</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-green-300">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Trending Topics */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 sticky top-28">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 text-purple-400 mr-2" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {['#TechInnovation', '#CreativeArts', '#Sustainability', '#DigitalNomad', '#FutureOfWork'].map((topic, index) => (
                    <div key={topic} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 cursor-pointer">
                      <span className="text-purple-300 font-medium">{topic}</span>
                      <span className="text-xs text-gray-400">{Math.floor(Math.random() * 50) + 10}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Feed */}
            <div className="lg:col-span-2 space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Latest Posts
                </h2>
                <p className="text-gray-400">Stay updated with the newest content</p>
              </div>
              
              {mockPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="transform transition-all duration-500 hover:scale-[1.01] animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <PostCard
                    post={post}
                    onCommentClick={onPostClick}
                  />
                </div>
              ))}
            </div>

            {/* Right Sidebar - Community Highlights */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-teal-900/30 to-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30 sticky top-28">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="h-6 w-6 text-teal-400 mr-2" />
                  Top Creators
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Creative', followers: '12.3K', avatar: '🎨' },
                    { name: 'Sarah Explorer', followers: '9.8K', avatar: '🌍' },
                    { name: 'Mike Tech', followers: '15.1K', avatar: '💻' },
                    { name: 'Emma Chef', followers: '8.4K', avatar: '👩‍🍳' },
                  ].map((creator, index) => (
                    <div key={creator.name} className="flex items-center p-3 bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-xl hover:from-teal-500/20 hover:to-green-500/20 transition-all duration-300 cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-400 rounded-full flex items-center justify-center text-lg mr-3">
                        {creator.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{creator.name}</div>
                        <div className="text-teal-300 text-xs">{creator.followers} followers</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Zap className="h-6 w-6 text-blue-400 mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Create Post
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Go Live
                  </button>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/50 to-teal-900/40 backdrop-blur-sm border-t border-purple-500/20 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-300 mb-2">Join thousands of creators sharing their passion</p>
              <div className="flex justify-center space-x-4 text-sm text-purple-300">
                <span>© 2024 Sportech</span>
                <span>•</span>
                <span>Privacy</span>
                <span>•</span>
                <span>Terms</span>
                <span>•</span>
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;