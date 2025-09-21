import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User, Bookmark } from 'lucide-react';

const PostCard = ({ post, onCommentClick }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(post);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{post.username}</h3>
            <p className="text-gray-500 text-xs">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div>
        {post.type === 'video' && (
          <div>
            <video
              className="w-full aspect-square object-cover"
              controls
              poster={post.thumbnail}
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        {post.type === 'image' && (
          <div>
            <img
              src={post.imageUrl}
              alt={post.caption || 'User post'}
              className="w-full aspect-square object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="w-full aspect-square bg-gray-200 flex items-center justify-center hidden"
              style={{ display: 'none' }}
            >
              <p className="text-gray-500">Failed to load image</p>
            </div>
          </div>
        )}
        
        {/* Caption/Content */}
        <div className="p-4">
          {(post.type === 'video' || post.type === 'image') && post.caption && (
            <p className="text-gray-900 text-sm mb-3">{post.caption}</p>
          )}
          {post.type === 'text' && (
            <p className="text-gray-900 text-sm leading-relaxed">{post.content}</p>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button 
              onClick={handleLike}
              className="transition-colors hover:text-gray-500"
            >
              <Heart 
                className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} 
              />
            </button>

            {/* Comment Button */}
            <button 
              onClick={handleCommentClick}
              className="text-gray-900 hover:text-gray-500 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
            </button>

            {/* Share Button */}
            <button className="text-gray-900 hover:text-gray-500 transition-colors">
              <Share className="h-6 w-6" />
            </button>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className="transition-colors hover:text-gray-500"
          >
            <Bookmark 
              className={`h-6 w-6 ${saved ? 'fill-gray-900 text-gray-900' : 'text-gray-900'}`} 
            />
          </button>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <p className="text-gray-900 font-semibold text-sm">
            {liked ? post.likes + 1 : post.likes} likes
          </p>
        </div>

        {/* Comments Preview */}
        {post.comments > 0 && (
          <button 
            onClick={handleCommentClick}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            View all {post.comments} comments
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;