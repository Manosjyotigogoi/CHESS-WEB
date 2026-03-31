import { useState, useCallback } from 'react';
import { RotateCcw, Flag, Clock, Trophy, Zap, Target, Users, Bot, ChevronRight, Crown } from 'lucide-react';

// Chess board state representation
const INITIAL_BOARD = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
];

const BLACK_PIECES = ['♜','♞','♝','♛','♚','♟'];
const WHITE_PIECES = ['♖','♘','♗','♕','♔','♙'];

const FILES = ['a','b','c','d','e','f','g','h'];
const RANKS = ['8','7','6','5','4','3','2','1'];

const DAILY_PUZZLES = [
  { id:1, title:'Mate in 2', difficulty:'Easy', piece:'♕', color:'#F5FF00', desc:'White to move. Find the forced checkmate in 2 moves.', hint:'The queen and rook work together.' },
  { id:2, title:'Fork the King', difficulty:'Medium', piece:'♘', color:'#FFB3C6', desc:'Use the knight to attack two pieces simultaneously.', hint:'Knights are great forking pieces.' },
  { id:3, title:'Pin & Win', difficulty:'Hard', piece:'♗', color:'#B8E4FF', desc:'Pin the enemy queen to the king and win material.', hint:'Look for the diagonal.' },
];

const MOVE_HISTORY = [
  { white: 'e4', black: 'e5' },
  { white: 'Nf3', black: 'Nc6' },
  { white: 'Bb5', black: 'a6' },
  { white: 'Ba4', black: 'Nf6' },
];

