import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => { 
  const weddingImages = [
    '13.png', '4.jpg', '9.jpg', '10.JPG', '11.JPG', '12.jpg', '8.jpg',
    '1.jpg', '2.jpg', '3.jpg', '5.JPG', '6.JPG', '7.JPG',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const imageRefs = useRef(new Map());
  const preloadedImages = useRef(new Map());

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImage = (src) => {
      if (!preloadedImages.current.has(src)) {
        const img = new Image();
        img.src = `/images/${src}`;
        img.loading = 'eager';
        img.decoding = 'async';
        
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, src]));
          preloadedImages.current.set(src, img);
        };
      }
    };

    // Preload current and next/prev images
    const indicesToPreload = [
      currentImageIndex,
      (currentImageIndex + 1) % weddingImages.length,
      currentImageIndex === 0 ? weddingImages.length - 1 : currentImageIndex - 1
    ];

    indicesToPreload.forEach(index => {
      preloadImage(weddingImages[index]);
    });
  }, [currentImageIndex, weddingImages]);

  // Auto-play with pause on interaction
  useEffect(() => {
    if (!isUserInteracting && !fullscreenOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
      }, 5000); // Increased to 5s for better mobile UX
      return () => clearInterval(interval);
    }
  }, [isUserInteracting, fullscreenOpen, weddingImages.length]);

  // Reset user interaction flag
  useEffect(() => {
    if (isUserInteracting) {
      const timer = setTimeout(() => setIsUserInteracting(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isUserInteracting]);

  const navigateImage = useCallback((direction) => {
    setIsUserInteracting(true);
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? weddingImages.length - 1 : prev - 1));
    }
  }, [weddingImages.length]);

  // Touch handlers for swipe gestures
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStart.x || !touchStart.y) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = touchStart.y - touch.clientY;
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        navigateImage('next');
      } else {
        navigateImage('prev');
      }
    }
    
    setTouchStart({ x: 0, y: 0 });
  }, [touchStart, navigateImage]);

  // Pan gesture handler for smooth drag
  const handlePan = useCallback((event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        navigateImage('prev');
      } else {
        navigateImage('next');
      }
    }
  }, [navigateImage]);

  // Memoized image component for better performance
  const ImageComponent = useMemo(() => {
    return React.memo(({ src, alt, className, style, onClick, ...props }) => (
      <img
        src={`/images/${src}`}
        alt={alt}
        className={className}
        style={{
          transform: 'translate3d(0,0,0)',
          willChange: 'transform, opacity',
          imageRendering: 'crisp-edges',
          WebkitImageSmoothing: 'high',
          imageSmoothing: 'high',
          filter: 'none',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          ...style
        }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onClick={onClick}
        {...props}
      />
    ));
  }, []);

  // Optimized motion variants
  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-16">
      <h2 className="text-2xl sm:text-5xl font-serif text-center bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-6 sm:mb-12 tracking-wide">
        Album Ảnh Cưới
      </h2>
      
      {/* Main Gallery Container */}
      <div className="relative">
        {/* Main Image Display - Mobile Optimized */}
        <div 
          className="relative w-full h-[50vh] sm:h-[75vh] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handlePan}
                whileDrag={{ scale: 0.95 }}
              >
                <ImageComponent
                  src={weddingImages[currentImageIndex]}
                  alt={`Ảnh cưới ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl cursor-zoom-in select-none"
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
          
          {/* Navigation Controls - Mobile Optimized */}
          {!isMobile && (
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="pointer-events-auto group bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 opacity-70 hover:opacity-100"
              >
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-white transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="pointer-events-auto group bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 opacity-70 hover:opacity-100"
              >
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile Swipe Indicator */}
          {isMobile && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-white/60 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Vuốt để chuyển ảnh</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}

          {/* Counter & Fullscreen Button */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 sm:space-x-3">
            <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium">
              {currentImageIndex + 1} / {weddingImages.length}
            </div>
            <button
              onClick={() => setFullscreenOpen(true)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-black/15">
            <motion.div 
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentImageIndex + 1) / weddingImages.length) * 100}%` 
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
            />
          </div>
        </div>

        {/* Thumbnail Grid - Mobile Optimized */}
        <div className="mt-6 sm:mt-12">
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-4">
            {weddingImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'ring-2 sm:ring-3 ring-rose-500 shadow-lg scale-105' 
                    : 'hover:shadow-md hover:scale-105'
                }`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                <ImageComponent
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  sizes="(max-width: 640px) 16.67vw, (max-width: 1024px) 12.5vw, 10vw"
                />
                {index === currentImageIndex && (
                  <motion.div 
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-rose-500 rounded-full border border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Fullscreen Modal - Mobile Optimized */}
        <AnimatePresence>
          {fullscreenOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95"
              onClick={() => setFullscreenOpen(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                <button
                  onClick={() => setFullscreenOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`fullscreen-${currentImageIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-full max-h-full"
                    drag={isMobile ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handlePan}
                  >
                    <ImageComponent
                      src={weddingImages[currentImageIndex]}
                      alt={`Wedding photo ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-2xl sm:rounded-3xl shadow-2xl select-none"
                      sizes="100vw"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Fullscreen Navigation - Desktop Only */}
                {!isMobile && (
                  <>
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
                  </>
                )}
                
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base">
                  {currentImageIndex + 1} / {weddingImages.length}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;