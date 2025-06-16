import React, { useState, useEffect, useRef } from 'react';

const WeddingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const weddingDate = new Date('2025-07-13T08:00:00');

  // Intersection Observer để tạo hiệu ứng khi vào viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cập nhật đồng hồ đếm ngược mỗi giây
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const HeartTimeUnit = ({ value, label }) => (
    <div
      className={`relative w-36 h-36 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      {/* SVG trái tim - vừa phải */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 drop-shadow-lg"
        style={{
          fill: 'rgba(255, 255, 255, 0.95)',
          transform: 'scale(1.5)',
          transformOrigin: 'center',
        }}
      >
        <path d="M100,40 C80,15 40,25 40,60 C40,90 100,140 100,140 C100,140 160,90 160,60 C160,25 120,15 100,40 Z" />
      </svg>

      {/* Nội dung nằm ở trung tâm trái tim */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-3xl font-bold text-rose-700 leading-none">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-rose-600 font-medium mt-1">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-300 mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-300 mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-rose-200 mix-blend-multiply filter blur-2xl animate-pulse" />
      </div>

      <div ref={containerRef} className="space-y-16 max-w-4xl w-full z-10">
        {/* Tiêu đề */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-5xl font-light text-rose-900 tracking-wide mb-4">
            Đếm ngược đến ngày trọng đại
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto my-6"></div>
          <p className="text-xl text-rose-800/80 font-light">
            Dành cho cô dâu xinh đẹp của chúng ta
          </p>
        </div>

        {/* Countdown Timer */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
            <HeartTimeUnit value={timeLeft.days} label="Ngày" />
            <HeartTimeUnit value={timeLeft.hours} label="Giờ" />
            <HeartTimeUnit value={timeLeft.minutes} label="Phút" />
            <HeartTimeUnit value={timeLeft.seconds} label="Giây" />
          </div>
        </div>

   

        {/* Special Message when countdown ends */}
        {Object.values(timeLeft).every((val) => val === 0) && (
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl p-8 max-w-lg mx-auto shadow-xl border border-rose-200/50">
              <div className="text-4xl mb-4">💕</div>
              <h2 className="text-3xl font-light text-rose-800 mb-4">
                Chúc mừng ngày cưới!
              </h2>
              <p className="text-xl text-rose-700 font-light">
                Hạnh phúc trọn đời bên nhau
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingCountdown;