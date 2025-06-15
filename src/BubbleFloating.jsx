import React from 'react';

const BubbleFloating = ({ 
  bubbleCount = 8,
  className = ''
}) => {
  // Tạo array các bong bóng với vị trí và timing ngẫu nhiên
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 6,
    animationDuration: 8 + Math.random() * 6,
    size: 12 + Math.random() * 18,
    opacity: 0.3 + Math.random() * 0.3,
    floatAmount: 15 + Math.random() * 20,
    color: ['rgba(173, 216, 230, 0.7)', 'rgba(176, 196, 222, 0.7)', 'rgba(230, 230, 250, 0.7)', 'rgba(248, 248, 255, 0.8)'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute will-change-transform rounded-full"
          style={{
            left: `${bubble.left}%`,
            bottom: '-50px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${bubble.color})`,
            border: '1px solid rgba(255,255,255,0.3)',
            opacity: bubble.opacity,
            animationDelay: `${bubble.animationDelay}s`,
            animationDuration: `${bubble.animationDuration}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationName: `float-${bubble.id}`,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            boxShadow: 'inset 0 0 15px rgba(255,255,255,0.15)'
          }}
        />
      ))}
      
      {/* CSS Keyframes tối ưu cho mobile */}
      <style>{`
        ${bubbles.map(bubble => `
          @keyframes float-${bubble.id} {
            0% {
              transform: translate3d(0, 50px, 0) scale(0.8);
              opacity: 0;
            }
            10% {
              opacity: ${bubble.opacity};
            }
            25% {
              transform: translate3d(${bubble.floatAmount}px, -25vh, 0) scale(1);
            }
            50% {
              transform: translate3d(-${bubble.floatAmount * 0.6}px, -50vh, 0) scale(0.9);
            }
            75% {
              transform: translate3d(${bubble.floatAmount * 0.4}px, -75vh, 0) scale(1.1);
            }
            90% {
              opacity: ${bubble.opacity * 0.7};
            }
            100% {
              transform: translate3d(0, -100vh, 0) scale(0.6);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default BubbleFloating;