import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';

const WeddingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [textPhase, setTextPhase] = useState(0);
  
  // State cho animation khi scroll
  const [isVisible, setIsVisible] = useState({
    title: false,
    countdown: false,
    dateInfo: false,
    timeInfo: false,
    message: false
  });

  const containerRef = useRef(null);

  // Ngày cưới - Chủ Nhật, 13 Tháng 7, 2025 lúc 8:00 AM
  const weddingDate = new Date('2025-07-13T08:00:00');

  // Intersection Observer để detect khi component visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations theo thứ tự
            setTimeout(() => setIsVisible(prev => ({ ...prev, title: true })), 100);
            setTimeout(() => setIsVisible(prev => ({ ...prev, countdown: true })), 400);
            setTimeout(() => setIsVisible(prev => ({ ...prev, dateInfo: true })), 700);
            setTimeout(() => setIsVisible(prev => ({ ...prev, timeInfo: true })), 900);
            setTimeout(() => setIsVisible(prev => ({ ...prev, message: true })), 1100);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animation phases
    const timer = setTimeout(() => {
      setTextPhase(1);
      setTimeout(() => setTextPhase(2), 200);
      setTimeout(() => setTextPhase(3), 400);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const slideInRight = 'transition-all duration-700 ease-out transform';

  const TimeUnit = ({ value, label, delay, index }) => (
    <div className={`text-center ${slideInRight} ${
      isVisible.countdown && textPhase >= 2 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-6 opacity-0 scale-90'
    }`} style={{ transitionDelay: `${parseInt(delay) + index * 150}ms` }}>
      <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:-rotate-1">
        <div className="text-4xl xl:text-5xl font-bold bg-gradient-to-b from-white to-rose-100 bg-clip-text text-transparent drop-shadow-lg">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-base xl:text-lg text-rose-100 drop-shadow-lg mt-2 font-medium">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 p-8 flex items-center justify-center">
      <div ref={containerRef} className="space-y-8 max-w-4xl w-full">
        {/* Countdown Title */}
        <div className={`text-center ${slideInRight} ${
          isVisible.title && textPhase >= 1 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-6 opacity-0 scale-95'
        }`} style={{ transitionDelay: '0s' }}>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className={`w-10 h-10 text-rose-200 drop-shadow-lg transition-all duration-500 ${
              isVisible.title ? 'animate-pulse scale-100' : 'scale-0'
            }`} fill="currentColor" style={{ transitionDelay: '200ms' }} />
            <h3 className="text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
              Đếm ngược đến ngày cưới
            </h3>
            <Heart className={`w-10 h-10 text-rose-200 drop-shadow-lg transition-all duration-500 ${
              isVisible.title ? 'animate-pulse scale-100' : 'scale-0'
            }`} fill="currentColor" style={{ transitionDelay: '400ms' }} />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Ngày" delay="100" index={0} />
          <TimeUnit value={timeLeft.hours} label="Giờ" delay="100" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Phút" delay="100" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Giây" delay="100" index={3} />
        </div>

        {/* Wedding Date Info */}
        <div className="space-y-6 mt-12">
          {/* Date */}
          <div className={`flex items-center justify-center space-x-6 ${slideInRight} ${
            isVisible.dateInfo && textPhase >= 3 
              ? 'translate-x-0 opacity-100 rotate-0' 
              : '-translate-x-8 opacity-0 -rotate-1'
          }`} style={{ transitionDelay: '0.5s' }}>
            <div className="bg-gradient-to-br from-rose-500/30 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
              <Calendar className="w-10 h-10 text-rose-100 drop-shadow-lg" />
              <div className="text-center">
                <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg text-white">
                  Chủ Nhật, 13 Tháng 7, 2025
                </p>
                <p className="text-lg text-rose-100 drop-shadow-lg">
                  Ngày 17 tháng 6 năm Ất Tỵ
                </p>
              </div>
            </div>
          </div>

          {/* Time */}
          <div className={`flex items-center justify-center space-x-6 ${slideInRight} ${
            isVisible.timeInfo && textPhase >= 3 
              ? 'translate-x-0 opacity-100 rotate-0' 
              : 'translate-x-8 opacity-0 rotate-1'
          }`} style={{ transitionDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-purple-500/30 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
              <Clock className="w-10 h-10 text-purple-100 drop-shadow-lg" />
              <div className="text-center">
                <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg text-white">
                  Sáng 8:00 AM
                </p>
                <p className="text-lg text-purple-100 drop-shadow-lg">
                  Tại tư gia nhà gái
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Message */}
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
          <div className={`text-center transition-all duration-700 ease-out transform ${
            isVisible.message 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-90'
          }`}>
            <div className="bg-gradient-to-r from-rose-500/40 to-pink-600/40 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl animate-pulse">
              <p className="text-3xl xl:text-4xl font-bold text-white drop-shadow-lg mb-3">
                🎉 Chúc mừng ngày cưới! 🎉
              </p>
              <p className="text-xl text-rose-100 drop-shadow-lg">
                Hạnh phúc bên nhau trọn đời!
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                <Heart className="w-6 h-6 text-rose-200 animate-bounce" fill="currentColor" />
                <Heart className="w-6 h-6 text-pink-200 animate-bounce" fill="currentColor" style={{ animationDelay: '0.1s' }} />
                <Heart className="w-6 h-6 text-rose-200 animate-bounce" fill="currentColor" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingCountdown;