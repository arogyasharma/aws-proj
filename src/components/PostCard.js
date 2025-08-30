import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';

const PostCard = ({ post, onCommentClick }) => {
  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(post);
    }
  };

  return (
    <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-gray-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{post.username}</h3>
            <p className="text-gray-400 text-sm">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {post.type === 'video' ? (
          <div className="mb-4">
            {post.caption && (
              <p className="text-white mb-3">{post.caption}</p>
            )}
            <video
              className="w-full rounded-lg"
              controls
              poster={post.thumbnail}
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-white text-lg leading-relaxed">{post.content}</p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-dark-300">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="h-6 w-6" />
            <span className="text-sm">{post.likes}</span>
          </button>

          {/* Comment Button */}
          <button 
            onClick={handleCommentClick}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-sm">{post.comments}</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
            <Share className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;