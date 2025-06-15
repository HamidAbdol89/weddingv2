import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, Home, Users } from 'lucide-react';

const ScheduleSection = ({ getSectionClass }) => {
  // Simplified container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Simplified item animation - reduced spring complexity
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      id="schedule"
      data-animate
      className={`mb-24 sm:mb-36 ${getSectionClass('schedule')}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16 sm:mb-20"
        variants={itemVariants}
      >
        <div className="inline-block mb-6">
          <h2 className="text-5xl sm:text-7xl font-serif bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent relative">
            Lịch Trình Lễ Cưới
            <span className="absolute -top-2 -right-4 text-2xl">✨</span>
          </h2>
        </div>
        
        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Hai ngày thiêng liêng với những nghi thức truyền thống đầy ý nghĩa
        </p>
        
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-8 rounded-full" />
      </motion.div>
      
      {/* Days Container */}
      <motion.div 
        className="space-y-20 sm:space-y-32"
        variants={containerVariants}
      >
        <DayOne itemVariants={itemVariants} />
        <DayTwo itemVariants={itemVariants} />
      </motion.div>
    </motion.div>
  );
};

const DayOne = ({ itemVariants }) => {
  const detailsVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const detailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative"
      variants={itemVariants}
    >
      {/* Static background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-pink-50/30 rounded-3xl -m-8 -z-10" />
      
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center">
        
        {/* Left - Day Number & Badge */}
        <motion.div 
          className="text-center lg:text-right space-y-8"
          variants={detailsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative inline-block"
            variants={detailItemVariants}
          >
            <div className="text-[8rem] sm:text-[10rem] font-black bg-gradient-to-br from-rose-200 to-pink-200 bg-clip-text text-transparent leading-none select-none">
              01
            </div>
            <span className="absolute top-4 right-4 text-3xl">🌙</span>
          </motion.div>
          
          <motion.div 
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg"
            variants={detailItemVariants}
          >
            <Heart className="w-8 h-8" />
            <span className="text-2xl font-bold">Ngày Đầu Tiên</span>
          </motion.div>
        </motion.div>

        {/* Center - Timeline dot */}
        <div className="flex justify-center">
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            {/* Static connecting line */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-rose-300 to-pink-300 -z-10" />
            
            {/* Simplified dot with subtle pulse */}
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg relative z-10"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Static outer ring */}
            <div className="absolute inset-0 w-8 h-8 border-4 border-rose-200 rounded-full" />
          </motion.div>
        </div>
        
        {/* Right - Event Details */}
        <motion.div 
          className="space-y-6"
          variants={detailsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-rose-100"
            variants={detailItemVariants}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <Calendar className="w-6 h-6 text-rose-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">Thứ 7, ngày 12</p>
                  <p className="text-sm text-gray-600">Tháng 7, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <Clock className="w-6 h-6 text-rose-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">19:00 PM</p>
                  <p className="text-sm text-gray-600">Tối thứ 7</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <Home className="w-6 h-6 text-rose-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">Tại tư gia</p>
                  <p className="text-sm text-gray-600">Nhà gái - Đêm chiêu đãi</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Simplified event description card */}
          <motion.div 
            className="bg-gradient-to-br from-rose-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg transform rotate-1"
            variants={detailItemVariants}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🎵</div>
              <p className="text-xl font-bold">Đêm vui hát</p>
              <p className="text-rose-100 mt-1">Chiêu đãi khách mời</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const DayTwo = ({ itemVariants }) => {
  const detailsVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const detailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative"
      variants={itemVariants}
    >
      {/* Static background decoration */}
      <div className="absolute inset-0 bg-gradient-to-l from-purple-50/30 to-indigo-50/30 rounded-3xl -m-8 -z-10" />
      
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center">
        
        {/* Left - Event Details */}
        <motion.div 
          className="lg:order-1 space-y-6"
          variants={detailsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100"
            variants={detailItemVariants}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">Chủ Nhật, ngày 13</p>
                  <p className="text-sm text-gray-600">Tháng 7, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">8:00 AM</p>
                  <p className="text-sm text-gray-600">Sáng chủ nhật</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <Home className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-lg font-bold text-gray-800">Tại tư gia</p>
                  <p className="text-sm text-gray-600">Lễ thành hôn chính thức</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Simplified event description card */}
          <motion.div 
            className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg transform -rotate-1"
            variants={detailItemVariants}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💍</div>
              <p className="text-xl font-bold">Lễ Thành Hôn</p>
              <p className="text-purple-100 mt-1">Nghi thức chính thức</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Center - Timeline dot */}
        <div className="lg:order-2 flex justify-center">
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            {/* Static connecting line */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-purple-300 to-indigo-300 -z-10" />
            
            {/* Simplified dot with subtle pulse */}
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg relative z-10"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Static outer ring */}
            <div className="absolute inset-0 w-8 h-8 border-4 border-purple-200 rounded-full" />
          </motion.div>
        </div>
        
        {/* Right - Day Number & Badge */}
        <motion.div 
          className="lg:order-3 text-center lg:text-left space-y-8"
          variants={detailsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative inline-block"
            variants={detailItemVariants}
          >
            <div className="text-[8rem] sm:text-[10rem] font-black bg-gradient-to-br from-purple-200 to-indigo-200 bg-clip-text text-transparent leading-none select-none">
              02
            </div>
            <span className="absolute top-4 left-4 text-3xl">☀️</span>
          </motion.div>
          
          <motion.div 
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full shadow-lg"
            variants={detailItemVariants}
          >
            <Users className="w-8 h-8" />
            <span className="text-2xl font-bold">Ngày Thứ Hai</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScheduleSection;