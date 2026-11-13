import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Qual é o teu nível de energia ideal?",
    options: [
      { label: "Modo Monstro Indestrutível", flavor: { name: "Ultra Black", color: "#9333ea", description: "Mirtilo selvagem" } },
      { label: "Foco Total e Suave", flavor: { name: "Ultra White", color: "#e2e8f0", description: "Citrus leve e refrescante" } },
      { label: "Explosão de Fruta Tropical", flavor: { name: "Juice Pipeline", color: "#ec4899", description: "Maracujá, laranja e goiaba" } }
    ]
  },
  {
    id: 2,
    question: "Qual é o teu ambiente de eleição?",
    options: [
      { label: "Sessão de código pela madrugada", flavor: { name: "Ultra Paradise", color: "#22c55e", description: "Kiwi, lima e pepino" } },
      { label: "Skate na rua / Pista", flavor: { name: "Monster Green", color: "#84cc16", description: "O sabor original lendário" } },
      { label: "Festa de verão ao pôr do sol", flavor: { name: "Ultra Fiesta", color: "#f97316", description: "Manga tropical intensa" } }
    ]
  }
];

export default function Quiz({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState([]);

  const handleSelect = (flavor) => {
    const nextScores = [...scores, flavor];
    if (currentStep + 1 < questions.length) {
      setScores(nextScores);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(flavor);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 justify-between">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 text-zinc-400 hover:text-white cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-mono text-zinc-500">Passo {currentStep + 1} de {questions.length}</span>
      </div>

      <div className="my-auto space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">{questions[currentStep].question}</h2>

            <div className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.flavor)}
                  className="w-full p-4 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-2xl text-left font-medium transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <span className="w-4 h-4 rounded-full border-2 border-zinc-500 group-hover:border-green-400"></span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}