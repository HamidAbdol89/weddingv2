import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';



// Heart Shape Geometry đơn giản
function createHeartShape() {
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
  return heartShape;
}
// Floating Hearts 3D Component tối ưu cho mobile
export default function FloatingHearts() {
  const heartsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heartCount = isMobile ? 8 : 15;
  const hearts = Array.from({ length: heartCount }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * (isMobile ? 10 : 15),
      (Math.random() - 0.5) * (isMobile ? 8 : 15),
      (Math.random() - 0.5) * (isMobile ? 8 : 15)
    ],
    scale: Math.random() * 0.2 + 0.15,
    speed: Math.random() * 0.012 + 0.006
  }));

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, i) => {
        const heartData = hearts[i];
        
        // Chuyển động đơn giản
        heart.position.y += heartData.speed;
        heart.rotation.z += 0.005;
        
        // Reset vị trí
        const maxY = isMobile ? 6 : 8;
        if (heart.position.y > maxY) heart.position.y = -maxY;
      });
    }
  });

  const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
    depth: 0.08,
    bevelEnabled: false
  });

  return (
    <group ref={heartsRef}>
      {hearts.map((heart) => (
        <mesh 
          key={heart.id} 
          position={heart.position} 
          scale={[heart.scale, heart.scale, heart.scale]}
          geometry={heartGeometry}
        >
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}
