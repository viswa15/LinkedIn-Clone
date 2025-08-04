import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore'; // Changed import
import { Home, User, LogOut, Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ConnectHub</span>
            </Link>
          </div>

          {user && (
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:block">Home</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
              <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:block text-gray-700 font-medium">{user.name}</span>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;