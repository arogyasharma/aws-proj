# VibeShare - Video and Post Sharing Platform

A modern, responsive front-end for a video and post sharing platform built with React.js and Tailwind CSS.

## Features

- **Dark Theme UI**: Modern, clean interface optimized for dark mode
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Post Types**: Support for both text posts and video uploads
- **Interactive Feed**: Home feed with like, comment, and share functionality
- **Post Details**: Detailed view with comments section
- **Upload Interface**: Clean upload forms for both text and video content

## Technology Stack

- **React.js**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **HTML5 Video**: Native video player support

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation bar component
│   └── PostCard.js        # Reusable post card component
├── pages/
│   ├── HomePage.js        # Main feed page
│   ├── UploadPage.js      # Post creation page
│   └── PostDetailPage.js  # Individual post view with comments
├── App.js                 # Main application component
├── index.js              # Application entry point
└── index.css             # Global styles with Tailwind imports
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Component Overview

### Navbar
- VibeShare logo (clickable to return home)
- Centered search bar
- Create Post button
- Notification bell
- User avatar placeholder

### PostCard
- Displays both video and text posts
- User information header
- Interactive action bar (like, comment, share)
- Responsive video player for video posts

### HomePage
- Single-column feed layout
- Mock data with mixed post types
- Centered content with proper spacing

### UploadPage
- Tabbed interface for text/video posts
- Drag-and-drop video upload area
- Form validation and user feedback

### PostDetailPage
- Two-column layout (desktop) / single column (mobile)
- Post display with comments section
- Interactive comment input

## AWS Integration Ready

The application is structured to easily integrate with AWS services:

- **S3**: For video and image storage
- **CloudFront**: For content delivery
- **Lambda**: For serverless backend functions
- **API Gateway**: For REST API endpoints
- **DynamoDB**: For post and user data storage
- **Cognito**: For user authentication
- **Auto Scaling**: Ready for horizontal scaling

## Mock Data

The application includes comprehensive mock data for demonstration:
- 6 sample posts (mix of text and video)
- User profiles with avatars
- Comment threads
- Engagement metrics (likes, comments)

## Responsive Design

- **Mobile**: Single column layout, collapsible navigation
- **Tablet**: Optimized spacing and touch targets
- **Desktop**: Multi-column layouts, hover effects

## Future Enhancements

- User authentication system
- Real-time notifications
- Video processing and thumbnails
- Advanced search functionality
- User profiles and following system
- Content moderation tools