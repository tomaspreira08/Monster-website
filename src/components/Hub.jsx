import { motion } from 'framer-motion';
import { Sparkles, Sliders, Zap, Bookmark } from 'lucide-react';

export default function Hub({ onStartQuiz, onDirectCustomizer, onViewSaved, savedCount }) {
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
        {/* Opção 1: O Quiz */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onStartQuiz}
          className="w-full p-4 bg-gradient-to-r from-black-600 to-emerald-500 rounded-2xl font-bold flex items-center justify-between shadow-lg shadow-green-900/30 text-left cursor-pointer"
        >
          <div>
            <div className="text-xl">Quiz de Sabor</div>
            <div className="text-xs text-green-100/80 font-normal">Descobre o sabor perfeito para ti</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl">👉</div>
        </motion.button>

        {/* Opção 2: Criar do Zero */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onDirectCustomizer({
            name: 'Monster Ultra Original',
            color: '#121214',
            description: 'O clássico para personalização livre.'
          })}
          className="w-full p-4 bg-gradient-to-r from-black-600 to-emerald-500 rounded-2xl font-bold flex items-center justify-between shadow-lg shadow-green-900/30 text-left cursor-pointer"
        >
          <div>
            <div className="text-xl text-white">Criar do Zero</div>
            <div className="text-xs text-zinc-400 font-normal">Salta o quiz e personaliza já</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl">🎨</div>
        </motion.button>

        {/* Opção 3: Ver Latas Guardadas */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onViewSaved}
          className="w-full p-4 bg-gradient-to-r from-emerald-600 to-black-500 rounded-2xl font-bold flex items-center justify-between shadow-lg shadow-green-700/30 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2.5 rounded-lg text-green-400">
              <Bookmark size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Minhas Personalizações</div>
              <div className="text-[11px] text-zinc-400">Ver latas guardadas ({savedCount})</div>
            </div>
          </div>
          <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
            {savedCount}
          </span>
        </motion.button>
      </div>

      <div className="text-center text-xs text-zinc-600 pb-2">
        Trabalho de Design • Monster Energy UI
      </div>
    </div>
  );
}