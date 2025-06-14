import React, { useState, useEffect } from 'react';
import { Heart, Users, Calendar, MapPin, Clock, Home, Sparkles, Star, Gift } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lazy } from 'react';

// Dynamic import for heavy components
const DynamicMap = lazy(() => import('./WeddingMap'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
});

const WeddingDetails = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const yValue = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

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

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const getSectionClass = (sectionId) => {
    const isVisible = visibleSections.has(sectionId);
    return `transition-all duration-1000 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-12 scale-95'
    }`;
  };

  

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background decorations with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: yValue }}
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-80 right-20 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/25 to-cyan-200/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        
        {/* Subtle confetti elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#f43f5e', '#8b5cf6', '#3b82f6', '#f59e0b'][Math.floor(Math.random() * 4)],
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-20 sm:mb-32"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 relative leading-tight">
              Chi Tiết Lễ Cưới
              <motion.div 
                className="absolute -top-4 -right-12 flex space-x-2"
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <Star className="w-6 h-6 text-pink-400" />
              </motion.div>
            </h1>
            <div className="flex justify-center space-x-2 mb-6">
              <motion.div 
                className="w-16 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <motion.div 
                className="w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <motion.div 
                className="w-4 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </div>
          </div>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Một ngày thiêng liêng đầy ý nghĩa với sự hiện diện của gia đình và bạn bè thân yêu
          </motion.p>
        </motion.div>

      {/* Family Information - Floating Layout */}
<motion.div 
  id="families"
  data-animate
  className={`mb-24 sm:mb-36 ${getSectionClass('families')}`}
  transition={{ type: 'tween', stiffness: 120, damping: 26 }}
>
  <div className="text-center mb-16 sm:mb-20">
    <h2 className="text-4xl sm:text-5xl font-serif bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
      Thông Tin Gia Đình
    </h2>
    <motion.div 
      className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />
  </div>
  
  <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
 {/* Nhà Trai */}
<motion.div 
  className="relative"
  whileHover={{ y: -1, boxShadow: '0 3px 8px rgba(0,0,0,0.05)' }}
  transition={{ type: "tween", stiffness: 120, damping: 26 }}
>
  <div className="text-center mb-12">
    <motion.div 
      className="inline-flex items-center justify-center  bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-2xl overflow-hidden"
      whileHover={{ rotate: 5, scale: 1.05 }}
      transition={{ type: "tween", stiffness: 140, damping: 22 }}
    >
      {/* Thay thế icon Home bằng hình ảnh */}
      <img 
        src="/images/chure-chitiet.jpg" 
        alt="Nhà trai" 
        className="w-full h-full object-cover"
        style={{ width: '120px', height: '120px' }}
      />
    </motion.div>
    <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      Nhà Trai
    </h3>
  </div>
  
  <div className="space-y-8">
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "tween", stiffness: 120, damping: 24 }}
    >
      <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-6 rounded-2xl shadow-2xl mb-6">
        <p className="text-xl font-bold mb-2">Cha: HJ. ALY</p>
        <p className="text-xl font-bold">Mẹ: HJ. MA RI GIAH</p>
      </div>
    </motion.div>
    
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "tween", stiffness: 120, damping: 24 }}
    >
      <div className="inline-flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6 rounded-2xl shadow-lg">
        <MapPin className="w-6 h-6 text-blue-600 mt-1" />
        <div className="text-left">
          <p className="text-lg font-semibold text-gray-800 mb-1">Số nhà 218, Tổ 6</p>
          <p className="text-gray-700">Ấp Phũm Soài, Xã Châu Phong</p>
          <p className="text-gray-700">TX Tân Châu, Tỉnh An Giang</p>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>

  {/* Nhà Gái */}
<motion.div 
  className="relative"
  whileHover={{ y: -1, boxShadow: '0 3px 8px rgba(0,0,0,0.05)' }}
  transition={{ type: "tween", stiffness: 120, damping: 26 }}
