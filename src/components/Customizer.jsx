import { useState } from 'react';
import { ArrowLeft, Palette, Grid, Type, Sparkles, Check } from 'lucide-react';
import CanScene from './Can3D';
import { FLAVORS } from '../data/flavors';

const CAN_COLORS = ['#121214', '#ffffff', '#dc2626', '#2563eb', '#16a34a', '#9333ea', '#ea580c', '#eab308'];
const PATTERN_COLORS = ['#84cc16', '#ffffff', '#000000', '#38bdf8', '#f43f5e', '#facc15', '#c084fc', '#fb923c'];
const PATTERNS = [
  { id: 'claws', name: 'Garras' },
  { id: 'cyber', name: 'Cyber' },
  { id: 'camo', name: 'Camo' },
  { id: 'carbon', name: 'Carbono' },
];

export default function Customizer({ flavor, initialData, isEditing, onBack, onSave }) {
  // Se vier do Quiz ou de um Save, já traz sabor. Se vier do Zero, fica null.
  const [selectedFlavor, setSelectedFlavor] = useState(
    initialData?.flavorName
      ? FLAVORS.find(f => f.name === initialData.flavorName) || { name: initialData.flavorName, color: initialData.patternColor }
      : flavor || null
  );

  const [canColor, setCanColor] = useState(initialData ? initialData.canColor : '#121214');
  const [selectedPattern, setSelectedPattern] = useState(initialData ? initialData.selectedPattern : 'claws');
  const [patternColor, setPatternColor] = useState(initialData ? initialData.patternColor : '#84cc16');
  const [customName, setCustomName] = useState(initialData ? initialData.customName : 'O TEU NOME AQUI');
  
  // Se não houver sabor selecionado, abre logo na aba 'flavor' para o user escolher
  const [activeTab, setActiveTab] = useState(!selectedFlavor ? 'flavor' : 'color');

  const handleSelectFlavor = (item) => {
    setSelectedFlavor(item);
    // Opcional: adapta a cor das garras/detalhes à cor do sabor escolhido
    setPatternColor(item.color);
  };

  return (
    <div className="flex flex-col h-full justify-between bg-zinc-950 text-white select-none">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 text-zinc-400 hover:text-white flex items-center gap-1 text-sm font-medium cursor-pointer">
          <ArrowLeft size={18} /> Voltar
        </button>
        
        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide">Monster Lab 3D</h2>
          <span className={`text-[10px] uppercase tracking-widest font-mono ${selectedFlavor ? 'text-green-400' : 'text-amber-400'}`}>
            {selectedFlavor ? selectedFlavor.name : 'Sem sabor selecionado'}
          </span>
        </div>

        <button 
          onClick={() => {
            if (!selectedFlavor) {
              alert('Escolhe primeiro um sabor na aba Sabores!');
              setActiveTab('flavor');
              return;
            }
            onSave({
              flavorName: selectedFlavor.name,
              canColor,
              patternColor,
              selectedPattern,
              customName: customName || 'Edição Limitada',
              date: new Date().toLocaleDateString()
            });
          }}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors shadow-lg ${
            selectedFlavor 
              ? 'bg-green-500 hover:bg-green-400 text-black shadow-green-500/20' 
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          {isEditing ? 'Guardar Alterações' : 'Guardar Lata'}
        </button>
      </div>

      {/* Área 3D */}
      <div className="flex-1 relative min-h-[300px]">
        <CanScene 
          canColor={canColor}
          patternColor={patternColor}
          selectedPattern={selectedPattern}
          customName={customName}
          flavorName={selectedFlavor ? selectedFlavor.name : 'ESCOLHE UM SABOR'}
        />
      </div>

      {/* Painel de Controlo Inferior */}
      <div className="bg-zinc-900 border-t border-zinc-800 p-4 rounded-t-3xl space-y-4 z-10">
        
        {/* Tabs de Navegação */}
        <div className="grid grid-cols-4 gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800/80">
          <button
            onClick={() => setActiveTab('flavor')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'flavor' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles size={14} /> Sabores
            {!selectedFlavor && activeTab !== 'flavor' && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('color')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'color' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette size={14} /> Cores
          </button>

          <button
            onClick={() => setActiveTab('pattern')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'pattern' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Grid size={14} /> Padrão
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'text' ? 'bg-green-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Type size={14} /> Texto
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="min-h-[135px] flex flex-col justify-center">
          
          {/* ABA 1: SABORES */}
          {activeTab === 'flavor' && (
            <div className="grid grid-cols-2 gap-2 max-h-[145px] overflow-y-auto pr-1">
              {FLAVORS.map((item) => {
                const isSelected = selectedFlavor?.name === item.name;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectFlavor(item)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-green-500/15 border-green-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="overflow-hidden pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-white truncate">{item.name}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 truncate mt-0.5">{item.description}</p>
                    </div>
                    {isSelected && <Check size={14} className="text-green-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* ABA 2: CORES */}
          {activeTab === 'color' && (
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mb-1.5">Base da Lata</span>
                <div className="flex justify-between gap-1.5">
                  {CAN_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCanColor(c)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${
                        canColor === c ? 'border-green-400 scale-110' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block mb-1.5">Cor das Garras e Detalhes</span>
                <div className="flex justify-between gap-1.5">
                  {PATTERN_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPatternColor(c)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${
                        patternColor === c ? 'border-white scale-110' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: PADRÃO */}
          {activeTab === 'pattern' && (
            <div className="grid grid-cols-2 gap-2.5">
              {PATTERNS.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => setSelectedPattern(pat.id)}
                  className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    selectedPattern === pat.id
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {pat.name}
                </button>
              ))}
            </div>
          )}

          {/* ABA 4: TEXTO */}
          {activeTab === 'text' && (
            <div className="space-y-2">
              <label className="text-[11px] text-zinc-400 uppercase font-semibold block">
                Nome da Edição (Máx. 18 caracteres)
              </label>
              <input
                type="text"
                maxLength={18}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Ex: EDIÇÃO TOMÁS"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-green-500 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none uppercase"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}