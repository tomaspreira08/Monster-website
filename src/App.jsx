import { useState } from 'react';
import Hub from './components/Hub';
import Quiz from './components/Quiz';
import Customizer from './components/Customizer';
import SavedCans from './components/SavedCans';

export default function App() {
  const [currentView, setCurrentView] = useState('hub');
  const [flavor, setFlavor] = useState(null); // Começa vazio por defeito
  const [editingIndex, setEditingIndex] = useState(null);
  const [customData, setCustomData] = useState(null);

  const [savedCans, setSavedCans] = useState(() => {
    const local = localStorage.getItem('monster_saved_cans');
    return local ? JSON.parse(local) : [];
  });

  const handleSaveCan = (newCanData) => {
    let newList;
    if (editingIndex !== null) {
      newList = [...savedCans];
      newList[editingIndex] = newCanData;
      alert('Alterações guardadas com sucesso! 🚀');
    } else {
      newList = [newCanData, ...savedCans];
      alert('Lata guardada nas tuas personalizações! 🚀');
    }

    setSavedCans(newList);
    localStorage.setItem('monster_saved_cans', JSON.stringify(newList));
    setEditingIndex(null);
    setCurrentView('saved');
  };

  return (
    <div className="min-h-[100dvh] w-full bg-zinc-950 text-white flex flex-col items-center justify-center font-sans select-none overflow-hidden">
      {/* Moldura / Parte do telemóvel */}
      <div className="relative w-full max-w-md h-[100dvh] md:h-[850px] md:rounded-3xl md:border-4 md:border-zinc-800 bg-zinc-900 flex flex-col shadow-2xl overflow-hidden">
        
        {/* Imagem de fundo apenas na parte do telemóvel */}
        <img
          src="/fundo-site.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none select-none z-0"
        />

        {/* Conteúdo acima do fundo */}
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {currentView === 'hub' && (
            <Hub 
              onStartQuiz={() => {
                setEditingIndex(null);
                setCustomData(null);
                setCurrentView('quiz');
              }}
              onDirectCustomizer={() => {
                setEditingIndex(null);
                setCustomData(null);
                setFlavor(null);
                setCurrentView('customizer');
              }}
              onViewSaved={() => setCurrentView('saved')}
              savedCount={savedCans.length}
            />
          )}

          {currentView === 'quiz' && (
            <Quiz 
              onComplete={(selectedFlavor) => {
                setEditingIndex(null);
                setCustomData(null);
                setFlavor(selectedFlavor);
                setCurrentView('customizer');
              }}
              onBack={() => setCurrentView('hub')}
            />
          )}

          {currentView === 'customizer' && (
            <Customizer 
              flavor={flavor}
              initialData={customData}
              isEditing={editingIndex !== null}
              onBack={() => setCurrentView('hub')}
              onSave={handleSaveCan}
            />
          )}

          {currentView === 'saved' && (
            <SavedCans 
              cans={savedCans}
              onBack={() => setCurrentView('hub')}
              onEditCan={(item, index) => {
                setEditingIndex(index);
                setCustomData(item);
                setFlavor(item.flavorName ? { name: item.flavorName, color: item.patternColor } : null);
                setCurrentView('customizer');
              }}
              onNewCustomizer={() => {
                setEditingIndex(null);
                setCustomData(null);
                setFlavor(null);
                setCurrentView('customizer');
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}