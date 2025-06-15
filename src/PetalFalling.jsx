import React from 'react';

const PetalFalling = ({ 
  petalCount = 15,
  className = ''
}) => {
  // Tạo array các cánh hoa với vị trí và timing ngẫu nhiên
  const petals = Array.from({ length: petalCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    animationDuration: 4 + Math.random() * 3,
    size: 8 + Math.random() * 8,
    color: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 360,
    opacity: 0.4 + Math.random() * 0.4,
    swayAmount: 10 + Math.random() * 15
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            backgroundColor: petal.color,
            borderRadius: '50% 10% 50% 10%',
            opacity: petal.opacity,
            animationDelay: `${petal.animationDelay}s`,
            animationDuration: `${petal.animationDuration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName: `fall-${petal.id}`,
            transform: 'translateZ(0)', // Hardware acceleration
            backfaceVisibility: 'hidden'
          }}
        />
      ))}
      
      {/* CSS Keyframes tối ưu cho mobile */}
      <style>{`
        ${petals.map(petal => `
          @keyframes fall-${petal.id} {
            0% {
              transform: translate3d(0, -20px, 0) rotate(${petal.rotation}deg);
            }
            25% {
              transform: translate3d(${petal.swayAmount}px, 25vh, 0) rotate(${petal.rotation + 90}deg);
            }
            50% {
              transform: translate3d(-${petal.swayAmount * 0.7}px, 50vh, 0) rotate(${petal.rotation + 180}deg);
            }
            75% {
              transform: translate3d(${petal.swayAmount * 0.5}px, 75vh, 0) rotate(${petal.rotation + 270}deg);
            }
            100% {
              transform: translate3d(0, 100vh, 0) rotate(${petal.rotation + 360}deg);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default PetalFalling;