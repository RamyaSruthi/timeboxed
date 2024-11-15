// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SchedulerWrapper from './components/SchedulerWrapper';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<SchedulerWrapper />} />
            <Route path="/:date" element={<SchedulerWrapper />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;