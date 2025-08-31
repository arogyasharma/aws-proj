import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPostClick={handlePostClick} />;
      case 'upload':
        return <UploadPage />;
      case 'postDetail':
        return <PostDetailPage post={selectedPost} onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onPostClick={handlePostClick} />;
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentPage('postDetail');
  };

  return (
    <div className="min-h-screen bg-dark-100">
      <Navbar 
        onLogoClick={() => setCurrentPage('home')}
        onCreateClick={() => setCurrentPage('upload')}
      />
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;