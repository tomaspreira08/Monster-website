import { useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function createCanTexture({ canColor, patternColor, selectedPattern, customName, flavorName }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 1. Fundo Base da Lata
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Desenhar o Padrão à volta da lata toda
  ctx.save();
  ctx.fillStyle = patternColor;
  ctx.strokeStyle = patternColor;

  if (selectedPattern === 'claws') {
    // Riscas rasgadas diagonais por toda a lata
    ctx.globalAlpha = 0.35;
    for (let i = -500; i < 1500; i += 90) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 45, 0);
      ctx.lineTo(i - 250, 1024);
      ctx.lineTo(i - 295, 1024);
      ctx.closePath();
      ctx.fill();
    }
  } else if (selectedPattern === 'cyber') {
    // Grelha tecnológica
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 4;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y < 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }
  } else if (selectedPattern === 'camo') {
    // Manchas camufladas
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 45; i++) {
      const x = (i * 197) % 1024;
      const y = (i * 313) % 1024;
      const r = 40 + (i % 5) * 20;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (selectedPattern === 'carbon') {
    // Pontos de fibra de carbono
    ctx.globalAlpha = 0.4;
    for (let x = 0; x < 1024; x += 24) {
      for (let y = 0; y < 1024; y += 24) {
        ctx.fillRect(x, y, 10, 10);
      }
    }
  }
  ctx.restore();

  // Sombra suave no centro para destacar o logótipo
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 420);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 3. Desenhar o Logótipo das 3 Garras da Monster no Centro (x = 512)
  ctx.save();
  ctx.fillStyle = patternColor;
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 20;

  // Garra Esquerda
  ctx.beginPath();
  ctx.moveTo(410, 310);
  ctx.lineTo(445, 330);
  ctx.lineTo(435, 650);
  ctx.lineTo(415, 690);
  ctx.lineTo(405, 640);
  ctx.lineTo(415, 360);
  ctx.lineTo(395, 345);
  ctx.closePath();
  ctx.fill();

  // Garra Central (mais comprida)
  ctx.beginPath();
  ctx.moveTo(495, 290);
  ctx.lineTo(535, 315);
  ctx.lineTo(525, 680);
  ctx.lineTo(505, 720);
  ctx.lineTo(495, 670);
  ctx.lineTo(500, 345);
  ctx.lineTo(480, 330);
  ctx.closePath();
  ctx.fill();

  // Garra Direita
  ctx.beginPath();
  ctx.moveTo(580, 315);
  ctx.lineTo(620, 340);
  ctx.lineTo(605, 645);
  ctx.lineTo(585, 685);
  ctx.lineTo(575, 635);
  ctx.lineTo(585, 365);
  ctx.lineTo(565, 350);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 4. Texto Personalizado no Topo da Lata
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 10;
  ctx.fillText((customName || 'O TEU NOME AQUI').toUpperCase(), 512, 180);
  ctx.restore();

  // 5. Tipografia "MONSTER ENERGY" e Sabor em baixo
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 46px sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.95)';
  ctx.shadowBlur = 12;
  ctx.fillText('MONSTER', 512, 790);

  ctx.font = '700 22px sans-serif';
  ctx.fillStyle = '#E4E4E7';
  ctx.fillText('E N E R G Y', 512, 825);

  ctx.font = '900 26px sans-serif';
  ctx.fillStyle = patternColor;
  ctx.fillText((flavorName || 'EDITION').toUpperCase(), 512, 870);

  ctx.font = '700 20px monospace';
  ctx.fillStyle = '#A1A1AA';
  ctx.fillText('500ml', 512, 920);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function CylinderCan({ canColor, patternColor, selectedPattern, customName, flavorName }) {
  const texture = useMemo(() => {
    return createCanTexture({ canColor, patternColor, selectedPattern, customName, flavorName });
  }, [canColor, patternColor, selectedPattern, customName, flavorName]);

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      {/* Corpo Principal da Lata com a Textura Embrulhada */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 4.5, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>

      {/* Rebordo Superior Metálico */}
      <mesh position={[0, 2.32, 0]}>
        <cylinderGeometry args={[1.05, 1.2, 0.22, 64]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Tampa Prateada */}
      <mesh position={[0, 2.44, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.04, 64]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Rebordo Inferior Metálico */}
      <mesh position={[0, -2.32, 0]}>
        <cylinderGeometry args={[1.2, 1.05, 0.22, 64]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function CanScene({ canColor, patternColor, selectedPattern, customName, flavorName }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 48 }}>
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, -5]} intensity={1.2} />

        <CylinderCan
          canColor={canColor}
          patternColor={patternColor}
          selectedPattern={selectedPattern}
          customName={customName}
          flavorName={flavorName}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.4}
        />
      </Canvas>
    </div>
  );
}