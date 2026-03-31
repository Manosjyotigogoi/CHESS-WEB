import { useState } from 'react';
import { Video, Users, Clock, Calendar, Wifi, WifiOff, Mic, MicOff, Camera, CameraOff, MessageSquare, Hand, ChevronRight } from 'lucide-react';

const UPCOMING = [
  { id:1, title:'Sicilian Defense Deep Dive', coach:'GM Arjun Erigaisi', date:'Today', time:'6:00 PM', duration:'90 min', participants:24, level:'Intermediate', color:'#FFB3C6', live:true },
  { id:2, title:'Endgame Fundamentals', coach:'IM Tania Sachdev', date:'Today', time:'8:00 PM', duration:'60 min', participants:18, level:'Beginner', color:'#F5FF00', live:false },
  { id:3, title:'Attack & Defense Patterns', coach:'FM Rohit Kumar', date:'Tomorrow', time:'5:00 PM', duration:'90 min', participants:31, level:'Advanced', color:'#B8E4FF', live:false },
  { id:4, title:'Opening Theory Workshop', coach:'GM Harika Dronavalli', date:'Wed, Jan 22', time:'7:00 PM', duration:'120 min', participants:40, level:'Intermediate', color:'#FFB3C6', live:false },
];

const CHAT = [
  { user: 'Priya M', msg: 'Great explanation of the Sicilian!', time: '17:42' },
  { user: 'Rahul G', msg: 'Can you show the Dragon variation?', time: '17:43' },
  { user: 'Coach Arjun', msg: 'Sure! Moving to the Dragon now...', time: '17:43', isCoach: true },
  { user: 'Sneha J', msg: 'This is so helpful, thank you!', time: '17:44' },
  { user: 'Amit S', msg: 'What about the Najdorf?', time: '17:45' },
];