>
  <div className="text-center mb-12">
    <motion.div 
      className="inline-flex items-center justify-center  bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-6 shadow-2xl overflow-hidden"
      whileHover={{ rotate: -5, scale: 1.05 }}
      transition={{ type: "tween", stiffness: 140, damping: 22 }}
    >
      {/* Thay thế icon Home bằng hình ảnh nhà gái */}
      <img 
        src="/images/codau-chitiet.jpg" 
        alt="Nhà gái" 
        className="w-full h-full object-cover"
          style={{ width: '120px', height: '120px' }}
      />
    </motion.div>
    <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
      Nhà Gái
    </h3>
  </div>
  
  <div className="space-y-8">
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "tween", stiffness: 120, damping: 24 }}
    >
      <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-6 rounded-2xl shadow-2xl mb-6">
        <p className="text-xl font-bold mb-2">Cha: HJ. ABD HALIEM</p>
        <p className="text-xl font-bold">Mẹ: HJ. HA LY MAH</p>
      </div>
    </motion.div>
    
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "tween", stiffness: 120, damping: 24 }}
    >
      <div className="inline-flex items-start space-x-4 bg-gradient-to-r from-pink-50 to-rose-50 px-8 py-6 rounded-2xl shadow-lg">
        <MapPin className="w-6 h-6 text-pink-600 mt-1" />
        <div className="text-left">
          <p className="text-lg font-semibold text-gray-800 mb-1">Số nhà 232, Tổ 3</p>
          <p className="text-gray-700">Ấp Châu Giang, Xã Châu Phong</p>
          <p className="text-gray-700">TX Tân Châu, Tỉnh An Giang</p>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>
  </div>
</motion.div>


      {/* Wedding Schedule - Flow Layout */}
<motion.div 
  id="schedule"
  data-animate
  className={`mb-24 sm:mb-36 ${getSectionClass('schedule')}`}
  whileHover={{ scale: 1.003 }}
  transition={{ type: "tween", stiffness: 140, damping: 20 }}
