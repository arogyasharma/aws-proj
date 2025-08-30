import React from 'react';
import PostCard from '../components/PostCard';

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
    }
  ];

  return (
    <div className="min-h-screen bg-dark-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onCommentClick={onPostClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;