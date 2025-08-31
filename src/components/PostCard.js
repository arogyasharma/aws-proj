import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';

const PostCard = ({ post, onCommentClick }) => {
  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(post);
    }
  };

  return (
    <div className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl shadow-2xl overflow-hidden border border-dark-400/30 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-dark-200/50 to-dark-300/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-500/20">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{post.username}</h3>
            <p className="text-blue-300 text-sm bg-blue-500/10 px-2 py-1 rounded-full inline-block">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-dark-400/50 transform hover:scale-110">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {post.type === 'video' ? (
          <div className="mb-6">
            {post.caption && (
              <p className="text-gray-100 mb-4 text-lg leading-relaxed">{post.caption}</p>
            )}
            <video
              className="w-full rounded-2xl shadow-lg ring-1 ring-dark-400/30"
              controls
              poster={post.thumbnail}
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-100 text-lg leading-relaxed bg-gradient-to-r from-dark-100/30 to-dark-200/30 p-4 rounded-xl border border-dark-400/20">{post.content}</p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-dark-300/50 bg-gradient-to-r from-dark-100/20 to-dark-200/20">
        <div className="flex items-center space-x-8">
          {/* Like Button */}
          <button className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-all duration-300 p-2 rounded-full hover:bg-red-500/10 transform hover:scale-110 group">
            <Heart className="h-6 w-6 group-hover:fill-red-400" />
            <span className="text-sm font-semibold">{post.likes}</span>
          </button>

          {/* Comment Button */}
          <button 
            onClick={handleCommentClick}
            className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-all duration-300 p-2 rounded-full hover:bg-blue-500/10 transform hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-sm font-semibold">{post.comments}</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-all duration-300 p-2 rounded-full hover:bg-green-500/10 transform hover:scale-110">
            <Share className="h-6 w-6" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;