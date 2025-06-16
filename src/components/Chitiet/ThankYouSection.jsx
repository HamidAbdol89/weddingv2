import { motion } from "framer-motion";
import { Flower, Heart } from "lucide-react"; // Giả sử bạn đang sử dụng lucide-react

const ThankYouSection = ({ getSectionClass }) => {
  return (
<motion.div
  id="thanks"
  data-animate
  className={`${getSectionClass('thanks')} min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-rose-50 px-6`}
>
  <div className="w-full max-w-6xl">

        {/* Animated Floral Border */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="flex space-x-6"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            {[...Array(8)].map((_, i) => (
              <Flower className="w-8 h-8 text-rose-300/60" key={i} />
            ))}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="text-center relative z-10">
          {/* Animated Floating Heart */}
          <motion.div
            className="relative mb-16"
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-rose-400/10 blur-xl rounded-full w-32 h-32 mx-auto"></div>
            <motion.div 
              className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full shadow-lg mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-14 h-14 text-white" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-5xl sm:text-6xl font-serif font-light tracking-wide text-rose-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lời Tri Ân
          </motion.h3>

          {/* Message */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-rose-200"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-rose-200"></div>
            
           <p className="text-xl sm:text-2xl font-light leading-relaxed text-rose-900/80 max-w-3xl mx-auto px-6 py-8">
  Cảm ơn sự hiện diện của bạn trong ngày trọng đại của chúng tôi. Sự có mặt của bạn là món quà ý nghĩa nhất. <br /><br />
  Chúng tôi trân trọng sự hiện diện của bạn trong ngày lễ thành hôn. Sự góp mặt của bạn làm cho ngày vui của chúng tôi thêm trọn vẹn. <br /><br />
  Cảm ơn bạn đã dành thời gian quý báu để đến chung vui với chúng tôi. Sự hiện diện của bạn là niềm vinh dự cho chúng tôi.
</p>

          </motion.div>

          {/* Signature */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="inline-block border-t border-rose-300 w-32 mb-4"></div>
            <p className="text-lg font-serif italic text-rose-700">Gia đình nhỏ của chúng tôi</p>
          </motion.div>

          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-rose-100/30 blur-xl -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-rose-200/20 blur-xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYouSection;