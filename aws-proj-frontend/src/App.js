import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import PostDetailPage from './pages/PostDetailPage';


// Dark mode context and hook
export const DarkModeContext = createContext({ darkMode: false, setDarkMode: () => {} });
export function useDarkMode() {
  return useContext(DarkModeContext);
}

function App() {
  // Dark mode state and context
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      // Default to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <AuthProvider>
        <div className={darkMode ? 'min-h-screen bg-dark-100 dark' : 'min-h-screen bg-dark-100'}>
          <Navbar 
            onLogoClick={() => setCurrentPage('home')}
            onCreateClick={() => setCurrentPage('upload')}
          />
          <main className="pt-20">
            {renderPage()}
          </main>
        </div>
      </AuthProvider>
    </DarkModeContext.Provider>
  );
}

export default App;