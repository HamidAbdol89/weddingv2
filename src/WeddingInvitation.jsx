import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Clock } from 'lucide-react';
import WeddingPhotosScroll from './WeddingPhotosScroll';
import WeddingCountdown from './WeddingCountdown';

const WeddingInvitation = () => {
 const [currentSection, setCurrentSection] = useState('invitation');
 const [isVisible, setIsVisible] = useState(false);
 const [textPhase, setTextPhase] = useState(0);
 const [showOverlay, setShowOverlay] = useState(false);
 const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

 useEffect(() => {
   const handleResize = () => {
     setIsDesktop(window.innerWidth >= 1024);
   };

   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 // Tạo snowflakes
 const generateSnowflakes = () => {
   const snowflakes = [];
   for (let i = 0; i < 50; i++) {
     snowflakes.push({
       id: i,
       left: Math.random() * 100,
       animationDelay: Math.random() * 3,
       animationDuration: 3 + Math.random() * 4,
       opacity: 0.1 + Math.random() * 0.4,
       size: 2 + Math.random() * 4
     });
   }
   return snowflakes;
 };

 const [snowflakes] = useState(generateSnowflakes());

 // Danh sách ảnh background cho desktop và mobile
 const desktopImages = [
   '/images/background.JPG',
   '/images/background3.JPG',
      '/images/15.JPG', 
   '/images/background2.JPG'
 ];
 
 const mobileImages = [
    '/images/background.JPG',
     '/images/9.jpg', 
    '/images/16.JPG',
     
   '/images/background2.JPG'
 ];

  // Chọn danh sách ảnh phù hợp
 const backgroundImages = isDesktop ? desktopImages : mobileImages;

 useEffect(() => {
   setIsVisible(true);
   
   // Sequence animation cho text và ảnh - đồng bộ hoàn toàn
   const phases = [
     () => {
       setTextPhase(1); // Names appear
     },
     () => {
       setTextPhase(2); // Invitation text  
     },
     () => {
       setTextPhase(3); // Details
     },
     () => {
       setTextPhase(4); // Quote
     },
     () => {
       // Cycle: hide all, change image, and restart
       setTextPhase(0);
       setTimeout(() => setShowOverlay(true), 300);
       setTimeout(() => {
         setShowOverlay(false);
         // Chuyển sang ảnh tiếp theo
         setCurrentImageIndex(prev => (prev + 1) % (isDesktop ? desktopImages.length : mobileImages.length));
       }, 1500);
     }
   ];

   const intervals = [];
   // Thời gian mỗi phase: 2 giây
   phases.forEach((phase, index) => {
     intervals.push(setTimeout(phase, (index + 1) * 2000));
   });

   // Repeat cycle - mỗi chu kỳ hoàn chỉnh 12 giây (4 phase * 2s + 2s transition)
   const cycleInterval = setInterval(() => {
     phases.forEach((phase, index) => {
       setTimeout(phase, index * 2000);
     });
   }, 12000);

      return () => {
     intervals.forEach(clearTimeout);
     clearInterval(cycleInterval);
   };
 }, [isDesktop]);

 // Cải thiện animation classes - nhanh hơn và mượt hơn
 const fadeInUp = "transition-all duration-600 ease-out";
 const slideInRight = "transition-all duration-700 ease-out";
 const bounceIn = "transition-all duration-500 ease-out";

 return (
   <div className="min-h-screen bg-gray-50 relative overflow-hidden">
     {/* Snow Effect */}
     <div className="fixed inset-0 pointer-events-none z-10">
       {snowflakes.map((snowflake) => (
         <div
           key={snowflake.id}
           className="snowflake absolute w-1 h-1 bg-white rounded-full animate-snow"
           style={{
             left: `${snowflake.left}%`,
             animationDelay: `${snowflake.animationDelay}s`,
             animationDuration: `${snowflake.animationDuration}s`,
             opacity: snowflake.opacity,
             width: `${snowflake.size}px`,
             height: `${snowflake.size}px`,
           }}
         />
       ))}
     </div>

     {/* Main Content */}
     <div className="pt-16">
       {currentSection === 'invitation' && (
         <div className="relative">
           {/* Background Images with Smooth Transition - Desktop */}
           <div className="h-screen relative overflow-hidden">
             {/* Desktop Background Images */}
             <div className="hidden lg:block">
               {desktopImages.map((image, index) => (
                 <div
                   key={`desktop-${index}`}
                   className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000 ${
                     index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                   }`}
                   style={{
                     backgroundImage: `url('${image}')`,
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover',
                     filter: showOverlay ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
                     transitionDelay: index === currentImageIndex ? '0ms' : '500ms'
                   }}
                 />
               ))}
             </div>

             {/* Mobile Background Images */}
             <div className="lg:hidden">
               {mobileImages.map((image, index) => (
                 <div
                   key={`mobile-${index}`}
                   className={`absolute inset-0 bg-cover bg-no-repeat mobile-bg transition-all duration-1000 ${
                     index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                   }`}
                   style={{
                     backgroundImage: `url('${image}')`,
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover',
                     filter: showOverlay ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
                     transitionDelay: index === currentImageIndex ? '0ms' : '500ms'
                   }}
                 />
               ))}
             </div>
             
             {/* Dynamic Gradient Overlay */}
             <div className={`absolute inset-0 transition-all duration-1500 ${
               textPhase === 0 ? 'bg-black/20' : 
               'bg-black/30 lg:bg-gradient-to-l lg:from-black/60 lg:via-transparent lg:to-transparent'
             }`}></div>
             
             {/* Floating Hearts Animation */}
             <div className="absolute inset-0 pointer-events-none">
               {[...Array(6)].map((_, i) => (
                 <Heart 
                   key={i}
                   className={`absolute w-4 h-4 text-white/20 animate-pulse transition-opacity duration-1000 ${
                     textPhase > 0 ? 'opacity-30' : 'opacity-0'
                   }`}
                   style={{
                     left: `${20 + i * 15}%`,
                     top: `${10 + i * 10}%`,
                     animationDelay: `${i * 0.3}s`,
                     animationDuration: '2.5s'
                   }}
                 />
               ))}
             </div>

             {/* Image Indicator - Hiển thị ảnh hiện tại */}
             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
               {(isDesktop ? desktopImages : mobileImages).map((_, index) => (
                 <div
                   key={index}
                   className={`w-2 h-2 rounded-full transition-all duration-500 ${
                     index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                   }`}
                 />
               ))}
             </div>
           </div>

           {/* Text Overlay - Responsive Positioning */}
           <div className="absolute inset-0 flex items-center pointer-events-none">
             {/* Desktop: Right Side */}
             <div className="hidden lg:flex lg:justify-end lg:pr-20 xl:pr-32 w-full">
               <div className="text-right space-y-6 max-w-2xl">
                 
                 {/* Decorative Header */}
                 <div className={`flex justify-end mb-8 ${fadeInUp} ${
                   textPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                 }`}>
                   <div className="flex items-center space-x-3">
                     <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/60 transition-all duration-700"></div>
                     <Heart className="w-8 h-8 text-white animate-pulse drop-shadow-lg" />
                     <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/60 transition-all duration-700"></div>
                   </div>
                 </div>

                 {/* Couple Names - Staggered Animation */}
                 <div className="mb-12">
                   <h1 className={`text-7xl xl:text-8xl font-serif text-white mb-4 tracking-wide drop-shadow-2xl ${slideInRight} ${
                     textPhase >= 1 ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                   }`} style={{ transitionDelay: '0.1s' }}>
                     DUSÔ
                   </h1>
                   <div className={`flex items-center justify-end my-6 ${fadeInUp} ${
                     textPhase >= 1 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                   }`} style={{ transitionDelay: '0.2s' }}>
                     <div className="w-16 h-0.5 bg-white/60"></div>
                     <span className="mx-4 text-white text-3xl font-light drop-shadow-lg">&</span>
                     <div className="w-16 h-0.5 bg-white/60"></div>
                   </div>
                   <h1 className={`text-7xl xl:text-8xl font-serif text-white tracking-wide drop-shadow-2xl ${slideInRight} ${
                     textPhase >= 1 ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                   }`} style={{ transitionDelay: '0.3s' }}>
                     HASIKIN
                   </h1>
                 </div>

                 {/* Invitation Text */}
                 <div className={`mb-10 ${bounceIn} ${
                   textPhase >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
                 }`} style={{ transitionDelay: '0.1s' }}>
                   <p className="text-2xl xl:text-3xl text-white leading-relaxed font-light drop-shadow-lg">
                     Trân trọng kính mời bạn tham dự
                   </p>
                   <p className="text-3xl xl:text-4xl text-white font-medium mt-3 drop-shadow-lg">
                     Lễ Cưới của chúng tôi
                   </p>
                 </div>

                 {/* Wedding Details - Staggered */}
                 <div className="space-y-4 text-white">
                   {/* Date */}
                   <div className={`flex items-center justify-end space-x-4 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                   }`} style={{ transitionDelay: '0.05s' }}>
                     <div className="text-right">
                       <p className="text-2xl xl:text-3xl font-medium drop-shadow-lg">
                         Chủ Nhật, 13 Tháng 7
                       </p>
                       <p className="text-lg text-white/80 drop-shadow-lg">
                         Ngày 19 tháng 6 năm Ất Tỵ
                       </p>
                     </div>
                     <Calendar className="w-8 h-8 text-white drop-shadow-lg" />
                   </div>

                   {/* Time */}
                   <div className={`flex items-center justify-end space-x-4 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                   }`} style={{ transitionDelay: '0.15s' }}>
                     <div className="text-right">
                       <p className="text-2xl xl:text-3xl font-medium drop-shadow-lg">
                         Sáng 8:00 AM
                       </p>
                       <p className="text-lg text-white/80 drop-shadow-lg">
                         Tại tư gia nhà gái
                       </p>
                     </div>
                     <Clock className="w-8 h-8 text-white drop-shadow-lg" />
                   </div>

                   {/* Location */}
                   <div className={`flex items-center justify-end space-x-4 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                   }`} style={{ transitionDelay: '0.25s' }}>
                     <div className="text-right">
                       <p className="text-2xl xl:text-3xl font-medium drop-shadow-lg">
                         Số nhà 232, Tổ 3 
                       </p>
                       <p className="text-lg text-white/80 drop-shadow-lg">
                         Ấp Châu Giang, Xã Châu Phong, TX Tân Châu, Tỉnh An Giang
                       </p>
                     </div>
                     <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
                   </div>
                 </div>

                 {/* Quote */}
                 <div className={`mt-12 pt-8 border-t border-white/30 ${fadeInUp} ${
                   textPhase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                 }`} style={{ transitionDelay: '0.3s' }}>
                   <p className="text-lg text-white/90 italic drop-shadow-lg">
                     "Tình yêu không chỉ là nhìn vào mắt nhau,<br />mà là cùng nhau nhìn về một hướng"
                   </p>
                 </div>
               </div>
             </div>

             {/* Mobile & Tablet: Center with Improved Animation */}
             <div className="lg:hidden flex justify-center w-full px-4 sm:px-6">
               <div className="text-center space-y-4 sm:space-y-6 max-w-sm sm:max-w-md">
                 
                 {/* Decorative Header */}
                 <div className={`flex justify-center mb-6 ${bounceIn} ${
                   textPhase >= 1 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'
                 }`}>
                   <div className="flex items-center space-x-2">
                     <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-white/60"></div>
                     <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse drop-shadow-lg" />
                     <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-white/60"></div>
                   </div>
                 </div>

                 {/* Couple Names - Mobile Optimized */}
                 <div className="mb-8">
                   <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-3 tracking-wide drop-shadow-2xl ${fadeInUp} ${
                     textPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                   }`} style={{ transitionDelay: '0.1s' }}>
                     DUSÔ
                   </h1>
                   <div className={`flex items-center justify-center my-4 ${bounceIn} ${
                     textPhase >= 1 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                   }`} style={{ transitionDelay: '0.2s' }}>
                     <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                     <span className="mx-3 sm:mx-4 text-white text-xl sm:text-2xl font-light drop-shadow-lg">&</span>
                     <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                   </div>
                   <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide drop-shadow-2xl ${fadeInUp} ${
                     textPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                   }`} style={{ transitionDelay: '0.3s' }}>
                     HASIKIN
                   </h1>
                 </div>

                 {/* Invitation Text - Compact for Mobile */}
                 <div className={`mb-6 sm:mb-8 ${fadeInUp} ${
                   textPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                 }`} style={{ transitionDelay: '0.1s' }}>
                   <p className="text-base sm:text-lg text-white leading-relaxed font-light drop-shadow-lg">
                     Trân trọng kính mời bạn tham dự
                   </p>
                   <p className="text-lg sm:text-xl text-white font-medium mt-2 drop-shadow-lg">
                     Lễ Cưới của chúng tôi
                   </p>
                 </div>

                 {/* Wedding Details - Compact Mobile Layout */}
                 <div className="space-y-3 text-white">
                   {/* Date */}
                   <div className={`flex items-center justify-center space-x-3 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                   }`} style={{ transitionDelay: '0.05s' }}>
                     <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg flex-shrink-0" />
                     <div className="text-center">
                       <p className="text-sm sm:text-base font-medium drop-shadow-lg">
                         Chủ Nhật, 13 Tháng 7
                       </p>
                       <p className="text-xs sm:text-sm text-white/80 drop-shadow-lg">
                         Ngày 19 tháng 6 năm Ất Tỵ
                       </p>
                     </div>
                   </div>

                   {/* Time */}
                   <div className={`flex items-center justify-center space-x-3 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                   }`} style={{ transitionDelay: '0.15s' }}>
                     <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg flex-shrink-0" />
                     <div className="text-center">
                       <p className="text-sm sm:text-base font-medium drop-shadow-lg">
                         Sáng 8:00 AM
                       </p>
                       <p className="text-xs sm:text-sm text-white/80 drop-shadow-lg">
                         Tại tư gia nhà gái
                       </p>
                     </div>
                   </div>

                   {/* Location */}
                   <div className={`flex items-start justify-center space-x-3 ${slideInRight} ${
                     textPhase >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                   }`} style={{ transitionDelay: '0.25s' }}>
                     <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg flex-shrink-0 mt-1" />
                     <div className="text-center">
                       <p className="text-sm sm:text-base font-medium drop-shadow-lg">
                         Số nhà 232, Tổ 3 
                       </p>
                       <p className="text-xs sm:text-sm text-white/80 drop-shadow-lg leading-tight">
                         Ấp Châu Giang, Xã Châu Phong<br />TX Tân Châu, Tỉnh An Giang
                       </p>
                     </div>
                   </div>
                 </div>

                 {/* Quote - Mobile Compact */}
                 <div className={`mt-6 pt-4 border-t border-white/30 ${fadeInUp} ${
                   textPhase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                 }`} style={{ transitionDelay: '0.3s' }}>
                   <p className="text-xs sm:text-sm text-white/90 italic drop-shadow-lg leading-relaxed">
                     "Tình yêu không chỉ là nhìn vào mắt nhau,<br />mà là cùng nhau nhìn về một hướng"
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>

     {/* Enhanced CSS for animations */}
     <style>{`
       @media (max-width: 1024px) {
         .mobile-bg {
           background-position: center top !important;
         }
       }
       @media (max-width: 640px) {
         .mobile-bg {
           background-position: 30% center !important;
         }
       }
       
       @keyframes float {
         0%, 100% { transform: translateY(0px) rotate(0deg); }
         33% { transform: translateY(-20px) rotate(5deg); }
         66% { transform: translateY(-10px) rotate(-5deg); }
       }
       
       @keyframes heartbeat {
         0%, 100% { transform: scale(1); }
         50% { transform: scale(1.1); }
       }

       @keyframes snow {
         0% {
           transform: translateY(-100vh) translateX(0px);
           opacity: 0;
         }
         10% {
           opacity: 1;
         }
         90% {
           opacity: 1;
         }
         100% {
           transform: translateY(100vh) translateX(100px);
           opacity: 0;
         }
       }
       
       .animate-float {
         animation: float 6s ease-in-out infinite;
       }
       
       .animate-heartbeat {
         animation: heartbeat 2s ease-in-out infinite;
       }

       .animate-snow {
         animation: snow linear infinite;
       }
       
       /* Smooth text shadows for better readability */
       .drop-shadow-2xl {
         filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.4)) drop-shadow(0 0 10px rgb(0 0 0 / 0.3));
       }
       
       /* Backdrop blur support */
       .backdrop-blur-sm {
         backdrop-filter: blur(4px);
       }
     `}</style>
     <WeddingPhotosScroll />
<WeddingCountdown/>
   </div>
 );
};

export default WeddingInvitation;