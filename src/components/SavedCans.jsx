import { ArrowLeft, Trash2, Sparkles, Plus, Edit3 } from 'lucide-react';

export default function SavedCans({ cans, onBack, onEditCan, onNewCustomizer }) {
  
  const handleDelete = (index, e) => {
    e.stopPropagation();
    const updated = cans.filter((_, i) => i !== index);
    localStorage.setItem('monster_saved_cans', JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full justify-between bg-zinc-950 text-white select-none">
      
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md">
        <button onClick={onBack} className="p-2 text-zinc-400 hover:text-white flex items-center gap-1 text-sm font-medium cursor-pointer">
          <ArrowLeft size={18} /> Hub
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide">Minhas Latas</h2>
          <span className="text-[10px] text-green-400 uppercase tracking-widest font-mono">Galeria Pessoal</span>
        </div>
        <button 
          onClick={onNewCustomizer}
          className="bg-green-500 hover:bg-green-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Nova
        </button>
      </div>

      {/* Lista de Latas Guardadas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cans.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-zinc-500">
            <Sparkles size={36} className="text-zinc-700" />
            <p className="text-sm">Ainda não tens nenhuma lata guardada.<br/>Cria uma no customizador!</p>
          </div>
        ) : (
          cans.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onEditCan(item, idx)}
              className="p-4 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-green-500/50 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden transition-all cursor-pointer group"
            >
              {/* Barra lateral com a cor da lata */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-2.5" 
                style={{ backgroundColor: item.canColor }}
              />

              <div className="pl-3 space-y-1">
                <div className="text-xs font-mono text-green-400 uppercase tracking-wider">{item.flavorName}</div>
                <div className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                  {item.customName}
                  <Edit3 size={14} className="opacity-0 group-hover:opacity-100 text-green-400 transition-opacity" />
                </div>
                <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                  <span>Padrão: <strong className="text-zinc-200">{item.selectedPattern}</strong></span>
                </div>
              </div>

              <div>
                <button 
                  onClick={(e) => handleDelete(idx, e)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Apagar lata"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 text-center text-[10px] text-zinc-600 border-t border-zinc-900">
        Clica numa lata para editá-la diretamente.
      </div>
    </div>
  );
}