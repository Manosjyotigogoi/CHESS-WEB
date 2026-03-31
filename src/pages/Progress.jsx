import { useState } from 'react';
import { Trophy, TrendingUp, Target, Clock, Star, CheckCircle, BookOpen, Flame, Award, ChevronRight, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WEEKLY_DATA = [
  { day: 'Mon', elo: 820, puzzles: 5, time: 45 },
  { day: 'Tue', elo: 835, puzzles: 8, time: 60 },
  { day: 'Wed', elo: 828, puzzles: 3, time: 30 },
  { day: 'Thu', elo: 850, puzzles: 10, time: 75 },
  { day: 'Fri', elo: 862, puzzles: 7, time: 55 },
  { day: 'Sat', elo: 878, puzzles: 12, time: 90 },
  { day: 'Sun', elo: 892, puzzles: 9, time: 70 },
];

const TASKS = [
  { id:1, title:'Complete 10 tactical puzzles', course:'Tactical Mastery', due:'Today', done:true, xp:50 },
  { id:2, title:'Watch: Sicilian Defense lecture', course:'Opening Repertoire', due:'Today', done:true, xp:30 },
  { id:3, title:'Play 3 practice games', course:'Chess Fundamentals', due:'Tomorrow', done:false, xp:60 },
  { id:4, title:'Study King & Pawn endings', course:'Endgame Excellence', due:'Wed', done:false, xp:40 },
  { id:5, title:'Attend live class', course:'Tactical Mastery', due:'Thu', done:false, xp:80 },
  { id:6, title:'Solve the weekly puzzle set', course:'Strategic Chess', due:'Fri', done:false, xp:100 },
];

const ACHIEVEMENTS = [
  { icon:'🏆', title:'First Win', desc:'Won your first game', earned:true, color:'#F5FF00' },
  { icon:'⚡', title:'Speed Demon', desc:'Solved 10 puzzles in 5 min', earned:true, color:'#FFB3C6' },
  { icon:'📚', title:'Book Worm', desc:'Watched 10 lessons', earned:true, color:'#B8E4FF' },
  { icon:'🔥', title:'On Fire', desc:'7-day learning streak', earned:true, color:'#FFB3C6' },
  { icon:'♛', title:'Queen\'s Gambit', desc:'Win with the QGD', earned:false, color:'#F5FF00' },
  { icon:'🎯', title:'Sharpshooter', desc:'100 puzzles solved', earned:false, color:'#B8E4FF' },
];

const COURSES_PROGRESS = [
  { title:'Chess Fundamentals', progress:75, color:'#FFB3C6', lessons:18, total:24 },
  { title:'Tactical Mastery', progress:40, color:'#F5FF00', lessons:14, total:36 },
  { title:'Endgame Excellence', progress:20, color:'#B8E4FF', lessons:6, total:28 },
];

function SimpleBarChart({ data }) {
  const max = Math.max(...data.map(d => d.elo));
  const min = Math.min(...data.map(d => d.elo));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
            style={{ height: `${((d.elo - min) / (max - min)) * 80 + 20}%`, backgroundColor: i === data.length-1 ? '#FFB3C6' : '#F5FF00', border: '2px solid black' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {d.elo} ELO
            </div>
          </div>
          <span className="text-xs text-gray-500 font-mono">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function Progress() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(TASKS);
  const [activeTab, setActiveTab] = useState('overview');

  const completedTasks = tasks.filter(t => t.done).length;
  const totalXP = tasks.filter(t => t.done).reduce((sum, t) => sum + t.xp, 0);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header / Profile Banner */}
      <div className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-[#FFB3C6] rounded-2xl flex items-center justify-center text-3xl font-display font-black text-black border-2 border-white">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display text-3xl font-black">{user?.name || 'Student'}</h1>
                  <span className="bg-[#F5FF00] text-black text-xs font-bold px-2 py-0.5 rounded-full">Intermediate</span>
                </div>
                <p className="text-gray-400 text-sm">Member since Jan 2025 · Ludhiana, Punjab</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-sm"><Flame className="w-4 h-4 text-orange-400" /><strong className="text-orange-400">7</strong> day streak</span>
                  <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-[#F5FF00]" /><strong>{totalXP}</strong> XP earned</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'ELO Rating', val: '892', icon: TrendingUp, color: '#FFB3C6' },
                { label: 'Puzzles Solved', val: '54', icon: Target, color: '#F5FF00' },
                { label: 'Hours Studied', val: '42', icon: Clock, color: '#B8E4FF' },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-1" style={{ color: s.color }} />
                  <div className="font-display text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-black bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {['overview', 'tasks', 'achievements', 'courses'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold text-sm capitalize whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ELO Chart */}
            <div className="lg:col-span-2 border-2 border-black rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">ELO Progress</h2>
                <span className="text-green-500 font-bold text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />+72 this week
                </span>
              </div>
              <SimpleBarChart data={WEEKLY_DATA} />
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { label: 'Current ELO', val: '892', color: '#FFB3C6' },
                  { label: 'Best ELO', val: '892', color: '#F5FF00' },
                  { label: 'Games Played', val: '34', color: '#B8E4FF' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border-2 border-black" style={{ backgroundColor: s.color }}>
                    <div className="font-display text-2xl font-black">{s.val}</div>
                    <div className="text-xs font-medium text-gray-700">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              {/* Daily Goal */}
              <div className="border-2 border-black rounded-2xl p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Target className="w-5 h-5" />Daily Goal</h3>
                <div className="space-y-3">
                  {[
                    { label: '5 Puzzles', done: 5, total: 5, color: '#FFB3C6' },
                    { label: '1 Lesson', done: 1, total: 1, color: '#F5FF00' },
                    { label: '20 min play', done: 20, total: 20, color: '#B8E4FF' },
                  ].map((g, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{g.label}</span>
                        <span className="font-bold text-green-500">✓ Done</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-full rounded-full border border-black" style={{ width: '100%', backgroundColor: g.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-[#F5FF00] rounded-xl text-center border-2 border-black">
                  <div className="font-bold text-sm">🎯 Daily Goal Complete!</div>
                  <div className="text-xs text-gray-600">+50 XP earned today</div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="border-2 border-black rounded-2xl p-5">
                <h3 className="font-bold mb-3 flex items-center justify-between">
                  <span>Upcoming Tasks</span>
                  <button onClick={() => setActiveTab('tasks')} className="text-xs text-gray-400 hover:text-black flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </h3>
                {tasks.filter(t => !t.done).slice(0, 3).map(t => (
                  <div key={t.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-[#FFB3C6] flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.due}</p>
                    </div>
                    <span className="text-xs font-bold text-[#ff85a1]">+{t.xp}xp</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Progress */}
            <div className="lg:col-span-2 border-2 border-black rounded-2xl p-6">
              <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-2"><BookOpen className="w-6 h-6" />Course Progress</h2>
              <div className="space-y-5">
                {COURSES_PROGRESS.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{c.title}</span>
                      <span className="text-sm text-gray-500">{c.lessons}/{c.total} lessons</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div className="h-full rounded-full transition-all duration-700 border-r-2 border-black"
                        style={{ width: `${c.progress}%`, backgroundColor: c.color }}>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{c.progress}% complete</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="border-2 border-black rounded-2xl p-5">
              <h2 className="font-display text-xl font-bold mb-4">Recent Badges</h2>
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.filter(a => a.earned).map((a, i) => (
                  <div key={i} className="text-center p-3 rounded-xl border-2 border-black" style={{ backgroundColor: a.color }}>
                    <div className="text-2xl mb-1">{a.icon}</div>
                    <div className="text-xs font-bold">{a.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Tasks & Assignments</h2>
              <span className="bg-[#F5FF00] border-2 border-black px-3 py-1 rounded-full font-bold text-sm">
                {completedTasks}/{tasks.length} done
              </span>
            </div>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    task.done ? 'border-green-300 bg-green-50' : 'border-black bg-white hover:bg-gray-50'
                  }`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    task.done ? 'bg-green-500 border-green-500' : 'border-black'
                  }`}>
                    {task.done && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${task.done ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                    <p className="text-sm text-gray-400">{task.course} · Due: {task.due}</p>
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 ${task.done ? 'text-green-500' : 'text-[#ff85a1]'}`}>
                    +{task.xp} XP
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-black text-white rounded-2xl flex items-center justify-between">
              <span className="font-bold">Total XP Earned</span>
              <span className="font-display text-2xl font-black text-[#F5FF00]">{totalXP} XP</span>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Badges & Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} className={`border-2 border-black rounded-2xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${
                  a.earned ? '' : 'opacity-40 grayscale'
                }`} style={{ backgroundColor: a.earned ? a.color : '#f5f5f5' }}>
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="font-bold mb-1">{a.title}</h3>
                  <p className="text-xs text-gray-600">{a.desc}</p>
                  {!a.earned && <p className="text-xs mt-2 font-mono text-gray-400">Locked</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold mb-6">My Courses</h2>
            {COURSES_PROGRESS.map((c, i) => (
              <div key={i} className="border-2 border-black rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-2 border-black flex-shrink-0"
                  style={{ backgroundColor: c.color }}>
                  {['♙','♘','♗'][i]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold">{c.title}</h3>
                    <span className="text-sm font-bold">{c.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 mb-2">
                    <div className="h-full rounded-full" style={{ width: `${c.progress}%`, backgroundColor: c.color, borderRight: '2px solid black' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">{c.lessons} of {c.total} lessons completed</p>
                </div>
                <button className="px-5 py-2 bg-black text-[#F5FF00] rounded-xl font-semibold text-sm hover:bg-gray-800 flex items-center gap-1">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
