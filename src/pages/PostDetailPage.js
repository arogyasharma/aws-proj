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
    <div className="min-h-screen bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Feed</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post */}
          <div className="lg:col-span-2">
            <PostCard post={post} />
          </div>

          {/* Right Column - Comments */}
          <div className="lg:col-span-1">
            <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden h-fit lg:sticky lg:top-24">
              {/* Comments Header */}
              <div className="p-4 border-b border-dark-300">
                <h3 className="text-lg font-semibold text-white">
                  Comments ({mockComments.length})
                </h3>
              </div>

              {/* Comments List */}
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-white">
                            {comment.username}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-dark-300">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 bg-dark-100 border border-dark-300 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                      >
                        <Send className="h-4 w-4" />
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