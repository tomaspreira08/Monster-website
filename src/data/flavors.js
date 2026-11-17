export const FLAVORS_MAP = {
  green: { id: 'green', name: 'Monster Energy Green', color: '#84cc16', description: 'O clássico original lendário, intenso e doce' },
  white: { id: 'white', name: 'Monster Ultra White', color: '#e2e8f0', description: 'Citrus leve, refrescante e zero açúcar' },
  fiesta: { id: 'fiesta', name: 'Monster Ultra Fiesta Mango', color: '#f97316', description: 'Manga tropical intensa e zero açúcar' },
  pipeline: { id: 'pipeline', name: 'Monster Juice Pipeline Punch', color: '#ec4899', description: 'Maracujá, laranja e goiaba sumarenta' },
  paradise: { id: 'paradise', name: 'Monster Ultra Paradise', color: '#22c55e', description: 'Kiwi, lima e um toque fresco de pepino' },
  ultrared: { id: 'ultrared', name: 'Monster Ultra Red', color: '#dc2626', description: 'Frutos vermelhes silvestres e zero açúcar' },
  doctor: { id: 'doctor', name: 'Monster The Doctor (VR46)', color: '#facc15', description: 'Explosão cítrica e ácida inspirada no Valentino Rossi' }
};

// Array exportado para poder fazer .map() nos componentes (como o Customizer e o Quiz)
export const FLAVORS = Object.values(FLAVORS_MAP);