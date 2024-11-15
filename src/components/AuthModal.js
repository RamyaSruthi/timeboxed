// components/AuthModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthModal = ({ isOpen, onClose }) => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      onClose();
      // You can store the user data in your app's state here
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-r from-purple-400 to-pink-400">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xl">🕒</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8">
                <h3 className="text-2xl font-medium text-center mb-8">
                  Welcome to TimeIt
                </h3>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;