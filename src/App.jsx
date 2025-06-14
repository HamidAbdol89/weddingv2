import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Heart, Calendar, MapPin, Users, Music, Mail, Phone,MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WeddingDetails from './WeddingDetails';
import Wedding3DPortal from './Wedding3DPortal';
import FloatingHearts from './FloatingHearts';
import MailForm from './MailForm';
import Gallery from './Gallery';



// Main Wedding Invitation Component
export default function WeddingInvitation() {
  const [currentSection, setCurrentSection] = useState('invitation');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

const [modalOpen, setModalOpen] = useState(false);
 const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isError: false,
    isLoading: false
  });

  // Hàm mở modal
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };
 
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

        {/* CHI TIẾT*/}
          {currentSection === 'details' && < WeddingDetails />}
        {/* ALBUM ẢNH*/}
          { currentSection === 'gallery' && < Gallery /> }
        {/* MAIL*/}
          {currentSection === 'rsvp' && < MailForm/>}

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