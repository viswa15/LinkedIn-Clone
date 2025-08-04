// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import HomePage from './pages/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
 // Get authentication state directly from the Zustand store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // The ProtectedRoute component now handles the initial loading state
  // while the store rehydrates from localStorage.

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        {isAuthenticated && <Header />}
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterForm />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;