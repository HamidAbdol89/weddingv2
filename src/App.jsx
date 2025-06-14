import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Heart, Calendar, MapPin, Users, Music, Mail, Phone,MessageCircle } from 'lucide-react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const weddingImages = [
  '13.png','4.jpg',  '9.jpg', '10.JPG',  '11.JPG', '12.jpg','8.jpg',
  '1.jpg', '2.jpg', '3.jpg', '5.JPG', '6.JPG', '7.JPG',
  
];

// 3D Wedding Portal - Thiết kế chuyên nghiệp đặc sắc
function Wedding3DPortal() {
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
}// Heart Shape Geometry đơn giản
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
function FloatingHearts() {
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
// Main Wedding Invitation Component
export default function WeddingInvitation() {
  const [currentSection, setCurrentSection] = useState('invitation');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

const [fullscreenOpen, setFullscreenOpen] = useState(false);
const [isUserInteracting, setIsUserInteracting] = useState(false);
const [modalOpen, setModalOpen] = useState(false);
const [modalContent, setModalContent] = useState({
  title: '',
  message: '',
  isError: false,
});


    const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: ''
  });
// Xử lý play/pause âm thanh
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error);
        // Hiển thị thông báo cho người dùng nếu cần
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
 

  const sections = {
    invitation: 'Thiệp Mời',
    details: 'Chi Tiết',
    gallery: 'Album Ảnh',
    rsvp: 'Xác Nhận'
  };

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};


 // THAY THẾ useEffect TỰ ĐỘNG CHUYỂN ẢNH CŨ BẰNG CÁI NÀY:
useEffect(() => {
  // Chỉ tự động chuyển khi không có tương tác và không mở fullscreen
  if (!isUserInteracting && !fullscreenOpen) {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
    }, 4000); // Tăng thời gian lên 4s để ít bị làm phiền
    return () => clearInterval(interval);
  }
}, [isUserInteracting, fullscreenOpen]);

