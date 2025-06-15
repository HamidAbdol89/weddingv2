import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

const Gallery = () => { 
  const weddingImages = [
    '13.png', '4.jpg', '9.jpg', '10.JPG', '11.JPG', '12.jpg', '8.jpg',
    '1.jpg', '2.jpg', '3.jpg', '5.JPG', '6.JPG', '7.JPG', '18.JPG', '19.JPG', '20.JPG', '21.JPG','background3.JPG'
    , '22.JPG' , '23.JPG' , '24.JPG' , '25.JPG' , '26.JPG', '27.JPG', '28.JPG'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);
  const imageRefs = useRef(new Map());
  const preloadedImages = useRef(new Map());

  // Parallax effect for header
  const headerY = useSpring(0, { stiffness: 100, damping: 30 });
  const headerOpacity = useTransform(headerY, [0, 100], [1, 0.8]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload ALL images before showing gallery
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const preloadAllImages = async () => {
      const promises = weddingImages.map((imageSrc, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/images/${imageSrc}`;
          img.loading = 'eager';
          img.decoding = 'sync'; // Đồng bộ để đảm bảo decode hoàn tất
          
          img.onload = () => {
            if (isMounted) {
              loadedCount++;
              preloadedImages.current.set(imageSrc, img);
              
              // Cập nhật progress
              const progress = Math.round((loadedCount / weddingImages.length) * 100);
              setLoadingProgress(progress);
              
              console.log(`Loaded ${loadedCount}/${weddingImages.length}: ${imageSrc}`);
            }
            resolve(img);
          };
          
          img.onerror = (error) => {
            console.error(`Failed to load image: ${imageSrc}`, error);
            if (isMounted) {
              loadedCount++;
              const progress = Math.round((loadedCount / weddingImages.length) * 100);
              setLoadingProgress(progress);
            }
            // Vẫn resolve để không block toàn bộ quá trình
            resolve(null);
          };
        });
      });

      try {
        await Promise.all(promises);
        
        if (isMounted) {
          console.log('All images preloaded successfully!');
          // Delay nhỏ để người dùng thấy 100%
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        if (isMounted) {
          setIsLoading(false); // Vẫn cho phép vào gallery nếu có lỗi
        }
      }
    };

    preloadAllImages();

    return () => {
      isMounted = false;
    };
  }, [weddingImages]);

  // Auto slideshow - chỉ chạy khi đã load xong và không có interaction
  useEffect(() => {
    if (!isUserInteracting && !fullscreenOpen && !isLoading) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isUserInteracting, fullscreenOpen, isLoading, weddingImages.length]);

  // Reset user interaction after delay
  useEffect(() => {
    if (isUserInteracting) {
      const timer = setTimeout(() => setIsUserInteracting(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isUserInteracting]);

  const navigateImage = useCallback((direction) => {
    setIsUserInteracting(true);
    setDragDirection(direction === 'next' ? 1 : -1);
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? weddingImages.length - 1 : prev - 1));
    }
  }, [weddingImages.length]);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStart.x || !touchStart.y) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touchStart.x - touch.clientX;
    
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        navigateImage('next');
      } else {
        navigateImage('prev');
      }
    }
    
    setTouchStart({ x: 0, y: 0 });
  }, [touchStart, navigateImage]);

  const handlePan = useCallback((event, info) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        navigateImage('prev');
      } else {
        navigateImage('next');
      }
    }
  }, [navigateImage]);

  // Optimized Image Component - sử dụng ảnh đã preload
  const ImageComponent = useMemo(() => {
    return React.memo(({ src, alt, className, style, onClick, ...props }) => {
      const preloadedImg = preloadedImages.current.get(src);
      
      return (
        <img
          src={preloadedImg ? preloadedImg.src : `/images/${src}`}
          alt={alt}
          className={className}
          style={{
            ...style,
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          loading="eager" // Đã preload rồi nên dùng eager
          decoding="sync"
          onClick={onClick}
          {...props}
        />
      );
    });
  }, []);

  // Enhanced animation variants with direction-aware transitions
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md mx-auto px-6"
        >
          {/* Logo hoặc Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl font-serif bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-4">
              Album Ảnh Cưới
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
          </motion.div>

          {/* Enhanced Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Spinning Ring */}
            <div className="relative w-20 h-20 mx-auto">
              <motion.div
                className="absolute inset-0 border-4 border-rose-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-rose-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-2 border-transparent border-t-pink-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-full shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Text */}
              <div className="text-gray-600 text-sm space-y-1">
                <div className="font-semibold text-rose-600">
                  {loadingProgress}% hoàn thành
                </div>
                <div className="text-xs">
                  Đang tải {Math.ceil((loadingProgress / 100) * weddingImages.length)}/{weddingImages.length} ảnh
                </div>
              </div>
            </div>

            {/* Loading Messages */}
            <motion.div
              key={Math.floor(loadingProgress / 25)} // Thay đổi message theo progress
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-500 text-sm font-medium"
            >
              {loadingProgress < 25 && "Đang chuẩn bị những khoảnh khắc đẹp nhất..."}
              {loadingProgress >= 25 && loadingProgress < 50 && "Đang tải những hình ảnh tuyệt vời..."}
              {loadingProgress >= 50 && loadingProgress < 75 && "Sắp hoàn tất, vui lòng đợi thêm chút..."}
              {loadingProgress >= 75 && loadingProgress < 100 && "Hoàn thiện những chi tiết cuối cùng..."}
              {loadingProgress === 100 && "Hoàn tất! Đang chuẩn bị hiển thị..."}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Enhanced Header with Parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          variants={itemVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-serif bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-4 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Album Ảnh Cưới
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-gray-600 mt-6 text-lg sm:text-xl font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Những khoảnh khắc đẹp nhất trong ngày trọng đại
          </motion.p>
        </motion.div>
        
        {/* Main Gallery Container */}
        <motion.div className="relative" variants={itemVariants}>
          {/* Main Image Display */}
          <motion.div 
            className="relative w-full h-[55vh] sm:h-[80vh] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-white/50"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <AnimatePresence mode="popLayout" custom={dragDirection} initial={false}>
                <motion.div
                  key={currentImageIndex}
                  custom={dragDirection}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handlePan}
                  style={{
                    willChange: 'transform'
                  }}
                >
                  <ImageComponent
                    src={weddingImages[currentImageIndex]}
                    alt={`Ảnh cưới ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center cursor-zoom-in select-none"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    onClick={() => setFullscreenOpen(true)}
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Gradient Overlays for Better Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Enhanced Navigation Controls */}
            {!isMobile && (
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="pointer-events-auto group bg-white/15 backdrop-blur-xl hover:bg-white/25 p-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8 text-white transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="pointer-events-auto group bg-white/15 backdrop-blur-xl hover:bg-white/25 p-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-8 h-8 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            )}

            {/* Mobile Swipe Indicator with Animation */}
            {isMobile && (
              <motion.div
                className="absolute bottom-16 left-0 right-0 flex items-center justify-center space-x-2 text-white/70 text-xs bg-black/20 backdrop-blur-md px-3 py-1 rounded-full mx-auto w-max"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [-10, 0, -10] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </motion.svg>
                <span className="font-medium">Vuốt để chuyển ảnh</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [10, 0, 10] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.div>
            )}

            {/* Enhanced Counter & Controls */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-black/30 backdrop-blur-xl text-white px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 shadow-lg">
                <span className="text-rose-300">{currentImageIndex + 1}</span>
                <span className="mx-2 text-white/60">/</span>
                <span className="text-white/80">{weddingImages.length}</span>
              </div>
              <motion.button
                onClick={() => setFullscreenOpen(true)}
                className="bg-white/15 backdrop-blur-xl hover:bg-white/25 p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg border border-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </motion.button>
              {/* Auto-play toggle */}
              <motion.button
                onClick={() => setIsUserInteracting(!isUserInteracting)}
                className={`backdrop-blur-xl p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg border border-white/10 ${
                  isUserInteracting ? 'bg-white/15 hover:bg-white/25' : 'bg-rose-500/80 hover:bg-rose-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isUserInteracting ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6l5-3-5-3z" />
                  )}
                </svg>
              </motion.button>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-black/20 to-black/10">
              <motion.div 
                className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 shadow-lg"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentImageIndex + 1) / weddingImages.length) * 100}%` 
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Thumbnail Grid */}
          <motion.div
            className="mt-12"
            variants={itemVariants}
          >
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {weddingImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-500 ${
                    index === currentImageIndex 
                      ? 'ring-4 ring-rose-400 shadow-xl scale-105 z-10' 
                      : 'hover:shadow-lg hover:scale-105 hover:ring-2 hover:ring-rose-200'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                  layoutId={`thumbnail-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10" />
                  <ImageComponent
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      index === currentImageIndex 
                        ? 'opacity-100 brightness-110' 
                        : 'opacity-80 hover:opacity-100 brightness-95 hover:brightness-105'
                    }`}
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16.67vw, 12.5vw"
                  />
                  {index === currentImageIndex && (
                    <motion.div 
                      className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Fullscreen Modal */}
          <AnimatePresence>
            {fullscreenOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                onClick={() => setFullscreenOpen(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <motion.button
                    onClick={() => setFullscreenOpen(false)}
                    className="absolute top-6 right-6 z-10 bg-white/10 backdrop-blur-xl hover:bg-white/20 p-4 rounded-2xl transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`fullscreen-${currentImageIndex}`}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="max-w-full max-h-full relative"
                      drag={isMobile ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handlePan}
                    >
                      <ImageComponent
                        src={weddingImages[currentImageIndex]}
                        alt={`Wedding photo ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl select-none"
                        sizes="100vw"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced Fullscreen Navigation */}
                  {!isMobile && (
                    <>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage('prev');
                        }}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-xl hover:bg-black/40 p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/20"
                        whileHover={{ x: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage('next');
                        }}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-xl hover:bg-black/40 p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/20"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </>
                  )}
                  
                 <motion.div
  className="absolute bottom-4 left-0 right-0 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  <div className="bg-black/40 backdrop-blur-xl text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20">
    <span className="text-rose-300">{currentImageIndex + 1}</span>
    <span className="mx-2 text-white/60">/</span>
    <span className="text-white/90">{weddingImages.length}</span>
  </div>
</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;