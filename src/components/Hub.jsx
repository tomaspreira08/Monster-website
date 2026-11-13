import { motion } from 'framer-motion';
import { Sparkles, Sliders, Zap } from 'lucide-react';

export default function Hub({ onStartQuiz, onDirectCustomizer }) {
  const manualFlavors = [
    { name: 'Ultra Fiesta', color: '#FF7700', description: 'Manga e citrinos' },
    { name: 'Pipeline Punch', color: '#FF2288', description: 'Maracujá e laranja' },
    { name: 'The Doctor', color: '#FFFF00', description: 'Citrus refrescante' }
  ];

  return (
    <div className="flex flex-col h-full p-6 justify-between z-10">
      <div className="text-center mt-6">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="inline-block bg-green-500/10 border border-green-500/30 p-3 rounded-2xl mb-3 text-green-400"
        >
          <Zap size={32} />
        </motion.div>
        <h1 className="text-3xl font-black tracking-wider italic uppercase text-green-400">Monster Lab</h1>
        <p className="text-zinc-400 text-sm mt-1">Cria a tua edição limitada</p>
      </div>

      <div className="space-y-4 my-auto">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStartQuiz}
          className="w-full p-5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl font-bold flex items-center justify-between shadow-lg shadow-green-900/30 text-left cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-green-100 font-semibold mb-1">
              <Sparkles size={14} /> Recomendado
            </div>
            <div className="text-xl">Quiz de Sabor</div>
            <div className="text-xs text-green-100/80 font-normal">Descobre o sabor perfeito para a tua personalidade</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl">👉</div>
        </motion.button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase">ou escolhe direto</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        <div className="space-y-2">
          {manualFlavors.map((flav, idx) => (
            <button
              key={idx}
              onClick={() => onDirectCustomizer(flav)}
              className="w-full p-3 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: flav.color }}></span>
                <div className="text-left">
                  <div className="font-bold text-sm">{flav.name}</div>
                  <div className="text-xs text-zinc-400">{flav.description}</div>
                </div>
              </div>
              <Sliders size={16} className="text-zinc-500" />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-zinc-600 pb-2">
        Trabalho de Design • Monster Energy UI
      </div>
    </div>
  );
}