// FUNCTION navigateImage VỚI XỬ LÝ TƯƠNG TÁC:
const navigateImage = (direction) => {
  setIsUserInteracting(true); // Đánh dấu user đang tương tác
  if (direction === 'next') {
    setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
  } else {
    setCurrentImageIndex((prev) => (prev === 0 ? weddingImages.length - 1 : prev - 1));
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Hiển thị loading state với animation đẹp
  setModalContent({
    title: "Đang xử lý yêu cầu",
    message: "Vui lòng chờ trong giây lát...",
    isError: false,
    isLoading: true
  });
  setModalOpen(true);

  const templateParams = {
    from_name: formData.name,
    phone: formData.phone,
    guests: formData.guests,
    message: formData.message,
    date: new Date().toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    ip_address: await fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(() => 'Unknown')
  };

  try {
    // Giả lập thời gian chờ tối thiểu để UX mượt mà
    const sendPromise = emailjs.send(
      'service_e67szrs',
      'template_7fi94ca',
      templateParams,
      'q05JBffJg3W0pmOJh'
    );
    
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1500));
    
    await Promise.all([sendPromise, timeoutPromise]);

    // Reset form
    setFormData({
      name: '',
      phone: '',
      guests: '',
      message: ''
    });

    // Hiệu ứng confetti khi thành công
    if (typeof window !== 'undefined') {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#a7f3d0']
      });
    }

    setModalContent({
      title: "Thành công!",
      message: "Cảm ơn bạn đã xác nhận tham dự! Hẹn gặp bạn tại lễ cưới nhé!❤️",
      isError: false,
      isLoading: false
    });

    // Tự động đóng sau 8 giây
    setTimeout(() => {
      setModalOpen(false);
    }, 8000);

  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    
    setModalContent({
      title: "Lỗi hệ thống",
      message: `Xin lỗi, đã có lỗi xảy ra (Mã lỗi: ${error.code || 'UNKNOWN'}). Vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp qua số điện thoại 0909.xxx.xxx để được hỗ trợ.`,
      isError: true,
      isLoading: false
    });
  }
};


 return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Navigation - Mobile Optimized */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-200 shadow-sm">
        <div className="max-w-full mx-auto px-2 py-2">
          <div className="flex justify-center space-x-2 sm:space-x-4 overflow-x-auto">
            {Object.entries(sections).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentSection(key)}
                className={`px-3 py-2 text-sm sm:text-base rounded-full transition-all duration-300 whitespace-nowrap ${
                  currentSection === key
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'text-rose-600 hover:bg-rose-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentSection === 'invitation' && (
          <div className="relative">
            {/* 3D Scene - Mobile Responsive */}
            <div className="h-screen">
              <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[8, 8, 8]} intensity={0.8} />
                <pointLight position={[-8, -8, -8]} intensity={0.4} color="#ff69b4" />
                <Wedding3DPortal/>
                <FloatingHearts />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                />
              </Canvas>

            </div>

            {/* Overlay Text - Mobile Responsive */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
              <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20 max-w-sm sm:max-w-md">
                <h1 className="text-4xl sm:text-6xl font-serif text-rose-600 mb-2 sm:mb-4 animate-pulse">
                  DUSÔ & HASIKIN
                </h1>
                <p className="text-sm sm:text-xl text-rose-800 mb-4 sm:mb-6 leading-relaxed">
                  Trân trọng kính mời bạn tham dự lễ cưới của chúng tôi
                </p>
                <div className="flex items-center justify-center space-x-2 text-rose-700">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-lg">25 Tháng 12, 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'details' && (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
            <h2 className="text-2xl sm:text-4xl font-serif text-center text-rose-600 mb-8 sm:mb-12">
              Chi Tiết Lễ Cưới
            </h2>
            
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="bg-rose-500 p-2 sm:p-3 rounded-full">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-rose-700">Lễ Vu Quy</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Thứ 7, 25 Tháng 12, 2025</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Nhà Trai - 123 Đường ABC, Quận XYZ</span>
                  </div>
                  <p className="text-xs sm:text-sm bg-rose-50 p-3 sm:p-4 rounded-lg">
                    Thời gian: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="bg-purple-500 p-2 sm:p-3 rounded-full">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-purple-700">Tiệc Cưới</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Thứ 7, 25 Tháng 12, 2025</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Grand Ballroom, Paradise Hotel</span>
                  </div>
                  <p className="text-xs sm:text-sm bg-purple-50 p-3 sm:p-4 rounded-lg">
                    Thời gian: 6:00 PM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-rose-500 to-purple-500 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Lời Cảm Ơn</h3>
              <p className="text-sm sm:text-lg leading-relaxed">
                Sự hiện diện của bạn sẽ làm cho ngày đặc biệt của chúng tôi trở nên hoàn hảo hơn. 
                Chúng tôi rất mong được chia sẻ niềm hạnh phúc này cùng với bạn!
              </p>
            </div>

          </div>
          
        )}

  {currentSection === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
            <h2 className="text-3xl sm:text-5xl font-serif text-center bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-8 sm:mb-12 tracking-wide">
              Album Ảnh Cưới
            </h2>
            
            {/* Main Gallery Container */}
            <div className="relative">
              {/* Full-screen Image Display - Ultra High Quality */}
              <div className="relative w-full h-[60vh] sm:h-[75vh] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }}
                      exit={{ 
                        opacity: 0,
                        transition: { 
                          duration: 0.2 
                        }
                      }}
                      className="absolute inset-0"
                    >
                      <img
                        src={`/images/${weddingImages[currentImageIndex]}`}
                        alt={`Ảnh cưới ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover object-center rounded-xl cursor-zoom-in"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        sizes="(max-width: 768px) 100vw, 90vw"
                        style={{
                          transform: 'translate3d(0,0,0)',
                          willChange: 'opacity',
                          imageRendering: 'high-quality',
                          WebkitImageSmoothing: 'high',
                          imageSmoothing: 'high',
                          filter: 'none',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                        onLoad={(e) => {
                          // Đảm bảo ảnh render với chất lượng cao nhất
                          e.target.style.imageRendering = 'crisp-edges';
                          e.target.style.imageRendering = '-webkit-optimize-contrast';
                          e.target.style.imageRendering = 'optimize-quality';
                        }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMyMy4zMTM3IDI2IDI2IDIzLjMxMzcgMjYgMjBDMjYgMTYuNjg2MyAyMy4zMTM3IDE0IDIwIDE0QzE2LjY4NjMgMTQgMTQgMTYuNjg2MyAxNCAyMEMxNCAyMy4zMTM3IDE2LjY4NjMgMjYgMjAgMjZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Navigation Controls - Simplified */}
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="pointer-events-auto group bg-white/25 backdrop-blur-md hover:bg-white/35 p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 opacity-80 hover:opacity-100"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="pointer-events-auto group bg-white/25 backdrop-blur-md hover:bg-white/35 p-3 sm:p-4 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 opacity-80 hover:opacity-100"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Counter & Fullscreen Button - Simplified */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
                  <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-medium">
                    {currentImageIndex + 1} / {weddingImages.length}
                  </div>
                  <button
                    onClick={() => setFullscreenOpen(true)}
                    className="bg-white/25 backdrop-blur-md hover:bg-white/35 p-2 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar - Simplified */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/15">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentImageIndex + 1) / weddingImages.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Enhanced Thumbnail Grid - Ultra High Quality */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
                  {weddingImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                        index === currentImageIndex 
                          ? 'ring-3 ring-rose-500 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                    >
                      <img
                        src={`/images/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16.67vw, 12.5vw"
                        style={{ 
                          transform: 'translate3d(0,0,0)',
                          imageRendering: 'high-quality',
                          WebkitImageSmoothing: 'high',
                          imageSmoothing: 'high',
                          filter: 'none',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                        onLoad={(e) => {
                          // Tối ưu chất lượng render cho thumbnail
                          e.target.style.imageRendering = 'crisp-edges';
                          e.target.style.imageRendering = '-webkit-optimize-contrast';
                          e.target.style.imageRendering = 'optimize-quality';
                        }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMyMy4zMTM3IDI2IDI2IDIzLjMxMzcgMjYgMjBDMjYgMTYuNjg2MyAyMy4zMTM3IDE0IDIwIDE0QzE2LjY4NjMgMTQgMTQgMTYuNjg2MyAxNCAyMEMxNCAyMy4zMTM3IDE2LjY4NjMgMjYgMjAgMjZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                        }}
                      />
                      {index === currentImageIndex && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fullscreen Modal - Ultra High Quality */}
              {fullscreenOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-black/95"
                  onClick={() => setFullscreenOpen(false)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <button
                      onClick={() => setFullscreenOpen(false)}
                      className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-2xl transition-all duration-200"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`fullscreen-${currentImageIndex}`}
                        src={`/images/${weddingImages[currentImageIndex]}`}
                        alt={`Wedding photo ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        sizes="100vw"
                        style={{ 
                          transform: 'translate3d(0,0,0)',
                          imageRendering: 'high-quality',
                          WebkitImageSmoothing: 'high',
                          imageSmoothing: 'high',
                          filter: 'none',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                        onLoad={(e) => {
                          // Chất lượng tối đa cho fullscreen
                          e.target.style.imageRendering = 'crisp-edges';
                          e.target.style.imageRendering = '-webkit-optimize-contrast';
                          e.target.style.imageRendering = 'optimize-quality';
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </AnimatePresence>

                    {/* Fullscreen Navigation */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('prev');
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-3 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('next');
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-3 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium">
                      {currentImageIndex + 1} / {weddingImages.length}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
   {currentSection === 'rsvp' && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-2xl mx-auto px-4 py-8 sm:py-16"
  >
    <div className="text-center mb-10 sm:mb-14">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 mb-3"
      >
        Xác Nhận Tham Dự
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 text-sm sm:text-base"
      >
        Vui lòng điền thông tin bên dưới để chúng tôi chuẩn bị chu đáo
      </motion.p>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-white shadow-xl overflow-hidden relative"
    >
      {/* Hiệu ứng nền tinh tế */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6 sm:space-y-8">
        {/* Field Họ và Tên */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
            Họ và Tên <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white/90 transition-all duration-200"
              placeholder="Nguyễn Văn A"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Field Số Điện Thoại */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
            Số Điện Thoại
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-5 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white/90 transition-all duration-200"
              placeholder="0987 654 321"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Field Số Người Tham Dự */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
            Số Người Tham Dự
          </label>
          <div className="relative">
            <select 
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full px-5 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white/90 appearance-none transition-all duration-200"
            >
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
              <option value="4">4 người</option>
              <option value="5+">Hơn 4 người</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Field Lời Chúc */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">
            Lời Chúc
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-5 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white/90 resize-none transition-all duration-200"
              placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
            />
            <div className="absolute top-3 right-3 flex items-center pr-3 pointer-events-none">
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Nút Submit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-4"
        >
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden transition-all duration-300 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>Gửi Xác Nhận</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-rose-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </form>
    </motion.div>
  </motion.div>
)}

{modalOpen && (
  <div className="fixed inset-0 bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-500 animate-fadeIn">
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl w-[95%] max-w-lg mx-auto border border-white/20 overflow-hidden"
    >
      {/* Hiệu ứng ánh sáng */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-xl opacity-30 ${modalContent.isError ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-lg opacity-20 ${modalContent.isError ? 'bg-red-400' : 'bg-emerald-400'}`}></div>
      </div>
      
      {/* Nội dung chính */}
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          {modalContent.isLoading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
          ) : modalContent.isError ? (
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-full border border-red-200 shadow-inner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-4 rounded-full border border-emerald-200 shadow-inner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl font-extrabold mb-4 text-center bg-clip-text ${modalContent.isError 
            ? 'text-transparent bg-gradient-to-r from-red-500 to-red-600' 
            : 'text-transparent bg-gradient-to-r from-emerald-500 to-teal-600'}`}
        >
          {modalContent.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mb-8 text-center leading-relaxed text-lg"
        >
          {modalContent.message}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setModalOpen(false)}
            className={`relative overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              modalContent.isError 
                ? 'bg-gradient-to-br from-red-500 to-red-600 hover:shadow-red-300/50 text-white' 
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-emerald-300/50 text-white'
            }`}
          >
            <span className="relative z-10">Đóng</span>
            <span className={`absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300`}></span>
          </button>
        </motion.div>
      </div>
      
      {/* Hiệu ứng viền ánh sáng */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none border-2 ${modalContent.isError ? 'border-red-500/20' : 'border-emerald-500/20'}`}></div>
    </motion.div>
  </div>
)}

      </div>
  <audio 
        ref={audioRef} 
        src="/wedding.mp3" 
        loop 
        preload="auto"
      />
      {/* Floating Action Button - Music - Mobile Optimized */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`fixed bottom-6 right-6 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isPlaying 
            ? 'bg-rose-500 text-white animate-pulse' 
            : 'bg-white text-rose-500 hover:bg-rose-50'
        }`}
      >
        <Music className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Decorative Elements - Mobile Responsive */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-4 w-12 h-12 sm:w-20 sm:h-20 bg-rose-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-6 w-10 h-10 sm:w-16 sm:h-16 bg-purple-200 rounded-full opacity-20 animate-bounce delay-75"></div>
        <div className="absolute bottom-32 left-8 w-14 h-14 sm:w-24 sm:h-24 bg-pink-200 rounded-full opacity-20 animate-bounce delay-150"></div>
        <div className="absolute bottom-20 right-4 w-8 h-8 sm:w-12 sm:h-12 bg-rose-300 rounded-full opacity-20 animate-bounce delay-300"></div>
      </div>
    </div>
  );
}