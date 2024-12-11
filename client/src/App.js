import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@apollo/client';

import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';

import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Custom styles

const App = () => {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Track mouse movement to update the position of the circle
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const authUser = data?.authUser;

  return (
    <div className="relative h-screen bg-slate-900">
      {authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <Toaster />

      {/* Hollow Circle Cursor */}
      <div
        className="pointer-events-none fixed border-2 border-yellow-400 rounded-full hollow-circle"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '40px', // Size of the hollow circle
          height: '40px',
          transform: 'translate(-50%, -50%)', // Center the circle on the cursor
        }}
      ></div>
    </div>
  );
};

export default App;
