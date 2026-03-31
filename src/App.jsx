import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Courses from './pages/Courses';
import LiveClasses from './pages/LiveClasses';
import RecordedClasses from './pages/RecordedClasses';
import Progress from './pages/Progress';
import ChessPlay from './pages/ChessPlay';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const hideNavOn = ['/login', '/register'];
  const showNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {showNav && <Navbar />}
      <div className="page-wrapper" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/live" element={<LiveClasses />} />
          <Route path="/recorded" element={<RecordedClasses />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/play" element={<ChessPlay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
