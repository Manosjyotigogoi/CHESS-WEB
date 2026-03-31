import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Filter, Search, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const COURSES = [
  { id:1, title:'Chess Fundamentals', level:'Beginner', lessons:24, hours:12, students:890, rating:4.9, piece:'♙', color:'#FFB3C6', price:'Free', tags:['openings','basics','endgame'], enrolled:false, desc:'Master piece movements, basic tactics, checkmate patterns, and opening principles.' },
  { id:2, title:'Tactical Mastery', level:'Intermediate', lessons:36, hours:18, students:640, rating:4.8, piece:'♘', color:'#F5FF00', price:'₹999', tags:['tactics','combinations','patterns'], enrolled:false, desc:'Pins, forks, skewers, discovered attacks and advanced combination play.' },
  { id:3, title:'Endgame Excellence', level:'Intermediate', lessons:28, hours:14, students:520, rating:4.9, piece:'♗', color:'#B8E4FF', price:'₹1,299', tags:['endgame','technique','pawn'], enrolled:false, desc:'K+P endings, rook endings, bishop vs knight — master the crucial endgame.' },
  { id:4, title:'Opening Repertoire', level:'Intermediate', lessons:32, hours:16, students:710, rating:4.7, piece:'♖', color:'#FFB3C6', price:'₹1,199', tags:['openings','theory','preparation'], enrolled:false, desc:'Build a solid repertoire for both White and Black across major opening systems.' },
  { id:5, title:'Strategic Chess', level:'Advanced', lessons:42, hours:22, students:380, rating:5.0, piece:'♕', color:'#F5FF00', price:'₹1,999', tags:['strategy','planning','structures'], enrolled:false, desc:'Pawn structures, piece activity, long-term planning, prophylactic thinking.' },
  { id:6, title:'Grandmaster Masterclass', level:'Expert', lessons:50, hours:30, students:210, rating:5.0, piece:'♔', color:'#B8E4FF', price:'₹2,999', tags:['advanced','games analysis','preparation'], enrolled:true, desc:'Analysis of grandmaster games, tournament preparation, psychological edge.' },
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState([6]);
  const { isLoggedIn } = useAuth();

  const filtered = COURSES.filter(c =>
    (level === 'All' || c.level === level) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEnroll = (id) => {
    if (!isLoggedIn) { window.location.href = '/register'; return; }
    setEnrolledIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-black text-white py-16 chess-pattern-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#F5FF00] font-mono text-sm tracking-widest uppercase">Learning Tracks</span>
          <h1 className="font-display text-5xl font-black mt-3 mb-4">Choose Your Path</h1>
          <p className="text-gray-400 max-w-lg mx-auto">From absolute beginner to tournament champion — find the right course for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all ${level === l ? 'bg-black text-[#F5FF00]' : 'border-2 border-gray-200 hover:border-black'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => {
            const isEnrolled = enrolledIds.includes(course.id);
            return (
              <div key={course.id} className="border-2 border-black rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white group animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="h-44 flex items-center justify-center text-8xl relative"
                  style={{ backgroundColor: course.color }}>
                  <span className="group-hover:scale-110 transition-transform">{course.piece}</span>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-bold">{course.level}</div>
                  {isEnrolled && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black text-[#F5FF00] rounded-full text-xs font-bold">Enrolled ✓</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{course.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-mono">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.hours}h</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#F5FF00] text-[#F5FF00]" />{course.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-black">{course.price}</span>
                    {isEnrolled ? (
                      <Link to="/live" className="px-5 py-2 bg-[#B8E4FF] border-2 border-black rounded-xl font-semibold text-sm flex items-center gap-1">
                        Go to Class <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button onClick={() => handleEnroll(course.id)}
                        className="px-5 py-2 bg-black text-[#F5FF00] rounded-xl font-semibold text-sm hover:bg-[#FFB3C6] hover:text-black transition-all">
                        {isLoggedIn ? 'Enroll Now' : 'Sign Up & Enroll'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">♟</div>
            <p className="text-gray-400 font-display text-2xl">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
}
