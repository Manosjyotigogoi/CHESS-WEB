import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', level: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, email: form.email, level: form.level });
      setLoading(false);
      navigate('/courses');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex chess-pattern">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#F5FF00]" />
              </div>
              <span className="font-display text-2xl font-black">CCAW</span>
            </Link>
          </div>
          <h1 className="font-display text-4xl font-black mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">Join 2,400+ students mastering chess.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input type="text" required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Arjun Sharma"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Your Chess Level</label>
              <select required value={form.level}
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none bg-white">
                <option value="">Select level...</option>
                <option value="beginner">Beginner (Never played)</option>
                <option value="novice">Novice (Know the rules)</option>
                <option value="intermediate">Intermediate (800–1200 ELO)</option>
                <option value="advanced">Advanced (1200–1800 ELO)</option>
                <option value="expert">Expert (1800+ ELO)</option>
              </select>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-[#F5FF00] font-bold rounded-xl hover:bg-[#FFB3C6] hover:text-black transition-all duration-200 text-lg mt-2 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Join CCAW Free ♔'}
            </button>
          </form>
          <div className="mt-6 space-y-2">
            {['No credit card required', 'Instant access to free content', 'Cancel anytime'].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <Check className="w-4 h-4 text-green-500" /> {t}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-bold text-black hover:text-[#ff85a1] underline">Sign in</Link>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex flex-1 bg-[#FFB3C6] flex-col justify-center p-12">
        <div className="max-w-sm">
          <div className="text-6xl mb-6">♟️</div>
          <h2 className="font-display text-4xl font-black mb-4">Your Chess Journey Starts Here</h2>
          <p className="text-black/70 mb-8">Join thousands of students who have improved their game with expert coaching.</p>
          <div className="space-y-3">
            {[
              '24/7 access to recorded lessons',
              'Live weekly group classes',
              'Personal progress dashboard',
              'Online chess board to practice',
              'Community of 2,400+ players',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#F5FF00]" />
                </div>
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
