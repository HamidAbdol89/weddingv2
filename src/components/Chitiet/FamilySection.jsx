import { motion, useTransform, useScroll } from 'framer-motion';
import { Flower, Crown, Heart, Sparkles } from 'lucide-react';

const FamilySection = ({ getSectionClass, isPreloading }) => {
  const { scrollYProgress } = useScroll();
  const yValue = useTransform(scrollYProgress, [0, 1], [0, -50]);


  return (
    <motion.div 
      id="families"
      data-animate
      className={`py-24 ${getSectionClass('families')} bg-gradient-to-b from-white to-rose-50/30 relative overflow-hidden`}
    >
      {/* Enhanced floating background decorations with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: yValue }}
      >
        {/* Main gradient orbs with improved responsive sizing */}
        <motion.div 
          className="absolute top-16 sm:top-20 left-2 sm:left-10 w-40 sm:w-72 lg:w-96 h-40 sm:h-72 lg:h-96 bg-gradient-to-br from-blue-300/20 via-blue-200/15 to-cyan-200/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-32 sm:top-60 right-2 sm:right-16 w-32 sm:w-56 lg:w-72 h-32 sm:h-56 lg:h-72 bg-gradient-to-bl from-rose-300/25 via-pink-200/20 to-rose-200/15 rounded-full blur-xl sm:blur-2xl"
          animate={{
            scale: [1, 0.9, 1.05, 1],
            opacity: [0.5, 0.7, 0.3, 0.5],
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
          className="absolute bottom-28 sm:bottom-40 left-1/12 sm:left-1/6 w-36 sm:w-60 lg:w-80 h-36 sm:h-60 lg:h-80 bg-gradient-to-tr from-purple-300/20 via-violet-200/15 to-indigo-200/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.3, 0.5, 0.4, 0.3],
            rotate: [0, -15, 5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Enhanced floating particles for family theme */}
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 16)].map((_, i) => {
          const familyColors = [
            'bg-gradient-to-r from-blue-400 to-cyan-400',    // Groom side
            'bg-gradient-to-r from-rose-400 to-pink-400',    // Bride side
            'bg-gradient-to-r from-purple-400 to-violet-400', // Unity
            'bg-gradient-to-r from-amber-400 to-yellow-400'   // Joy
          ];
          
          return (
            <motion.div
              key={i}
              className={`absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${familyColors[i % familyColors.length]} shadow-sm`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 85 + 7}%`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                y: [0, -25 - Math.random() * 15, 0],
                x: [0, Math.random() * 15 - 7, 0],
                rotate: [0, 180 + Math.random() * 180, 360],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.7, 1.1, 0.7]
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4
              }}
            />
          );
        })}

        {/* Heart-shaped floating elements for family theme */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          >
            <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-rose-300/50" />
          </motion.div>
        ))}

        {/* Subtle light rays for blessing effect */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-px h-24 sm:h-40 bg-gradient-to-b from-transparent via-blue-200/30 to-transparent transform -translate-x-1/2 rotate-12"
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-2/3 right-1/3 w-px h-16 sm:h-28 bg-gradient-to-t from-transparent via-rose-200/25 to-transparent transform rotate-45"
          animate={{
            opacity: [0, 0.4, 0],
            scaleY: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Subtle pattern overlay for elegance */}
        <div 
          className="absolute inset-0 opacity-[0.015] bg-gradient-to-br from-rose-100/10 to-transparent"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(244, 63, 94, 0.02) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader />
        
       <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
  <GroomsFamily isPreloading={isPreloading} />
  <BridesFamily isPreloading={isPreloading} />
</div>

      </div>
    </motion.div>
  );
};

const SectionHeader = () => (
  <motion.div 
    className="text-center mb-20"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <motion.h2 
      className="text-4xl sm:text-5xl font-serif font-light text-rose-800 mb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
    >
      Gia Đình Hai Họ
    </motion.h2>
    <motion.div 
      className="flex justify-center items-center"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      viewport={{ once: true }}
    >
      <Flower className="w-6 h-6 text-rose-300 mx-4" />
      <div className="w-24 h-px bg-gradient-to-r from-rose-200 to-rose-400" />
      <Flower className="w-6 h-6 text-rose-300 mx-4 rotate-45" />
      <div className="w-24 h-px bg-gradient-to-r from-rose-400 to-rose-200" />
      <Flower className="w-6 h-6 text-rose-300 mx-4" />
    </motion.div>
  </motion.div>
);

const GroomsFamily = ({ isPreloading }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-50px" }}
    className="relative"
  >
    {/* Background decoration */}
    <motion.div 
      className="absolute -top-10 -left-10 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-200/25 via-cyan-100/20 to-blue-100/15 rounded-full blur-xl -z-10"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Tên và tag nhà trai - thiết kế tinh tế */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-6 group"
      >
        <div className="relative">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 tracking-wider mb-1 transition-all duration-300 group-hover:text-blue-700">
            DU SÔ
          </div>
          
          {/* Tag nhà trai - vị trí cân đối */}
          {!isPreloading && (
          <motion.div 
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg whitespace-nowrap"
            initial={{ scale: 0.8, y: 10 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
          >
            Nhà trai
          </motion.div>
          )}
        </div>
        
        {/* Đường gạch trang trí */}
        <motion.div 
          className="w-16 h-0.5 bg-blue-300 mt-6 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
        />
      </motion.div>
      
      {/* Phần còn lại giữ nguyên */}
      <FamilyMemberImage 
        imgSrc="/images/chure-chitiet.jpg" 
        alt="Nhà trai"
        gradientFrom="from-blue-200"
        gradientTo="to-blue-400"
      />
      
      <FamilyInfo 
        fatherName="Ông: HJ. ALY"
        motherName="Bà: HJ. MA RI GIAH"
        color="blue"
        delay={0.7}
        icon={<Heart className="w-12 h-12" />}
      />
    </motion.div>
  </motion.div>
);

const BridesFamily = ({ isPreloading }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-50px" }}
    className="relative"
  >
    {/* Background decoration */}
    <motion.div 
      className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-rose-200/25 via-pink-100/20 to-rose-100/15 rounded-full blur-xl -z-10"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
    
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Tên và tag nhà gái - thiết kế tinh tế */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-6 group"
      >
        <div className="relative">
          <div className="text-3xl md:text-4xl font-bold text-rose-600 tracking-wider mb-1 transition-all duration-300 group-hover:text-rose-700">
            HASIKIN
          </div>
          
          {/* Tag nhà gái - vị trí cân đối */}
          {!isPreloading && (

          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white px-5 py-1 rounded-full text-sm font-medium shadow-lg whitespace-nowrap"
            initial={{ scale: 0.8, y: 10 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
          >
            Nhà gái
          </motion.div>
          )};
        </div>
        
        {/* Đường gạch trang trí */}
        <motion.div 
          className="w-16 h-0.5 bg-rose-300 mt-6 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
        />
      </motion.div>
      
      {/* Phần còn lại giữ nguyên */}
      <FamilyMemberImage 
        imgSrc="/images/codau-chitiet.jpg" 
        alt="Nhà gái"
        gradientFrom="from-rose-200"
        gradientTo="to-rose-400"
      />
      
      <FamilyInfo 
        fatherName="Ông: HJ. ABD HALIEM"
        motherName="Bà: HJ. HA LY MAH"
        color="rose"
        delay={0.7}
        icon={<Sparkles className="w-12 h-12" />}
      />
    </motion.div>
  </motion.div>
);
const FamilyMemberImage = ({ imgSrc, alt, gradientFrom, gradientTo }) => (
  <motion.div
    className="relative mb-10 group"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-md opacity-70 group-hover:opacity-90 transition-all duration-500 -z-10`}></div>
    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
      <img 
        src={imgSrc} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <motion.div 
      className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-lg"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
    >
      <Crown className="w-6 h-6 text-blue-500" />
    </motion.div>
  </motion.div>
);

const FamilyTitle = ({ text, color, delay }) => (
  <motion.h3 
    className={`text-3xl font-serif font-medium text-${color}-800 mb-12 relative`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
  >
    {text}
    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-px bg-${color}-300`}></div>
  </motion.h3>
);

const FamilyInfo = ({ fatherName, motherName, color, delay, icon }) => (
  <motion.div 
    className={`w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-${color}-100 relative overflow-hidden`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-400 to-${color}-600`}></div>
    <div className="space-y-4 text-center">
      <p className={`text-xl font-medium text-${color}-900`}>{fatherName}</p>
      <div className={`w-8 h-px bg-${color}-200 mx-auto`}></div>
      <p className={`text-xl font-medium text-${color}-900`}>{motherName}</p>
    </div>
    <div className={`absolute bottom-2 right-2 text-${color}-300/40`}>
      {icon}
    </div>
  </motion.div>
);

export default FamilySection;