import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NewsProvider } from './contexts/NewsContext';
import { AuthProvider } from './contexts/AuthContext';

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';

// Страницы
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import NewsGenerator from './pages/NewsGenerator';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import LoadingAnimation from './components/LoadingAnimation';

// Стили
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Убедимся, что компонент анимации отображается
  useEffect(() => {
    console.log("App mounted, isLoading:", isLoading);
  }, []);

  const handleAnimationComplete = () => {
    console.log("Animation complete callback triggered");
    setIsAnimationComplete(true);
    setTimeout(() => {
      console.log("Setting isLoading to false");
      setIsLoading(false);
    }, 800);
  };

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NewsProvider>
            <div className={`app-container ${isAnimationComplete ? 'fade-in' : ''}`}>
              {isLoading ? (
                <LoadingAnimation onAnimationComplete={handleAnimationComplete} />
              ) : (
                <div className="app">
                  <Header />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/news/:id" element={<NewsDetail />} />
                      <Route path="/generator" element={<NewsGenerator />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              )}
            </div>
          </NewsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 