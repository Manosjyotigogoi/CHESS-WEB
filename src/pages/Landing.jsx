import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, ChevronRight, Star, Users, BookOpen, Trophy, Video, BarChart2, Swords, Mail, Phone, MapPin, Check, ArrowRight } from 'lucide-react';

const CHESS_PIECES = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

function FloatingPiece({ piece, style }) {
  return (
    <div className="absolute text-4xl opacity-10 animate-float pointer-events-none select-none" style={style}>
      {piece}
    </div>
  );
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FeatureCard({ icon: Icon, title, desc, color, delay }) {
  return (
    <div className={`bg-white border-2 border-black rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
      style={{ animationDelay: `${delay}s` }}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        style={{ backgroundColor: color }}>
        <Icon className="w-7 h-7 text-black" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, level, text, rating }) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 min-w-[300px] hover:shadow-xl transition-all">
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F5FF00] text-[#F5FF00]" />)}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FFB3C6] rounded-full flex items-center justify-center font-bold text-black">
          {name[0]}
        </div>
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-gray-500">{level}</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const floaters = [
    { piece: '♔', style: { top: '10%', left: '5%', animationDelay: '0s', fontSize: '3rem' } },
    { piece: '♛', style: { top: '20%', right: '8%', animationDelay: '1s', fontSize: '2.5rem' } },
    { piece: '♞', style: { top: '60%', left: '3%', animationDelay: '2s', fontSize: '2rem' } },
    { piece: '♜', style: { top: '40%', right: '4%', animationDelay: '0.5s', fontSize: '2.5rem' } },
    { piece: '♝', style: { bottom: '20%', left: '8%', animationDelay: '1.5s', fontSize: '2rem' } },
    { piece: '♟', style: { bottom: '10%', right: '10%', animationDelay: '2.5s', fontSize: '2rem' } },
  ];

  return (
    <div className="font-body">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden chess-pattern pt-16">
        {floaters.map((f, i) => <FloatingPiece key={i} {...f} />)}

        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-[#FFB3C6] px-4 py-2 rounded-full mb-6 border border-[#ff85a1]">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-semibold">#1 Chess Coaching Academy</span>
            </div>
            <h1 className="font-display text-6xl lg:text-7xl font-black text-black leading-[1.05] mb-6">
              Master<br />
              <span className="relative inline-block">
                <span className="relative z-10">The Game</span>
                <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#F5FF00] -z-0 -rotate-1"></span>
              </span>
              <br />of Kings.
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              From beginner to grandmaster — CCAW offers live coaching, recorded lessons,
              progress tracking, and real-time practice to elevate your chess game.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/register"
                className="px-8 py-4 bg-black text-[#F5FF00] font-bold text-lg rounded-2xl hover:bg-[#FFB3C6] hover:text-black transition-all duration-200 flex items-center gap-2 group">
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/courses"
                className="px-8 py-4 border-2 border-black font-bold text-lg rounded-2xl hover:bg-[#B8E4FF] transition-all duration-200">
                Browse Courses
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {['A','B','C','D'].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: ['#FFB3C6','#F5FF00','#B8E4FF','#87CEEB'][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-bold text-sm">2,400+ Students</div>
                <div className="text-xs text-gray-500">already enrolled</div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F5FF00] text-[#F5FF00]" />)}
                <span className="text-sm font-bold ml-1">4.9</span>
              </div>
            </div>
          </div>

          {/* Right - Animated Chess Board Preview */}
          <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} flex justify-center`}>
            <div className="relative">
              {/* Board */}
              <div className="w-72 h-72 lg:w-96 lg:h-96 border-4 border-black rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-8 h-full">
                  {[...Array(64)].map((_, i) => {
                    const row = Math.floor(i / 8), col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    const pieces = { 0: '♜', 7: '♜', 56: '♖', 63: '♖', 4: '♚', 60: '♔', 3: '♛', 59: '♕' };
                    return (
                      <div key={i} className={`flex items-center justify-center text-sm lg:text-xl ${isLight ? 'bg-[#FFB3C6]' : 'bg-white'}`}>
                        {pieces[i] && <span className="hover:scale-125 transition-transform cursor-pointer">{pieces[i]}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 bg-[#F5FF00] border-2 border-black rounded-xl px-3 py-2 animate-float shadow-lg">
                <div className="text-xs font-bold">🏆 Grandmaster Level</div>
              </div>
              <div className="absolute -bottom-4 -left-6 bg-[#B8E4FF] border-2 border-black rounded-xl px-3 py-2 animate-float-d shadow-lg">
                <div className="text-xs font-bold">⚡ Live Classes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 font-mono">SCROLL</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-black text-[#F5FF00] py-3 overflow-hidden border-y-4 border-[#F5FF00]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex gap-8 mr-8">
              {['♔ Live Classes','♕ Expert Coaches','♖ Track Progress','♗ Practice Online','♘ Recorded Sessions','♙ All Skill Levels'].map((t, i) => (
                <span key={i} className="text-sm font-mono font-bold px-4">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 2400, suf: '+', label: 'Students Enrolled', color: '#FFB3C6' },
              { num: 150, suf: '+', label: 'Video Lessons', color: '#F5FF00' },
              { num: 50, suf: '+', label: 'Expert Coaches', color: '#B8E4FF' },
              { num: 98, suf: '%', label: 'Satisfaction Rate', color: '#FFB3C6' },
            ].map((s, i) => (
              <div key={i} className="text-center p-8 rounded-3xl border-2 border-black hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: s.color }}>
                <div className="font-display text-5xl font-black mb-2">
                  <CountUp target={s.num} suffix={s.suf} />
                </div>
                <div className="text-sm font-semibold text-gray-700">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-gray-50 chess-pattern-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-[#FFB3C6] px-4 py-1 rounded-full text-sm font-semibold">Why Choose CCAW</span>
            <h2 className="font-display text-5xl font-black mt-4 mb-4">
              Everything You Need<br />to <span className="underline decoration-[#F5FF00] decoration-4">Excel at Chess</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">A complete learning ecosystem built for aspiring chess champions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Video, title: 'Live Classes', desc: 'Join real-time sessions with grandmaster coaches. Ask questions, get instant feedback.', color: '#FFB3C6', delay: 0 },
              { icon: BookOpen, title: 'Recorded Library', desc: 'Access 150+ recorded lessons anytime. Learn at your own pace, rewatch anytime.', color: '#F5FF00', delay: 0.1 },
              { icon: Swords, title: 'Play & Practice', desc: 'Challenge AI or classmates online. Apply what you learn in real matches.', color: '#B8E4FF', delay: 0.2 },
              { icon: BarChart2, title: 'Progress Tracking', desc: 'Visual dashboards tracking your ELO, tactics score, and course completion.', color: '#FFB3C6', delay: 0.3 },
              { icon: Trophy, title: 'Tournaments', desc: 'Compete in monthly academy tournaments and earn certificates & badges.', color: '#F5FF00', delay: 0.4 },
              { icon: Users, title: 'Community', desc: 'Join a vibrant community of learners, share games, discuss strategies.', color: '#B8E4FF', delay: 0.5 },
            ].map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl font-black">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Register', desc: 'Create your free account in 60 seconds', icon: '📝', color: '#FFB3C6' },
              { step: '02', title: 'Pick a Course', desc: 'Choose from beginner to advanced tracks', icon: '🎯', color: '#F5FF00' },
              { step: '03', title: 'Learn & Practice', desc: 'Watch, play, and train daily', icon: '♟️', color: '#B8E4FF' },
              { step: '04', title: 'Track & Win', desc: 'See your ELO rise and earn trophies', icon: '🏆', color: '#FFB3C6' },
            ].map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl border-2 border-black mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: s.color }}>
                  {s.icon}
                </div>
                <div className="font-mono text-xs text-gray-400 mb-1">{s.step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-10 -right-3 w-6 h-6 text-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES PREVIEW ── */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-[#F5FF00] text-sm font-mono font-bold tracking-widest uppercase">Courses</span>
              <h2 className="font-display text-5xl font-black mt-2">Popular Tracks</h2>
            </div>
            <Link to="/courses" className="mt-4 md:mt-0 px-6 py-3 bg-[#F5FF00] text-black font-bold rounded-xl hover:bg-[#FFB3C6] transition-colors flex items-center gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Chess Fundamentals', level: 'Beginner', lessons: 24, color: '#FFB3C6', piece: '♙', desc: 'Master the basics: piece movement, basic tactics, and opening principles.' },
              { title: 'Tactical Mastery', level: 'Intermediate', lessons: 36, color: '#F5FF00', piece: '♘', desc: 'Pins, forks, skewers, discovered attacks — sharpen your tactical eye.' },
              { title: 'Strategic Thinking', level: 'Advanced', lessons: 42, color: '#B8E4FF', piece: '♕', desc: 'Pawn structures, long-term planning, endgame technique for serious players.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white transition-all hover:-translate-y-1 group">
                <div className="h-40 flex items-center justify-center text-7xl"
                  style={{ backgroundColor: c.color }}>
                  <span className="group-hover:scale-125 transition-transform inline-block">{c.piece}</span>
                </div>
                <div className="p-6 bg-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono px-2 py-1 rounded-full border border-white/30">{c.level}</span>
                    <span className="text-xs text-gray-400">{c.lessons} lessons</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{c.desc}</p>
                  <Link to="/courses"
                    className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: c.color }}>
                    Enroll Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#B8E4FF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-5xl font-black text-center mb-12">What Our Students Say</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {[
              { name: 'Arjun Sharma', level: 'Advanced Student', text: "CCAW transformed my game. I went from 800 to 1400 ELO in just 6 months!", rating: 5 },
              { name: 'Priya Mehta', level: 'Intermediate', text: "The live classes are incredible. My coach noticed my weaknesses immediately and fixed them.", rating: 5 },
              { name: 'Rahul Gupta', level: 'Beginner', text: "Perfect for beginners! Clear explanations and the progress tracking keeps me motivated.", rating: 5 },
              { name: 'Sneha Joshi', level: 'Tournament Player', text: "The tactical puzzles and task assignments are exactly what I needed. Highly recommend!", rating: 5 },
            ].map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── PRICING CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="bg-[#F5FF00] px-4 py-1 rounded-full text-sm font-bold border border-black">Limited Time Offer</span>
          <h2 className="font-display text-5xl font-black mt-6 mb-4">
            Start Learning Chess<br />For <span className="bg-[#FFB3C6] px-3 rounded-lg">Free Today</span>
          </h2>
          <p className="text-gray-600 mb-8">No credit card required. Access beginner content instantly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            {['Live group sessions', 'Recorded lessons library', 'Progress dashboard', 'Online practice board', 'Community access'].map((f, i) => (
              <span key={i} className="hidden"></span>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-sm text-left">
            {['Live group sessions', 'Recorded lessons library', 'Progress dashboard', 'Online practice board', 'Community access', 'Certificate on completion'].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <Link to="/register"
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-[#F5FF00] font-bold text-xl rounded-2xl hover:bg-[#FFB3C6] hover:text-black transition-all duration-200 glow-pink">
            Join CCAW Free <Crown className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-4xl font-black mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have questions about our courses or coaching programs? We'd love to hear from you.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'hello@ccaw.academy' },
                  { icon: Phone, label: '+91 98765 43210' },
                  { icon: MapPin, label: 'Ludhiana, Punjab, India' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFB3C6] rounded-lg flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-gray-300">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#FFB3C6]" />
              <input type="email" placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#FFB3C6]" />
              <textarea rows={4} placeholder="Your Message"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#FFB3C6] resize-none" />
              <button type="submit"
                className="w-full py-4 bg-[#FFB3C6] text-black font-bold rounded-xl hover:bg-[#F5FF00] transition-colors">
                Send Message ♟
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#F5FF00]" />
            <span className="text-white font-display font-bold">CCAW</span>
          </div>
          <p className="text-sm">© 2025 Chess Coaching Academy Website. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/courses" className="hover:text-[#FFB3C6] transition-colors">Courses</Link>
            <Link to="/live" className="hover:text-[#FFB3C6] transition-colors">Live Classes</Link>
            <Link to="/play" className="hover:text-[#FFB3C6] transition-colors">Play</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
