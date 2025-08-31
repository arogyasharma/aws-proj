import React, { useState } from 'react';
import { ArrowLeft, Send, User } from 'lucide-react';
import PostCard from '../components/PostCard';

const PostDetailPage = ({ post, onBack }) => {
  const [newComment, setNewComment] = useState('');

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      username: 'john_doe',
      timestamp: '1 hour ago',
      content: 'This is absolutely amazing! Thanks for sharing this with us. 🔥'
    },
    {
      id: 2,
      username: 'maria_garcia',
      timestamp: '2 hours ago',
      content: 'Love the creativity here! How long did this take to create?'
    },
    {
      id: 3,
      username: 'tech_enthusiast',
      timestamp: '3 hours ago',
      content: 'Incredible work! The attention to detail is outstanding. Keep it up! 👏'
    },
    {
      id: 4,
      username: 'creative_soul',
      timestamp: '4 hours ago',
      content: 'This really resonates with me. Thank you for putting this out there.'
    }
  ];

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
      alert('Comment posted successfully!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-white text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-all duration-300 mb-8 p-3 rounded-full hover:bg-purple-900/20 transform hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Feed</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post */}
          <div className="lg:col-span-2">
            <PostCard post={post} />
          </div>

          {/* Right Column - Comments */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl shadow-2xl overflow-hidden h-fit lg:sticky lg:top-24 border border-dark-400/30">
              {/* Comments Header */}
              <div className="p-6 border-b border-dark-300/50 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Comments ({mockComments.length})
                </h3>
              </div>

              {/* Comments List */}
              <div className="max-h-96 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {mockComments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className="flex space-x-4 p-4 rounded-xl bg-gradient-to-r from-dark-100/30 to-dark-200/30 hover:from-dark-200/50 hover:to-dark-300/50 transition-all duration-300 border border-dark-400/20"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-sm font-semibold text-white">
                            {comment.username}
                          </h4>
                          <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-6 border-t border-dark-300/50 bg-gradient-to-r from-dark-100/20 to-dark-200/20">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-sm transition-all duration-300 hover:border-blue-500/30 shadow-inner"
                      />
                      <button
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;