export default function ChessPlay() {
  const [board, setBoard] = useState(INITIAL_BOARD.map(row => [...row]));
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('menu'); // menu | vs-ai | vs-human | puzzle
  const [turn, setTurn] = useState('white');
  const [moves, setMoves] = useState(MOVE_HISTORY);
  const [captures, setCaptures] = useState({ white: [], black: [] });
  const [gameOver, setGameOver] = useState(false);
  const [activeTab, setActiveTab] = useState('play');
  const [activePuzzle, setActivePuzzle] = useState(null);
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const isWhitePiece = (p) => WHITE_PIECES.includes(p);
  const isBlackPiece = (p) => BLACK_PIECES.includes(p);

  const handleSquareClick = (r, c) => {
    if (gameOver || mode === 'menu') return;
    const piece = board[r][c];

    if (selected) {
      const [sr, sc] = selected;
      const selPiece = board[sr][sc];

      // Try to move
      if (sr === r && sc === c) { setSelected(null); return; }

      // Don't capture own piece
      const isOwnPiece = (turn === 'white' && isWhitePiece(piece)) || (turn === 'black' && isBlackPiece(piece));
      if (isOwnPiece) { setSelected([r, c]); return; }

      // Make move
      const newBoard = board.map(row => [...row]);
      if (piece) {
        setCaptures(prev => ({
          ...prev,
          [turn]: [...prev[turn], piece]
        }));
      }
      newBoard[r][c] = selPiece;
      newBoard[sr][sc] = null;
      setBoard(newBoard);
      setSelected(null);
      setTurn(t => t === 'white' ? 'black' : 'white');
      setMoves(prev => {
        const last = prev[prev.length - 1];
        const notation = `${FILES[sc]}${RANKS[sr]}→${FILES[c]}${RANKS[r]}`;
        if (!last || last.black) return [...prev, { white: notation }];
        return [...prev.slice(0,-1), { ...last, black: notation }];
      });

      // Simple AI response for vs-ai mode
      if (mode === 'vs-ai' && turn === 'white') {
        setTimeout(() => {
          setTurn('black');
          // (AI move would go here in a real app)
          setTimeout(() => setTurn('white'), 800);
        }, 300);
      }
    } else {
      if (!piece) return;
      const canSelect = (turn === 'white' && isWhitePiece(piece)) || (turn === 'black' && isBlackPiece(piece));
      if (canSelect) setSelected([r, c]);
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setSelected(null);
    setTurn('white');
    setMoves(MOVE_HISTORY);
    setCaptures({ white: [], black: [] });
    setGameOver(false);
    setWhiteTime(300);
    setBlackTime(300);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-[#F5FF00] border-b-2 border-black py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-black">Play Chess</h1>
            <p className="text-gray-600 mt-1">Practice, solve puzzles, and apply your lessons.</p>
          </div>
          <div className="flex gap-3">
            {['play','puzzles','analysis'].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); if(tab !== 'play') setMode('menu'); }}
                className={`px-5 py-2 rounded-xl font-semibold text-sm capitalize transition-all ${
                  activeTab === tab ? 'bg-black text-[#F5FF00]' : 'border-2 border-black hover:bg-black/10'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* PLAY TAB */}
        {activeTab === 'play' && (
          <>
            {mode === 'menu' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { key:'vs-ai', icon:Bot, title:'vs Computer', desc:'Play against our AI at various difficulty levels', color:'#FFB3C6', badge:'Popular' },
                  { key:'vs-human', icon:Users, title:'vs Friend', desc:'Challenge a classmate or friend to a friendly match', color:'#B8E4FF', badge:'' },
                  { key:'puzzle', icon:Target, title:'Puzzle Mode', desc:'Solve assigned puzzles from your course instructor', color:'#F5FF00', badge:'Recommended' },
                ].map(m => (
                  <button key={m.key} onClick={() => { setMode(m.key); if(m.key !== 'puzzle') resetGame(); }}
                    className="border-2 border-black rounded-2xl p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                    {m.badge && <span className="absolute top-3 right-3 text-xs font-bold bg-black text-white px-2 py-0.5 rounded-full">{m.badge}</span>}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 border-2 border-black group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: m.color }}>
                      <m.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold">
                      Play Now <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            ) : mode === 'puzzle' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DAILY_PUZZLES.map(p => (
                  <div key={p.id} className="border-2 border-black rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="h-32 flex items-center justify-center text-7xl border-b-2 border-black"
                      style={{ backgroundColor: p.color }}>
                      {p.piece}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl font-bold">{p.title}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border border-black ${
                          p.difficulty === 'Easy' ? 'bg-green-100' : p.difficulty === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>{p.difficulty}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                      <p className="text-xs text-gray-400 italic mb-4">Hint: {p.hint}</p>
                      <button onClick={() => { setActivePuzzle(p); setMode('board-puzzle'); resetGame(); }}
                        className="w-full py-2 bg-black text-[#F5FF00] rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
                        Solve Puzzle
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400">
                  <Trophy className="w-10 h-10 mb-3" />
                  <p className="font-semibold">More puzzles unlock as you progress through courses!</p>
                </div>
              </div>
            ) : (
              /* ── GAME BOARD ── */
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex flex-col items-center">
                  {/* Opponent info */}
                  <div className="flex items-center justify-between w-full mb-2 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">
                        {mode === 'vs-ai' ? '🤖' : 'P2'}
                      </div>
                      <span className="font-semibold text-sm">{mode === 'vs-ai' ? 'Chess AI (800 ELO)' : 'Player 2'}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-mono border-2 border-black ${turn === 'black' ? 'bg-black text-[#F5FF00]' : 'bg-gray-100'}`}>
                      <Clock className="w-3 h-3" /> {formatTime(blackTime)}
                    </div>
                  </div>

                  {/* Captures by black */}
                  <div className="w-full mb-1 h-5 text-sm">{captures.black.join(' ')}</div>

                  {/* Board */}
                  <div className="border-4 border-black rounded-xl overflow-hidden shadow-2xl">
                    {board.map((row, r) => (
                      <div key={r} className="flex">
                        <div className="w-5 flex items-center justify-center text-xs font-mono text-gray-400 bg-gray-50 border-r border-gray-200">
                          {RANKS[r]}
                        </div>
                        {row.map((piece, c) => {
                          const isLight = (r + c) % 2 === 0;
                          const isSelected = selected?.[0] === r && selected?.[1] === c;
                          const isLastMoveFrom = false;
                          return (
                            <div key={c}
                              onClick={() => handleSquareClick(r, c)}
                              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl cursor-pointer transition-all relative
                                ${isLight ? 'bg-[#FFB3C6]' : 'bg-white'}
                                ${isSelected ? 'ring-4 ring-[#F5FF00] ring-inset z-10' : ''}
                                hover:brightness-90`}>
                              {piece && (
                                <span className={`select-none transition-transform ${isSelected ? 'scale-110' : 'hover:scale-110'}`}>
                                  {piece}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                    <div className="flex bg-gray-50 border-t border-gray-200">
                      <div className="w-5"></div>
                      {FILES.map(f => (
                        <div key={f} className="w-10 sm:w-12 flex items-center justify-center text-xs font-mono text-gray-400 h-5">{f}</div>
                      ))}
                    </div>
                  </div>

                  {/* Captures by white */}
                  <div className="w-full mt-1 h-5 text-sm">{captures.white.join(' ')}</div>

                  {/* My info */}
                  <div className="flex items-center justify-between w-full mt-2 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFB3C6] flex items-center justify-center text-black text-sm font-bold border-2 border-black">
                        You
                      </div>
                      <span className="font-semibold text-sm">You (White)</span>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-mono border-2 border-black ${turn === 'white' ? 'bg-[#F5FF00]' : 'bg-gray-100'}`}>
                      <Clock className="w-3 h-3" /> {formatTime(whiteTime)}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3 mt-4">
                    <button onClick={resetGame} className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl text-sm font-semibold hover:bg-gray-100">
                      <RotateCcw className="w-4 h-4" /> New Game
                    </button>
                    <button onClick={() => setMode('menu')} className="flex items-center gap-2 px-4 py-2 border-2 border-red-400 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50">
                      <Flag className="w-4 h-4" /> Resign
                    </button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="flex-1 space-y-4">
                  {/* Turn indicator */}
                  <div className={`border-2 border-black rounded-xl p-4 flex items-center gap-3 ${turn === 'white' ? 'bg-[#F5FF00]' : 'bg-black text-white'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 ${turn === 'white' ? 'bg-white border-black' : 'bg-black border-white'}`}></div>
                    <span className="font-bold">{turn === 'white' ? '⚡ Your turn (White)' : '⏳ Opponent\'s turn (Black)'}</span>
                  </div>

                  {/* Move history */}
                  <div className="border-2 border-black rounded-2xl overflow-hidden">
                    <div className="bg-black text-white px-4 py-2 text-sm font-bold">Move History</div>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="bg-gray-50 text-xs text-gray-400">
                          <th className="px-3 py-2 text-left">#</th>
                          <th className="px-3 py-2 text-left">White</th>
                          <th className="px-3 py-2 text-left">Black</th>
                        </tr></thead>
                        <tbody>
                          {moves.map((m, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-400 font-mono">{i+1}.</td>
                              <td className="px-3 py-2 font-mono font-semibold">{m.white}</td>
                              <td className="px-3 py-2 font-mono text-gray-500">{m.black || ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="border-2 border-black rounded-2xl p-4 bg-[#B8E4FF]">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-bold text-sm">Coach Tip</span>
                    </div>
                    <p className="text-sm text-gray-700">In the Ruy Lopez (current opening), focus on controlling the center and developing your pieces before attacking!</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* PUZZLES TAB */}
        {activeTab === 'puzzles' && (
          <div>
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl font-black mb-2">Daily Puzzles</h2>
              <p className="text-gray-500">Sharpen your tactical vision — solve puzzles every day!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DAILY_PUZZLES.map((p, i) => (
                <div key={p.id} className="border-2 border-black rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-40 flex items-center justify-center text-8xl border-b-2 border-black" style={{ backgroundColor: p.color }}>
                    {p.piece}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-lg">{p.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold border border-black ${i===0?'bg-green-100':i===1?'bg-yellow-100':'bg-red-100'}`}>{p.difficulty}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                    <button className="w-full py-2 bg-black text-[#F5FF00] rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">
                      Solve Now → +50 XP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYSIS TAB */}
        {activeTab === 'analysis' && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="text-6xl mb-4 animate-float inline-block">♛</div>
            <h2 className="font-display text-4xl font-black mb-4">Game Analysis</h2>
            <p className="text-gray-500 mb-8">Upload a PGN file or paste your game to get a full engine analysis with coach annotations.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 mb-6 hover:border-black transition-colors cursor-pointer">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold">Paste PGN or drag & drop</p>
              <p className="text-sm text-gray-400 mt-1">Supports .pgn files from Chess.com, Lichess, and more</p>
            </div>
            <textarea rows={4} placeholder="1. e4 e5 2. Nf3 Nc6 3. Bb5..."
              className="w-full px-4 py-3 border-2 border-black rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB3C6] mb-4" />
            <button className="px-8 py-3 bg-black text-[#F5FF00] font-bold rounded-xl hover:bg-gray-800 transition-colors">
              Analyse Game ♟
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