>
  <div className="text-center mb-16 sm:mb-20">
    <h2 className="text-4xl sm:text-5xl font-serif bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
      Lịch Trình Lễ Cưới
    </h2>
    <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
      Hai ngày thiêng liêng với những nghi thức truyền thống đầy ý nghĩa
    </p>
  </div>
  
  <div className="space-y-16 sm:space-y-24">
    {/* Ngày đầu tiên - Floating Timeline */}
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.003 }}
      transition={{ type: "tween", stiffness: 140, damping: 20 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-right">
          <div className="inline-block mb-8">
            <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent opacity-20">
              01
            </div>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "tween", stiffness: 140, damping: 20 }}
            >
              <Heart className="w-8 h-8" />
              <span className="text-2xl font-bold">Ngày Đầu Tiên</span>
            </motion.div>
            
            <div className="space-y-4">
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: 3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Calendar className="w-6 h-6 text-rose-600" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-800">Thứ 7, 12 Tháng 7</p>
                  <p className="text-sm text-gray-600">Nhằm ngày 18 tháng 6 năm Ất Tỵ</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: 3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Clock className="w-6 h-6 text-rose-600" />
                <span className="text-lg font-semibold text-gray-800">Tối 7:00 PM</span>
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: 3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Home className="w-6 h-6 text-rose-600" />
                <span className="text-lg font-semibold text-gray-800">Tại tư gia - Nhà Trai</span>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <motion.div 
            className="w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              type: "tween",
              stiffness: 140,
              damping: 20
            }}
          />
        </div>
        
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-12 py-8 rounded-3xl shadow-2xl transform rotate-2"
            whileHover={{ rotate: 3, scale: 1.01 }}
            animate={{
              rotate: [1, -1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              type: "tween",
              stiffness: 140,
              damping: 20
            }}
          >
            <div className="text-6xl mb-4">🌙</div>
            <p className="text-2xl font-bold">Đêm vui hát</p>
            <p className="text-lg opacity-90 mt-2">Đêm chiêu đãi</p>
          </motion.div>
        </div>
      </div>
    </motion.div>

    {/* Ngày thứ hai - Floating Timeline */}
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.003 }}
      transition={{ type: "tween", stiffness: 140, damping: 20 }}
    >
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block mb-8">
            <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent opacity-20">
              02
            </div>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "tween", stiffness: 140, damping: 20 }}
            >
              <Users className="w-8 h-8" />
              <span className="text-2xl font-bold">Ngày Thứ Hai</span>
            </motion.div>
            
            <div className="space-y-4">
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: -3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Calendar className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-800">Chủ Nhật, 13 Tháng 7</p>
                  <p className="text-sm text-gray-600">Nhằm ngày 19 tháng 6 năm Ất Tỵ</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: -3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Clock className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-semibold text-gray-800">Sáng 8:00 AM</span>
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-3 rounded-xl shadow-lg"
                whileHover={{ x: -3 }}
                transition={{ type: "tween", stiffness: 140, damping: 20 }}
              >
                <Home className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-semibold text-gray-800">Tại tư gia - Hôn lễ chính thức</span>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <motion.div 
            className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              type: "tween",
              stiffness: 140,
              damping: 20,
              delay: 0.5
            }}
          />
        </div>
        
        <div className="flex-1 text-center lg:text-right">
          <motion.div 
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-12 py-8 rounded-3xl shadow-2xl transform -rotate-2"
            whileHover={{ rotate: -3, scale: 1.01 }}
            animate={{
              rotate: [-1, 1, -1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              type: "tween",
              stiffness: 140,
              damping: 20,
              delay: 0.5
            }}
          >
            <div className="text-6xl mb-4">☀️</div>
            <p className="text-2xl font-bold">Lễ Thành Hôn</p>
            <p className="text-lg opacity-90 mt-2">Nghi thức chính thức</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>
    {/* Interactive Map Section */}
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
    <DynamicMap />
  </div>
  
  <div className="grid md:grid-cols-2 gap-8 mt-12">
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg"
      whileHover={{ 
        y: -3,
        transition: { type: "tween", stiffness: 140, damping: 20 }
      }}
    >
      <h4 className="text-2xl font-bold text-blue-800 mb-4">Nhà Trai</h4>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-6 h-6 text-blue-600 mt-1" />
          <p className="text-gray-700">Số nhà 218, Tổ 6, Ấp Phũm Soài, Xã Châu Phong</p>
        </div>
        <div className="flex items-start space-x-3">
          <Clock className="w-6 h-6 text-blue-600 mt-1" />
          <p className="text-gray-700">Tối 7:00 PM, 12/07</p>
        </div>
      </div>
    </motion.div>
    
    <motion.div 
      className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg"
      whileHover={{ 
        y: -3,
        transition: { type: "tween", stiffness: 140, damping: 20 }
      }}
    >
      <h4 className="text-2xl font-bold text-pink-800 mb-4">Nhà Gái</h4>
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
      

     

       {/* Thank You Message - Hero Style */}
<motion.div 
  id="thanks"
  data-animate
  className={`${getSectionClass('thanks')}`}
  whileHover={{ scale: 1.003, x: 0 }}
>
  <div className="text-center relative">
    <motion.div 
      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full mb-8 shadow-2xl mx-auto"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 3, -3, 0] // Reduced rotation from ±10 to ±3
      }}
      transition={{
        type: "tween",
        stiffness: 140,
        damping: 20,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <Heart className="w-12 h-12 text-white" />
    </motion.div>
    
    <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-8">
      Lời Cảm Ơn Chân Thành
    </h3>
    
    <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
      Sự hiện diện của quý vị sẽ làm cho ngày đặc biệt của chúng tôi trở nên ý nghĩa và trọn vẹn hơn. 
      Chúng tôi rất mong được chia sẻ niềm hạnh phúc thiêng liêng này cùng với gia đình và bạn bè thân yêu!
    </p>
    
    <motion.div 
      className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-8 py-4 rounded-full shadow-2xl"
      whileHover={{ scale: 1.005 }} // Reduced from 1.05 to 1.005
      animate={{
        boxShadow: [
          "0 20px 25px -5px rgba(244, 63, 94, 0.3), 0 10px 10px -5px rgba(244, 63, 94, 0.2)",
          "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.2)",
          "0 20px 25px -5px rgba(244, 63, 94, 0.3), 0 10px 10px -5px rgba(244, 63, 94, 0.2)"
        ],
        x: [0, 1, -1, 0] // Added subtle x movement (±3 would be too much, so using ±1)
      }}
      transition={{
        type: "tween",
        stiffness: 140,
        damping: 20,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <Sparkles className="w-6 h-6" />
      <span className="text-lg font-semibold">Cảm ơn sự quan tâm và chúc mừng của mọi người</span>
      <Sparkles className="w-6 h-6" />
    </motion.div>
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default WeddingDetails;