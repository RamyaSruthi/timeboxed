// Navbar.js

import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogIn, LogOut, User } from 'lucide-react';
import { auth } from '../firebase'; // This import should work now
import { signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ currentDate, setCurrentDate }) => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user } = useAuth();

  const handleDateChange = (days) => {
    const newDate = days > 0 ? addDays(currentDate, days) : subDays(currentDate, Math.abs(days));
    setCurrentDate(newDate);
    navigate(`/${format(newDate, 'yyyy-MM-dd')}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-white/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  TimeIt
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleDateChange(-1)}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                >
                  <ChevronLeft size={18} />
                </button>

                <h2 className="text-lg font-medium min-w-[200px] text-center">
                  {format(currentDate, 'EEEE, MMMM d')}
                </h2>

                <button 
                  onClick={() => handleDateChange(1)}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName}
                    </span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md hover:opacity-90 transition-opacity"
                >
                  <LogIn size={18} />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};

export default Navbar;