import { useState } from 'react';
import { ArrowLeft, Check, Layers, Palette } from 'lucide-react';

const patterns = [
  { id: 'claw', name: 'Garra Clássica' },
  { id: 'camo', name: 'Camuflado Urbano' },
  { id: 'cyber', name: 'Cyberpunk Grid' },
  { id: 'clean', name: 'Minimalista' }
];

export default function Customizer({ flavor, onBack }) {
  const [selectedPattern, setSelectedPattern] = useState('claw');
  const [canColor, setCanColor] = useState(flavor.color);
  const [activeTab, setActiveTab] = useState('color');

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <button onClick={onBack} className="p-2 text-zinc-400 hover:text-white flex items-center gap-1 text-sm font-medium cursor-pointer">
          <ArrowLeft size={18} /> Hub
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold">{flavor.name}</h2>
          <span className="text-[10px] text-green-400 uppercase tracking-widest font-mono">Personalizador</span>
        </div>
        <button className="bg-green-500 text-black text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer">Guardar</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="relative w-40 h-72 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-zinc-700 overflow-hidden transition-all duration-500"
             style={{ backgroundColor: canColor }}>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/40 pointer-events-none"></div>

          <div className="text-center z-10 px-2">
            <span className="text-4xl font-black italic tracking-tighter drop-shadow-md">M</span>
            <div className="text-[9px] uppercase font-bold tracking-widest mt-1 opacity-90">{selectedPattern}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-400 mt-3">{flavor.description}</div>
      </div>

      <div className="bg-zinc-900 border-t border-zinc-800 p-4 space-y-4">
        <div className="flex bg-zinc-950 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('color')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === 'color' ? 'bg-zinc-800 text-green-400' : 'text-zinc-400'}`}
          >
            <Palette size={14} /> Cor Base
          </button>
          <button 
            onClick={() => setActiveTab('pattern')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === 'pattern' ? 'bg-zinc-800 text-green-400' : 'text-zinc-400'}`}
          >
            <Layers size={14} /> Padrões
          </button>
        </div>

        {activeTab === 'color' ? (
          <div className="flex justify-around py-2">
            {['#00FF00', '#FF7700', '#FF2288', '#9333ea', '#3b82f6'].map((col) => (
              <button
                key={col}
                onClick={() => setCanColor(col)}
                className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer ${canColor === col ? 'scale-125 border-white' : 'border-transparent'}`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {patterns.map((pat) => (
              <button
                key={pat.id}
                onClick={() => setSelectedPattern(pat.id)}
                className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${selectedPattern === pat.id ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-zinc-800/40 border-zinc-800 text-zinc-300'}`}
              >
                {pat.name}
                {selectedPattern === pat.id && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}