import { useState } from 'react';
import Hub from './components/Hub';
import Quiz from './components/Quiz';
import Customizer from './components/Customizer';

export default function App() {
  const [currentView, setCurrentView] = useState('hub');
  const [flavor, setFlavor] = useState({
    name: 'Ultra Original',
    color: '#00FF00',
    description: 'O clássico de alta voltagem.'
  });

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-white flex flex-col items-center justify-center font-sans select-none overflow-hidden">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] md:rounded-3xl md:border-4 md:border-zinc-800 bg-zinc-900 flex flex-col relative shadow-2xl overflow-hidden">
        
        {currentView === 'hub' && (
          <Hub 
            onStartQuiz={() => setCurrentView('quiz')}
            onDirectCustomizer={(defaultFlavor) => {
              setFlavor(defaultFlavor);
              setCurrentView('customizer');
            }}
          />
        )}

        {currentView === 'quiz' && (
          <Quiz 
            onComplete={(selectedFlavor) => {
              setFlavor(selectedFlavor);
              setCurrentView('customizer');
            }}
            onBack={() => setCurrentView('hub')}
          />
        )}

        {currentView === 'customizer' && (
          <Customizer 
            flavor={flavor}
            onBack={() => setCurrentView('hub')}
          />
        )}

      </div>
    </div>
  );
}