export default function LiveClasses() {
  const [activeClass, setActiveClass] = useState(UPCOMING[0]);
  const [inClass, setInClass] = useState(false);
  const [mic, setMic] = useState(false);
  const [cam, setCam] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatMsgs, setChatMsgs] = useState(CHAT);
  const [handRaised, setHandRaised] = useState(false);

  const sendMsg = (e) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setChatMsgs(prev => [...prev, { user: 'You', msg: chatMsg, time: new Date().toTimeString().slice(0,5) }]);
    setChatMsg('');
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-[#FFB3C6] border-b-2 border-black py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-sm font-bold">1 CLASS LIVE NOW</span>
          </div>
          <h1 className="font-display text-4xl font-black">Live Classes</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!inClass ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display text-2xl font-bold mb-4">Schedule</h2>
              {UPCOMING.map((cls) => (
                <div key={cls.id}
                  onClick={() => setActiveClass(cls)}
                  className={`border-2 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg ${activeClass?.id === cls.id ? 'border-black shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-black"
                        style={{ backgroundColor: cls.color }}>
                        <Video className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {cls.live && <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>LIVE</span>}
                          <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded-full">{cls.level}</span>
                        </div>
                        <h3 className="font-bold text-lg">{cls.title}</h3>
                        <p className="text-sm text-gray-500">{cls.coach}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-sm">{cls.date}</div>
                      <div className="text-gray-500 text-sm">{cls.time}</div>
                      <div className="text-gray-400 text-xs mt-1 flex items-center gap-1 justify-end">
                        <Users className="w-3 h-3" />{cls.participants}
                      </div>
                    </div>
                  </div>
                  {activeClass?.id === cls.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{cls.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" />{cls.participants} joined</span>
                      </div>
                      <button onClick={() => setInClass(true)}
                        className="px-6 py-2 bg-black text-[#F5FF00] rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#FFB3C6] hover:text-black transition-all">
                        {cls.live ? 'Join Now' : 'Set Reminder'} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info Panel */}
            <div className="space-y-4">
              <div className="bg-[#F5FF00] border-2 border-black rounded-2xl p-5">
                <h3 className="font-display text-xl font-bold mb-3">Today's Featured</h3>
                <div className="text-5xl mb-3">♚</div>
                <p className="font-semibold">{UPCOMING[0].title}</p>
                <p className="text-sm text-gray-600 mb-4">{UPCOMING[0].coach} • {UPCOMING[0].time}</p>
                <button onClick={() => { setActiveClass(UPCOMING[0]); setInClass(true); }}
                  className="w-full py-3 bg-black text-[#F5FF00] rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Join Live Class
                </button>
              </div>
              <div className="border-2 border-black rounded-2xl p-5">
                <h3 className="font-bold mb-3">This Week</h3>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                  <div key={d} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-medium w-8">{d}</span>
                    <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      {i < 4 && <div className="h-full rounded-full" style={{ width: `${[60,100,45,80,0,0,0][i]}%`, backgroundColor: '#FFB3C6' }}></div>}
                    </div>
                    <span className="text-xs text-gray-400">{[1,2,1,1,0,0,0][i]} class{[1,2,1,1][i] !== 1 ? 'es' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── IN-CLASS VIEW ── */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-8rem)]">
            {/* Video area */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div className="flex-1 bg-black rounded-2xl relative overflow-hidden min-h-64">
                {/* Simulated board */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-8 w-72 h-72">
                    {[...Array(64)].map((_, i) => {
                      const r = Math.floor(i/8), c = i%8;
                      return <div key={i} className={`${(r+c)%2===0?'bg-[#FFB3C6]':'bg-white'} flex items-center justify-center text-sm`}></div>;
                    })}
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-white bg-red-500 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>LIVE
                  </span>
                  <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-full">{activeClass.title}</span>
                </div>
                <div className="absolute top-4 right-4 text-white text-xs bg-black/50 px-3 py-1 rounded-full">
                  {activeClass.participants} watching
                </div>
                {/* Mini self-view */}
                <div className="absolute bottom-4 right-4 w-24 h-16 bg-gray-700 rounded-lg border-2 border-white flex items-center justify-center">
                  {cam ? <Camera className="w-6 h-6 text-white" /> : <CameraOff className="w-6 h-6 text-gray-400" />}
                </div>
              </div>
              {/* Controls */}
              <div className="bg-black rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setMic(!mic)}
                    className={`p-3 rounded-xl border-2 transition-all ${mic ? 'bg-[#FFB3C6] border-[#FFB3C6]' : 'border-white/30 text-gray-400 hover:border-white'}`}>
                    {mic ? <Mic className="w-5 h-5 text-black" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button onClick={() => setCam(!cam)}
                    className={`p-3 rounded-xl border-2 transition-all ${cam ? 'bg-[#B8E4FF] border-[#B8E4FF]' : 'border-white/30 text-gray-400 hover:border-white'}`}>
                    {cam ? <Camera className="w-5 h-5 text-black" /> : <CameraOff className="w-5 h-5" />}
                  </button>
                  <button onClick={() => setHandRaised(!handRaised)}
                    className={`p-3 rounded-xl border-2 transition-all ${handRaised ? 'bg-[#F5FF00] border-[#F5FF00]' : 'border-white/30 text-gray-400 hover:border-white'}`}>
                    <Hand className={`w-5 h-5 ${handRaised ? 'text-black' : ''}`} />
                  </button>
                </div>
                <span className="text-white/60 text-sm font-mono">01:23:45</span>
                <button onClick={() => setInClass(false)}
                  className="px-5 py-2 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors">
                  Leave
                </button>
              </div>
            </div>
            {/* Chat */}
            <div className="bg-white border-2 border-black rounded-2xl flex flex-col overflow-hidden">
              <div className="p-4 border-b-2 border-black flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-bold">Live Chat</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMsgs.map((m, i) => (
                  <div key={i}>
                    <span className={`text-xs font-bold ${m.isCoach ? 'text-[#ff85a1]' : m.user === 'You' ? 'text-blue-500' : 'text-gray-500'}`}>
                      {m.user} {m.isCoach && '(Coach)'}
                    </span>
                    <p className="text-sm mt-0.5 bg-gray-50 rounded-lg px-3 py-2">{m.msg}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMsg} className="p-3 border-t-2 border-black flex gap-2">
                <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-black focus:outline-none" />
                <button type="submit" className="px-3 py-2 bg-black text-[#F5FF00] rounded-xl text-sm font-bold hover:bg-gray-800">→</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
