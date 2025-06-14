import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';




// 3D Wedding Portal - Thiết kế chuyên nghiệp đặc sắc
export default function Wedding3DPortal() {
  const portalRef = useRef();
  const ringsRef = useRef();
  const particlesRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tạo particles vàng bay xung quanh
  const particles = Array.from({ length: isMobile ? 30 : 50 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6
    ],
    speed: Math.random() * 0.008 + 0.002,
    size: Math.random() * 0.03 + 0.01
  }));

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (portalRef.current) {
      // Portal quay nhẹ và floating
      portalRef.current.rotation.z = time * 0.1;
      portalRef.current.position.y = Math.sin(time * 0.8) * 0.2;
    }
    
    if (ringsRef.current) {
      // Nhẫn cưới xoay quanh nhau
      ringsRef.current.children[0].rotation.x = time * 0.5;
      ringsRef.current.children[0].rotation.y = time * 0.3;
      ringsRef.current.children[1].rotation.x = -time * 0.4;
      ringsRef.current.children[1].rotation.z = time * 0.6;
    }
    
    if (particlesRef.current) {
      // Particles bay xung quanh
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        particle.position.x += Math.sin(time + i) * 0.002;
        particle.position.y += data.speed;
        particle.position.z += Math.cos(time + i) * 0.002;
        
        if (particle.position.y > 4) particle.position.y = -4;
        
        // Sparkle effect
        particle.scale.setScalar(data.size * (1 + Math.sin(time * 3 + i) * 0.3));
      });
    }
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group>
      {/* Background Portal Ring */}
      <group ref={portalRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4 * scale, 0.1 * scale, 16, 64]} />
          <meshBasicMaterial 
            color="#ffd700" 
            transparent 
            opacity={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5 * scale, 0.05 * scale, 12, 48]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
      
      {/* Golden Particles */}
      <group ref={particlesRef}>
        {particles.map((particle) => (
          <mesh key={particle.id} position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial 
              color="#ffd700" 
              transparent 
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Wedding Rings Animation */}
      <group ref={ringsRef}>
        <mesh position={[-0.5 * scale, 2 * scale, 1]}>
          <torusGeometry args={[0.3 * scale, 0.06 * scale, 8, 24]} />
          <meshBasicMaterial color="#ffd700" />
        </mesh>
        <mesh position={[0.5 * scale, 2 * scale, 1]}>
          <torusGeometry args={[0.25 * scale, 0.05 * scale, 8, 24]} />
          <meshBasicMaterial color="#e6e6fa" />
        </mesh>
      </group>
      
      {/* Main Title với gradient effect */}
      <group position={[0, 0.8 * scale, 0]}>
        <Text
          fontSize={1.4 * scale}
          color="#ff6b9d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.1}
        >
          DUSÔ
        </Text>
        
        {/* Heart connector */}
        <mesh position={[0, -0.3 * scale, 0.1]}>
          <sphereGeometry args={[0.08 * scale, 16, 16]} />
          <meshBasicMaterial color="#ff1493" />
        </mesh>
        <Text
          position={[0, -0.3 * scale, 0]}
          fontSize={0.4 * scale}
          color="#ff1493"
          anchorX="center"
          anchorY="middle"
        >
          ♥
        </Text>
        
        <Text
          position={[0, -0.8 * scale, 0]}
          fontSize={1.4 * scale}
          color="#ff6b9d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.1}
        >
          HASIKIN
        </Text>
      </group>
      
      {/* Wedding Details với glass morphism */}
      <group position={[0, -2.2 * scale, 0]}>
        {/* Glass panel background */}
        <mesh>
          <planeGeometry args={[5 * scale, 1.8 * scale]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
          />
        </mesh>
        
        <Text
          position={[0, 0.4 * scale, 0.01]}
          fontSize={0.45 * scale}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
          fontWeight="600"
        >
          December 25, 2025
        </Text>
        
        <Text
          position={[0, 0 * scale, 0.01]}
          fontSize={0.32 * scale}
          color="#e6e6fa"
          anchorX="center"
          anchorY="middle"
        >
          7:00 PM
        </Text>
        
        <Text
          position={[0, -0.4 * scale, 0.01]}
          fontSize={0.35 * scale}
          color="#e6e6fa"
          anchorX="center"
          anchorY="middle"
          fontWeight="500"
        >
          Paradise Hotel
        </Text>
      </group>
      
      {/* Decorative Elements */}
      <group>
        {/* Corner decorations */}
        {[-2, 2].map((x, i) => (
          <group key={i} position={[x * scale, 3 * scale, -0.5]}>
            <mesh>
              <cylinderGeometry args={[0.02 * scale, 0.02 * scale, 1 * scale]} />
              <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0.5 * scale, 0]}>
              <sphereGeometry args={[0.05 * scale, 8, 8]} />
              <meshBasicMaterial color="#ff69b4" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

