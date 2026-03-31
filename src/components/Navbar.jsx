import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Crown, ChevronDown } from 'lucide-react';

const navLinks = [
  { path: '/courses', label: 'Courses' },
  { path: '/live', label: 'Live Classes' },
  { path: '/recorded', label: 'Recorded' },
  { path: '/progress', label: 'My Progress' },
  { path: '/play', label: 'Play Chess' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg border-b-2 border-[#FFB3C6]' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-[#FFB3C6] transition-colors duration-300">
              <Crown className="w-5 h-5 text-[#F5FF00]" />
            </div>
            <div>
              <span className="font-display text-xl font-black text-black">CCAW</span>
              <div className="text-[9px] font-mono text-gray-400 -mt-1 tracking-widest uppercase">Chess Academy</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-black text-[#F5FF00]'
                    : 'text-gray-700 hover:bg-[#FFB3C6] hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFB3C6] rounded-full font-medium text-sm hover:bg-[#ff85a1] transition-colors"
                >
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[#F5FF00] text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  {user?.name || 'User'}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-xl shadow-xl overflow-hidden">
                    <Link to="/progress" onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-[#B8E4FF] transition-colors">My Profile</Link>
                    <Link to="/play" onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-[#B8E4FF] transition-colors">Play Chess</Link>
                    <hr className="border-gray-200" />
                    <button onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"
                  className="px-5 py-2 rounded-full border-2 border-black text-sm font-semibold hover:bg-black hover:text-[#F5FF00] transition-all duration-200">
                  Login
                </Link>
                <Link to="/register"
                  className="px-5 py-2 rounded-full bg-black text-[#F5FF00] text-sm font-semibold hover:bg-[#FFB3C6] hover:text-black transition-all duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t-2 border-[#FFB3C6] animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium text-sm ${
                  location.pathname === link.path
                    ? 'bg-black text-[#F5FF00]'
                    : 'text-gray-700 hover:bg-[#FFB3C6]'
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              {isLoggedIn ? (
                <button onClick={handleLogout}
                  className="flex-1 py-2 rounded-xl border-2 border-red-400 text-red-500 text-sm font-semibold">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="flex-1 py-2 rounded-xl border-2 border-black text-center text-sm font-semibold">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-black text-[#F5FF00] text-center text-sm font-semibold">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
