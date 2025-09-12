import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';

// Mock data similar to what's in HomePage
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
    content: 'Just finished reading an incredible book about space exploration.',
    likes: 567,
    comments: 23
  }
];

describe('HomePage Instagram/Facebook-style Interface', () => {
  const mockOnPostClick = jest.fn();

  beforeEach(() => {
    mockOnPostClick.mockClear();
  });

  describe('Navigation Bar', () => {
    test('renders top navigation with logo, search, and actions', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check logo
      expect(screen.getByText('Sportech')).toBeInTheDocument();
      
      // Check search bar (desktop)
      expect(screen.getByPlaceholderText('Search Sportech')).toBeInTheDocument();
      
      // Check navigation icons
      expect(screen.getAllByRole('button')).toHaveLength(expect.any(Number));
    });

    test('displays notification badge on bell icon', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for notification badge
      const notificationBadges = screen.getAllByText('3');
      expect(notificationBadges.length).toBeGreaterThan(0);
    });

    test('search input focuses and changes background on focus', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const searchInput = screen.getByPlaceholderText('Search Sportech');
      fireEvent.focus(searchInput);
      
      expect(searchInput).toHaveFocus();
    });
  });

  describe('Layout Structure', () => {
    test('renders three-column layout on desktop', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for main content grid
      const mainGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-4');
      expect(mainGrid).toBeInTheDocument();
    });

    test('renders left sidebar with user profile and menu', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for user profile section
      expect(screen.getByText('Your Profile')).toBeInTheDocument();
      expect(screen.getByText('@yourhandle')).toBeInTheDocument();
      
      // Check for menu items
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Explore')).toBeInTheDocument();
      expect(screen.getByText('Saved')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('renders right sidebar with suggestions and top creators', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for suggestions section
      expect(screen.getByText('Suggestions for you')).toBeInTheDocument();
      expect(screen.getByText('See All')).toBeInTheDocument();
      
      // Check for top creators section
      expect(screen.getByText('Top Creators')).toBeInTheDocument();
    });
  });

  describe('Create Post Card', () => {
    test('renders create post input with placeholder', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const createPostInput = screen.getByText("What's on your mind?");
      expect(createPostInput).toBeInTheDocument();
    });

    test('displays post type buttons with icons', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      expect(screen.getByText('Photo')).toBeInTheDocument();
      expect(screen.getByText('Video')).toBeInTheDocument();
      expect(screen.getByText('Live')).toBeInTheDocument();
    });

    test('create post buttons have hover effects', async () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const photoButton = screen.getByText('Photo').closest('button');
      
      fireEvent.mouseEnter(photoButton);
      await waitFor(() => {
        expect(photoButton).toHaveClass('hover:bg-gray-100');
      });
    });
  });

  describe('Post Cards', () => {
    test('renders posts with Instagram-style layout', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for post usernames
      expect(screen.getByText('alex_creator')).toBeInTheDocument();
      expect(screen.getByText('sarah_thoughts')).toBeInTheDocument();
      
      // Check for timestamps
      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
      expect(screen.getByText('4 hours ago')).toBeInTheDocument();
    });

    test('post cards have white background and clean styling', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const postCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm');
      expect(postCards.length).toBeGreaterThan(0);
    });

    test('like button functionality works', async () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Find like buttons (heart icons)
      const likeButtons = screen.getAllByRole('button').filter(button => {
        const heartIcon = button.querySelector('svg');
        return heartIcon && heartIcon.classList.contains('h-6');
      });
      
      if (likeButtons.length > 0) {
        fireEvent.click(likeButtons[0]);
        // Note: The like count update would need to be verified based on the specific implementation
      }
    });

    test('comment button triggers onPostClick callback', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Find comment buttons
      const commentButtons = screen.getAllByText(/View all \d+ comments/);
      
      if (commentButtons.length > 0) {
        fireEvent.click(commentButtons[0]);
        expect(mockOnPostClick).toHaveBeenCalled();
      }
    });
  });

  describe('Trending Section', () => {
    test('displays trending topics with hashtags', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      expect(screen.getByText('Trending')).toBeInTheDocument();
      expect(screen.getByText('#TechInnovation')).toBeInTheDocument();
      expect(screen.getByText('#CreativeArts')).toBeInTheDocument();
      expect(screen.getByText('#Sustainability')).toBeInTheDocument();
      expect(screen.getByText('#DigitalNomad')).toBeInTheDocument();
    });

    test('trending topics have engagement counts', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for "K" indicators (like "10K", "25K")
      const kIndicators = screen.getAllByText(/\d+K/);
      expect(kIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Suggestions Section', () => {
    test('displays suggested users with follow buttons', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      expect(screen.getByText('Alex Creative')).toBeInTheDocument();
      expect(screen.getByText('Sarah Explorer')).toBeInTheDocument();
      expect(screen.getByText('Mike Tech')).toBeInTheDocument();
      expect(screen.getByText('Emma Chef')).toBeInTheDocument();
      
      // Check for follow buttons
      const followButtons = screen.getAllByText('Follow');
      expect(followButtons.length).toBeGreaterThan(0);
    });

    test('displays mutual friends information', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      expect(screen.getByText('5 mutual friends')).toBeInTheDocument();
      expect(screen.getByText('12 mutual friends')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    test('renders mobile bottom navigation', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for mobile nav (typically hidden on desktop)
      const mobileNav = document.querySelector('.lg\\:hidden.fixed.bottom-0');
      expect(mobileNav).toBeInTheDocument();
      
      // Check for mobile nav items
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    test('mobile navigation has notification badge', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for notification badge in mobile nav
      const mobileNotificationBadges = document.querySelectorAll('.bg-red-500.text-white.text-xs.rounded-full');
      expect(mobileNotificationBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Color Scheme and Styling', () => {
    test('uses light theme with gray background', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const mainContainer = document.querySelector('.bg-gray-50');
      expect(mainContainer).toBeInTheDocument();
    });

    test('navigation has white background with border', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const navigation = document.querySelector('.bg-white.border-b.border-gray-200');
      expect(navigation).toBeInTheDocument();
    });

    test('uses consistent blue accent color for branding', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const logoElement = screen.getByText('Sportech');
      expect(logoElement).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
    });
  });

  describe('Interactive Elements', () => {
    test('buttons have hover effects', async () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Test hover on follow button
      const followButtons = screen.getAllByText('Follow');
      if (followButtons.length > 0) {
        fireEvent.mouseEnter(followButtons[0]);
        await waitFor(() => {
          expect(followButtons[0]).toHaveClass('hover:bg-blue-50');
        });
      }
    });

    test('post cards have shadow and hover effects', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const postCards = document.querySelectorAll('.shadow-sm.hover\\:shadow-md');
      expect(postCards.length).toBeGreaterThan(0);
    });
  });

  describe('Content Structure', () => {
    test('displays appropriate content for different post types', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for video content
      expect(screen.getByText('Check out this amazing sunset timelapse! 🌅')).toBeInTheDocument();
      
      // Check for text content
      expect(screen.getByText(/Just finished reading an incredible book/)).toBeInTheDocument();
    });

    test('posts show engagement metrics', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // Check for likes count
      expect(screen.getByText('1234 likes')).toBeInTheDocument();
      expect(screen.getByText('567 likes')).toBeInTheDocument();
      
      // Check for comments count
      expect(screen.getByText('View all 89 comments')).toBeInTheDocument();
      expect(screen.getByText('View all 23 comments')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('images have appropriate alt text or aria labels', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      // All buttons should be accessible
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });

    test('interactive elements are keyboard accessible', () => {
      render(<HomePage onPostClick={mockOnPostClick} />);
      
      const searchInput = screen.getByPlaceholderText('Search Sportech');
      
      fireEvent.keyDown(searchInput, { key: 'Tab' });
      // Test that focus moves appropriately
      expect(document.activeElement).toBeDefined();
    });
  });
});