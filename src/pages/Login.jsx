import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: form.email.split('@')[0], email: form.email });
      setLoading(false);
      navigate('/courses');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex chess-pattern">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-black flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2 text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-mono text-sm">Back to Home</span>
        </Link>
        <div>
          <div className="w-20 h-20 bg-[#FFB3C6] rounded-2xl flex items-center justify-center mb-6">
            <Crown className="w-10 h-10 text-black" />
          </div>
          <h2 className="font-display text-5xl font-black text-white mb-4">Welcome<br />Back, Champion.</h2>
          <p className="text-gray-400 leading-relaxed">Your next great move awaits. Continue your journey to mastery.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Students', val: '2,400+' },
              { label: 'Lessons', val: '150+' },
              { label: 'Coaches', val: '50+' },
              { label: 'Rating', val: '4.9★' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <div className="text-[#F5FF00] font-bold text-xl">{s.val}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm">"Chess is the art of analysis." — Mikhail Botvinnik</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#F5FF00]" />
              </div>
              <span className="font-display text-2xl font-black">CCAW</span>
            </Link>
          </div>

          <h1 className="font-display text-4xl font-black mb-2">Sign In</h1>
          <p className="text-gray-500 mb-8">Enter your credentials to continue learning.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input type="email" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-[#F5FF00] font-bold rounded-xl hover:bg-[#FFB3C6] hover:text-black transition-all duration-200 text-lg disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In ♟'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">Demo: any email & password works</span>
          </div>

          <div className="mt-8 text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="font-bold text-black hover:text-[#ff85a1] underline">Register free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
