import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

// ==========================================
// CATÁLOGO DE SABORES REAIS DA MONSTER
// ==========================================
const FLAVORS = {
  green: { id: 'green', name: 'Monster Energy Green', color: '#84cc16', description: 'O clássico original lendário, intenso e doce' },
  white: { id: 'white', name: 'Monster Ultra White', color: '#e2e8f0', description: 'Citrus leve, refrescante e zero açúcar' },
  fiesta: { id: 'fiesta', name: 'Monster Ultra Fiesta Mango', color: '#f97316', description: 'Manga tropical intensa e zero açúcar' },
  pipeline: { id: 'pipeline', name: 'Monster Juice Pipeline Punch', color: '#ec4899', description: 'Maracujá, laranja e goiaba sumarenta' },
  paradise: { id: 'paradise', name: 'Monster Ultra Paradise', color: '#22c55e', description: 'Kiwi, lima e um toque fresco de pepino' },
  ultrared: { id: 'ultrared', name: 'Monster Ultra Red', color: '#dc2626', description: 'Frutos vermelhes silvestres e zero açúcar' },
  doctor: { id: 'doctor', name: 'Monster The Doctor (VR46)', color: '#facc15', description: 'Explosão cítrica e ácida inspirada no Valentino Rossi' }
};

// ==========================================
// PERGUNTAS E PONTUAÇÃO POR SABOR
// ==========================================
const questions = [
  {
    id: 1,
    question: "Qual é o tipo de fruta que domina o teu palato ideal?",
    options: [
      { label: "Frutos vermelhos e silvestres (mirtilo, uva, açaí)", points: { ultrared: 3, pipeline: 1 } },
      { label: "Frutas tropicais e sumarentas (manga, maracujá, goiaba)", points: { fiesta: 3, pipeline: 3, paradise: 1 } },
      { label: "Citrinos ácidos e refrescantes (limão, lima, toranja)", points: { white: 3, doctor: 3, paradise: 1 } }
    ]
  },
  {
    id: 2,
    question: "Como preferes o balanço de açúcar e doçura na tua bebida?",
    options: [
      { label: "Super doce, intenso e encorpado na boca", points: { pipeline: 3, green: 3, doctor: 1 } },
      { label: "Equilibrado, frutado mas leve", points: { fiesta: 2, paradise: 2, ultrared: 2 } },
      { label: "Zero açúcar, seco, ácido e pouco doce", points: { white: 3, ultrared: 2, fiesta: 2, paradise: 2 } }
    ]
  },
  {
    id: 3,
    question: "Se pudesses adicionar uma nota secundária exótica ao teu sabor, qual escolherias?",
    options: [
      { label: "Um toque picante ou clássico energético marcante", points: { green: 3, doctor: 1 } },
      { label: "Um toque herbáceo e fresco (pepino, hortelã ou kiwi)", points: { paradise: 3, white: 2 } },
      { label: "Um perfil puramente frutado sem misturas estranhas", points: { pipeline: 2, fiesta: 2, ultrared: 2 } }
    ]
  },
  {
    id: 4,
    question: "Em termos de gás e textura, como gostas que a bebida se sinta?",
    options: [
      { label: "Carbonatação pesada, agressiva e cheia de gás na língua", points: { green: 3, doctor: 2 } },
      { label: "Suave, sedoso e quase como um sumo gaseificado leve", points: { pipeline: 3, fiesta: 2 } },
      { label: "Extremamente leve, cristalino e refrescante", points: { white: 3, paradise: 2, ultrared: 2 } }
    ]
  },
  {
    id: 5,
    question: "Qual é a tua tolerância à acidez e ao amargo no sabor?",
    options: [
      { label: "Adoro acidez forte que faz mossa e acorda logo a boca", points: { doctor: 3, white: 2, paradise: 1 } },
      { label: "Prefiro um sabor doce, redondo e suave, sem acidez agressiva", points: { pipeline: 3, fiesta: 2, green: 1 } },
      { label: "Gosto de um meio-termo equilibrado e refrescante", points: { ultrared: 3, paradise: 2, fiesta: 1 } }
    ]
  }
];

export default function Quiz({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scoreMap, setScoreMap] = useState({});
  const [topFlavors, setTopFlavors] = useState(null);

  const handleSelect = (points) => {
    const updatedScores = { ...scoreMap };
    Object.entries(points).forEach(([flavorId, pts]) => {
      updatedScores[flavorId] = (updatedScores[flavorId] || 0) + pts;
    });

    if (currentStep + 1 < questions.length) {
      setScoreMap(updatedScores);
      setCurrentStep(currentStep + 1);
    } else {
      const ranked = Object.values(FLAVORS)
        .map((flav) => ({
          ...flav,
          score: updatedScores[flav.id] || 0
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setTopFlavors(ranked);
    }
  };

  if (topFlavors) {
    return (
      <div className="flex flex-col h-full p-6 justify-between">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setTopFlavors(null);
              setCurrentStep(0);
              setScoreMap({});
            }}
            className="p-2 text-zinc-400 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft size={18} /> Refazer
          </button>
          <span className="text-xs font-mono text-green-400 uppercase tracking-widest">Resultado</span>
        </div>

        <div className="my-auto space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-400 mb-1">
              <Sparkles size={14} /> Top 3 para o teu paladar
            </div>
            <h2 className="text-2xl font-black text-white">Escolhe a tua base</h2>
            <p className="text-xs text-zinc-400 mt-1">Seleciona um dos sabores recomendados para personalizar a lata.</p>
          </div>

          <ul className="space-y-3">
            {topFlavors.map((flav, index) => (
              <li key={flav.id}>
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onComplete(flav)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    index === 0
                      ? 'bg-zinc-800 border-green-500 shadow-lg shadow-green-950/30'
                      : 'bg-zinc-800/50 border-zinc-700/70 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-4 h-10 rounded-full shrink-0"
                      style={{ backgroundColor: flav.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white">{flav.name}</span>
                        {index === 0 && (
                          <span className="text-[10px] font-bold uppercase bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            #1 Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{flav.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-500 shrink-0" />
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-[11px] text-zinc-500">
          Clica num sabor para avançar para a personalização
        </div>
      </div>
    );
  }

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
            <h2 className="text-2xl font-bold tracking-tight text-white">{questions[currentStep].question}</h2>

            <ul className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleSelect(opt.points)}
                    className="w-full p-4 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-2xl text-left font-medium transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-zinc-200 group-hover:text-white pr-3">{opt.label}</span>
                    <span className="w-4 h-4 rounded-full border-2 border-zinc-500 group-hover:border-green-400 shrink-0 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
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