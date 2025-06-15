import React, { useState, useRef, useEffect } from 'react';
import { Music } from 'lucide-react';
import WeddingDetails from './WeddingDetails';
import MailForm from './MailForm';
import Gallery from './Gallery';
import WeddingInvitation from './WeddingInvitation';

// Main Wedding Invitation Component
export default function App() {
  const [currentSection, setCurrentSection] = useState('invitation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false); // State để control navbar
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

  // Xử lý tương tác đầu tiên để tự động play nhạc
  const handleFirstInteraction = async () => {
    if (!hasUserInteracted && audioRef.current) {
      setHasUserInteracted(true);
      try {
        // Thử play với promise
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Audio autoplay prevented - in-app browser detected");
        // Fallback: không auto-play, chỉ hiển thị nút để user tự bấm
      }
    }
  };

  // Xử lý play/pause âm thanh
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasUserInteracted(true);
      }
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  
useEffect(() => {
  window.scrollTo(0, 0);
}, [currentSection]);


  useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Ẩn/hiện navbar khi ở phần invitation hoặc details
    if (['invitation', 'details'].includes(currentSection)) {
      if (scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    } else {
      // Các phần khác luôn hiện navbar
      setShowNavbar(true);
    }
  };

  // Cập nhật trạng thái ngay khi chuyển section
  if (['invitation', 'details'].includes(currentSection)) {
    const scrollY = window.scrollY;
    setShowNavbar(scrollY > 100);
  } else {
    setShowNavbar(true);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [currentSection]);


  // Lắng nghe tương tác đầu tiên
  useEffect(() => {
    const handleInteraction = (event) => {
      // Chỉ trigger với các tương tác "thật" từ user
      if (event.isTrusted && !hasUserInteracted) {
        handleFirstInteraction();
      }
    };

    // Lắng nghe các sự kiện tương tác - hỗ trợ cả desktop và mobile
    const events = [
      'click',       // Desktop và mobile - most reliable
      'touchend',    // Mobile touch - reliable
      'keydown',     // Keyboard
      'scroll',      // Desktop scroll
      'mousemove',   // Desktop mouse
      'touchstart'   // Mobile touch backup
    ];
    
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    // Thêm event listener riêng cho navigation để đảm bảo
    const navButtons = document.querySelectorAll('nav button');
    navButtons.forEach(button => {
      button.addEventListener('click', handleInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [hasUserInteracted]);

  const sections = {
    invitation: 'Thiệp Mời',
    details: 'Chi Tiết',
    gallery: 'Album',
    rsvp: 'Xác Nhận',
  };

return (
 <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
  {/* Rabbit Ears Navbar - macOS Inspired with Show/Hide Animation */}
<nav 
  className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out"
  style={{
    opacity: showNavbar ? 1 : 0,
    transform: `translateX(-50%) translateY(${showNavbar ? '0' : '-24px'})`,
    pointerEvents: showNavbar ? 'auto' : 'none',
  }}
>
  <div className="bg-white/80 backdrop-blur-xl border border-pink-200 shadow-lg rounded-3xl px-3 py-1.5">
    <div className="flex space-x-1.5">
      {Object.entries(sections).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setCurrentSection(key)}
          className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-200 font-medium whitespace-nowrap
            ${
              currentSection === key
                ? 'bg-pink-200 text-rose-700 shadow-inner'
                : 'bg-white/10 text-rose-900 hover:bg-pink-100 hover:text-rose-800'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
</nav>


  {currentSection === 'invitation' && <WeddingInvitation />}

  {/* Spacer để tránh nội dung bị đè bởi nav - chỉ khi navbar hiện */}
  {showNavbar && <div className="h-20" />}
  
  {/* Main Content */}
  {currentSection === 'details' && <WeddingDetails />}
  {currentSection === 'gallery' && <Gallery />}
  {currentSection === 'rsvp' && <MailForm />}

    {/* Audio Element */}
    <audio 
      ref={audioRef} 
      src="/wedding.mp3" 
      loop 
      preload="auto"
      volume="0.3"
    />

    {/* Floating Action Button - Music */}
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 ${
        isPlaying 
          ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white animate-pulse' 
          : 'bg-white text-rose-500 hover:bg-rose-50'
      } ${!hasUserInteracted ? 'ring-2 ring-rose-300 animate-bounce' : ''}`}
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