import React, { useState, useEffect } from 'react';
import {  MapPin, Clock, ChevronDown, Flower } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import PetalFalling from './PetalFalling';
import ScheduleSection from './components/Chitiet/ScheduleSection';
import FamilySection from './components/Chitiet/FamilySection';
import ThankYouSection from './components/Chitiet/ThankYouSection';

// Preloader Component
const Preloader = () => (
  <motion.div 
    className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 z-50 flex items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4"
      >
        <Flower className="w-full h-full text-rose-400" />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-rose-600 text-lg font-light">Đang chuẩn bị cho bạn...</p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-rose-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Map Loading Skeleton
const MapSkeleton = () => (
  <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse relative overflow-hidden">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ x: [-100, 400] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-gray-500 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Đang tải bản đồ...</p>
      </div>
    </div>
  </div>
);

// Dynamic import for heavy components
const DynamicMap = lazy(() => import('./components/Chitiet/Map'));

const WeddingDetails = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const yValue = useTransform(scrollYProgress, [0, 1], [0, -100]);

 useEffect(() => {
  const preloadAssets = async () => {
    try {
      const imageSources = [
        '/images/codau-chitiet.jpg',
        '/images/chure-chitiet.jpg',
      ];

      const imagePromises = imageSources.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          })
      );

      await Promise.all(imagePromises);

      // Minimum loading time for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setAssetsLoaded(true);
    } catch (error) {
      console.warn('Some assets failed to preload:', error);
      setAssetsLoaded(true);
    }
  };

  preloadAssets();
}, []);

  // Main initialization
  useEffect(() => {
    if (!assetsLoaded) return;

    const initializeApp = () => {
      // Set up intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, entry.target.id]));
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      // Observe sections
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach(section => observer.observe(section));

      // Finalize loading
      setIsLoaded(true);
      
      // Delay hiding preloader for smooth transition
      setTimeout(() => {
        setIsPreloading(false);
      }, 300);

      return () => observer.disconnect();
    };

    const cleanup = initializeApp();
    return cleanup;
  }, [assetsLoaded]);

  // Prevent scroll during preloading
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPreloading]);

  const getSectionClass = (sectionId) => {
    const isVisible = visibleSections.has(sectionId);
    return `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-12 scale-95'
    }`;
  };

  return (
    <>
      <AnimatePresence>
        {isPreloading && <Preloader />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <PetalFalling />

        {/* Enhanced floating background decorations with better mobile optimization */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: yValue }}
        >
          {/* Main gradient orbs with improved responsive sizing and positioning */}
          <motion.div 
            className="absolute top-16 sm:top-20 left-2 sm:left-10 w-40 sm:w-72 lg:w-96 h-40 sm:h-72 lg:h-96 bg-gradient-to-br from-pink-300/25 via-rose-200/20 to-purple-200/15 rounded-full blur-2xl sm:blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute top-48 sm:top-80 right-2 sm:right-16 w-28 sm:w-48 lg:w-64 h-28 sm:h-48 lg:h-64 bg-gradient-to-bl from-violet-300/30 via-purple-200/25 to-indigo-200/20 rounded-full blur-xl sm:blur-2xl"
            animate={{
              scale: [1, 0.9, 1.05, 1],
              opacity: [0.7, 0.9, 0.5, 0.7],
              x: [0, 10, -5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <motion.div 
            className="absolute bottom-28 sm:bottom-40 left-1/12 sm:left-1/6 w-36 sm:w-60 lg:w-80 h-36 sm:h-60 lg:h-80 bg-gradient-to-tr from-cyan-300/25 via-blue-200/20 to-teal-200/15 rounded-full blur-2xl sm:blur-3xl"
            animate={{
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.5, 0.75, 0.6, 0.5],
              rotate: [0, -15, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          
          <motion.div 
            className="absolute bottom-8 sm:bottom-20 right-1/6 sm:right-1/4 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-gradient-to-tl from-amber-300/25 via-yellow-200/20 to-orange-200/15 rounded-full blur-xl sm:blur-2xl"
            animate={{
              scale: [1, 1.2, 1.05, 1],
              opacity: [0.6, 0.4, 0.8, 0.6],
              y: [0, -8, 4, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
          />

          {/* Enhanced floating particles with better mobile performance */}
          {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 24)].map((_, i) => {
            const colors = [
              'bg-gradient-to-r from-pink-400 to-rose-400',
              'bg-gradient-to-r from-violet-400 to-purple-400', 
              'bg-gradient-to-r from-blue-400 to-cyan-400',
              'bg-gradient-to-r from-amber-400 to-orange-400',
              'bg-gradient-to-r from-emerald-400 to-teal-400',
              'bg-gradient-to-r from-fuchsia-400 to-pink-400'
            ];
            
            return (
              <motion.div
                key={i}
                className={`absolute w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full ${colors[i % colors.length]} shadow-lg`}
                style={{
                  top: `${Math.random() * 85 + 5}%`,
                  left: `${Math.random() * 90 + 5}%`,
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  y: [0, -30 - Math.random() * 20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 180 + Math.random() * 180, 360],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 6 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            );
          })}

          {/* Subtle light rays effect */}
          <motion.div
            className="absolute top-1/4 left-1/2 w-px h-32 sm:h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2 rotate-12"
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div
            className="absolute top-3/4 right-1/3 w-px h-20 sm:h-32 bg-gradient-to-t from-transparent via-white/15 to-transparent transform rotate-45"
            animate={{
              opacity: [0, 0.4, 0],
              scaleY: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          {/* Subtle grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 to-transparent"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
          
          {/* Header */}
          <motion.div 
            className="relative py-28 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: isLoaded ? 0.2 : 0 }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-200/20 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100/20 blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            <div className="max-w-6xl mx-auto px-6 text-center">
              {/* Floral Decoration */}
              <motion.div
                className="flex justify-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
                transition={{ delay: isLoaded ? 0.5 : 0, duration: 0.8 }}
              >
                <Flower className="w-10 h-10 text-rose-300 rotate-12 mr-4" />
                <Flower className="w-8 h-8 text-rose-200 -rotate-6" />
              </motion.div>

              {/* Main Title */}
              <motion.div
                className="relative inline-block mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: isLoaded ? 0.7 : 0 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light tracking-wider text-rose-800 mb-6 leading-tight">
                  Hành Trình <span className="italic font-normal">Tình Yêu</span>
                </h1>
                
                {/* Elegant Underline */}
                <motion.div 
                  className="relative"
                  initial={{ width: 0 }}
                  animate={{ width: isLoaded ? "100%" : 0 }}
                  transition={{ delay: isLoaded ? 1.0 : 0, duration: 1.2, ease: "easeOut" }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent w-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-rose-500" />
                </motion.div>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                className="text-xl sm:text-2xl font-light text-rose-900/80 max-w-3xl mx-auto leading-relaxed mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: isLoaded ? 1.2 : 0, duration: 0.8 }}
              >
                "Những khoảnh khắc đáng nhớ trong ngày trọng đại của chúng tôi <br className="hidden sm:block" /> 
                sẽ càng ý nghĩa hơn khi có sự chứng kiến của những trái tim yêu thương"
              </motion.p>

              {/* Animated Scroll Indicator */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ delay: isLoaded ? 1.5 : 0, duration: 0.8 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <ChevronDown className="w-8 h-8 text-rose-400" />
                </motion.div>
                <span className="text-sm text-rose-500 mt-2">Khám phá thêm</span>
              </motion.div>
            </div>
          </motion.div>

          {/* THÔNG TIN GIA ĐÌNH */}
         <FamilySection 
  getSectionClass={getSectionClass} 
  isPreloading={isPreloading}
/>

          {/* LỊCH TRÌNH LỄ CƯỚI */}
          <ScheduleSection getSectionClass={getSectionClass} />

          {/* ĐỊA ĐIỂM HÔN LỄ - MAP */}
          <motion.div 
            id="location"
            data-animate
            className={`mb-24 sm:mb-36 ${getSectionClass('location')}`}
            whileHover={{ 
              scale: 1.003,
              transition: { type: "tween", stiffness: 140, damping: 20 }
            }}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">
                Địa Điểm Hôn Lễ
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Xem bản đồ để dễ dàng tìm đường đến dự lễ cưới của chúng tôi
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <Suspense fallback={<MapSkeleton />}>
                <DynamicMap />
              </Suspense>
            </div>
            
            <div className="flex justify-center mt-12">
              <motion.div 
                className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg"
                whileHover={{ 
                  y: -3,
                  transition: { type: "tween", stiffness: 140, damping: 20 }
                }}
              >
                <h4 className="text-2xl font-bold text-pink-800 mb-4">Tại nhà gái</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-pink-600 mt-1" />
                    <p className="text-gray-700">Số nhà 232, Tổ 3, Ấp Châu Giang, Xã Châu Phong</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-pink-600 mt-1" />
                    <p className="text-gray-700">Sáng 8:00 AM, 13/07</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Thank You */}
          <ThankYouSection getSectionClass={getSectionClass} />

        </div>
      </motion.div>
    </>
  );
};

export default WeddingDetails;