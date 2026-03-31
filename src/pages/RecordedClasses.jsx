import { useState } from 'react';
import { Play, Clock, BookOpen, Search, ChevronRight, Lock, CheckCircle, PlayCircle, Volume2, Maximize, SkipForward, SkipBack, Pause } from 'lucide-react';

const MODULES = [
  { id: 1, title: 'Chess Fundamentals', lessons: [
    { id:1, title:'Introduction & Board Setup', duration:'12:30', watched:true, free:true },
    { id:2, title:'How Each Piece Moves', duration:'18:45', watched:true, free:true },
    { id:3, title:'Special Moves: Castling & En Passant', duration:'15:20', watched:true, free:false },
    { id:4, title:'Basic Checkmate Patterns', duration:'22:10', watched:false, free:false },
    { id:5, title:'Introduction to Openings', duration:'20:00', watched:false, free:false },
  ]},
  { id: 2, title: 'Tactical Patterns', lessons: [
    { id:6, title:'Pins and Skewers', duration:'19:30', watched:false, free:false },
    { id:7, title:'Forks & Double Attacks', duration:'21:15', watched:false, free:false },
    { id:8, title:'Discovered Attacks', duration:'17:40', watched:false, free:false },
    { id:9, title:'Back Rank Weaknesses', duration:'16:55', watched:false, free:false },
  ]},
  { id: 3, title: 'Endgame Essentials', lessons: [
    { id:10, title:'King and Pawn Endings', duration:'25:00', watched:false, free:false },
    { id:11, title:'Rook Endings', duration:'28:30', watched:false, free:false },
  ]},
];

const ALL_LESSONS = MODULES.flatMap(m => m.lessons);

export default function RecordedClasses() {
  const [playing, setPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [search, setSearch] = useState('');

  const currentLesson = ALL_LESSONS.find(l => l.id === playing);

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="bg-[#B8E4FF] border-b-2 border-black py-10">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-sm font-bold">VIDEO LIBRARY</span>
          <h1 className="font-display text-4xl font-black mt-1">Recorded Lessons</h1>
          <p className="text-gray-600 mt-2">Learn at your own pace — rewatch anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            {playing && currentLesson ? (
              <div>
                {/* Player */}
                <div className="bg-black rounded-2xl overflow-hidden mb-4 aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 animate-float">♟</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group">
                      {isPlaying
                        ? <Pause className="w-8 h-8 text-white" />
                        : <Play className="w-8 h-8 text-white ml-1" />}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
                    <div className="flex items-center gap-3 mb-2">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="text-white">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button className="text-white"><SkipBack className="w-5 h-5" /></button>
                      <button className="text-white"><SkipForward className="w-5 h-5" /></button>
                      <div className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer" onClick={e => {
                        const rect = e.target.getBoundingClientRect();
                        setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                      }}>
                        <div className="h-full bg-[#FFB3C6] rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                      <span className="text-white text-xs font-mono">
                        {Math.floor(progress * 0.1245)}:{String(Math.floor((progress * 0.1245 % 1) * 60)).padStart(2,'0')} / {currentLesson.duration}
                      </span>
                      <Volume2 className="w-5 h-5 text-white cursor-pointer" />
                      <Maximize className="w-5 h-5 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
                <h2 className="font-display text-2xl font-bold mb-1">{currentLesson.title}</h2>
                <p className="text-gray-500 text-sm mb-4">Duration: {currentLesson.duration}</p>
                <div className="flex gap-3 flex-wrap">
                  <button className="px-4 py-2 bg-[#FFB3C6] border-2 border-black rounded-xl text-sm font-semibold">Take Notes</button>
                  <button className="px-4 py-2 border-2 border-black rounded-xl text-sm font-semibold">Download Slides</button>
                  <button className="px-4 py-2 border-2 border-black rounded-xl text-sm font-semibold">Practice Puzzle</button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-black rounded-2xl flex items-center justify-center border-2 border-black">
                <div className="text-center text-white">
                  <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-40" />
                  <p className="text-lg font-display opacity-60">Select a lesson to watch</p>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search lessons..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none" />
            </div>
          </div>

          {/* Lesson List */}
          <div className="overflow-y-auto max-h-[calc(100vh-12rem)] space-y-4">
            {MODULES.map(mod => (
              <div key={mod.id} className="border-2 border-black rounded-2xl overflow-hidden">
                <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
                  <span className="font-bold text-sm">{mod.title}</span>
                  <span className="text-xs text-gray-400">{mod.lessons.length} lessons</span>
                </div>
                <div>
                  {mod.lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase())).map((lesson, i) => (
                    <button key={lesson.id} onClick={() => { if (lesson.free || lesson.watched) { setPlaying(lesson.id); setIsPlaying(true); setProgress(lesson.watched ? 100 : 0); } }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 last:border-0 transition-all ${
                        playing === lesson.id ? 'bg-[#FFB3C6]' : 'hover:bg-gray-50'
                      } ${!lesson.free && !lesson.watched ? 'opacity-60' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-black ${lesson.watched ? 'bg-green-400' : lesson.free ? 'bg-[#F5FF00]' : 'bg-gray-100'}`}>
                        {lesson.watched ? <CheckCircle className="w-4 h-4" /> :
                          !lesson.free ? <Lock className="w-3 h-3" /> :
                          <Play className="w-3 h-3 ml-0.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-400">{lesson.duration}</p>
                      </div>
                      {playing === lesson.id && isPlaying && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
