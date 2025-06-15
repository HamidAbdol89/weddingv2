import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ModalOpen from './ModalOPen';
import BubbleFloating from './BubbleFloating';

const MailForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isError: false,
    isLoading: false
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setModalContent({
      title: "Đang xử lý yêu cầu",
      message: "Vui lòng chờ trong giây lát...",
      isError: false,
      isLoading: true
    });
    setModalOpen(true);

    const templateParams = {
      from_name: formData.name,
      phone: formData.phone,
      guests: formData.guests,
      message: formData.message,
      date: new Date().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ip_address: await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(() => 'Unknown')
    };

    try {
      const sendPromise = emailjs.send(
        'service_e67szrs',
        'template_7fi94ca',
        templateParams,
        'q05JBffJg3W0pmOJh'
      );
      
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1500));
      
      await Promise.all([sendPromise, timeoutPromise]);

      setFormData({
        name: '',
        phone: '',
        guests: '',
        message: ''
      });

      if (typeof window !== 'undefined') {
        const { default: confetti } = await import('canvas-confetti');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f9a8d4', '#f472b6', '#ec4899']
        });
      }

      setModalContent({
        title: "Thành công!",
        message: "Cảm ơn bạn đã xác nhận tham dự! Hẹn gặp bạn tại lễ cưới nhé!❤️",
        isError: false,
        isLoading: false
      });

      setTimeout(() => {
        setModalOpen(false);
      }, 8000);

    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      
      setModalContent({
        title: "Lỗi hệ thống",
        message: `Xin lỗi, đã có lỗi xảy ra (Mã lỗi: ${error.code || 'UNKNOWN'}). Vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp qua số điện thoại 0909.xxx.xxx để được hỗ trợ.`,
        isError: true,
        isLoading: false
      });
    }
  };

  return (
    <>
    <BubbleFloating bubbleCount={12} className="z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 py-8 sm:py-16"
      >
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-3"
          >
            Xác Nhận Tham Dự
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-pink-900/80 text-sm sm:text-base"
          >
            Vui lòng điền thông tin bên dưới để chúng tôi chuẩn bị chu đáo
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-pink-50/80 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-xl overflow-hidden relative"
        >
          {/* Hiệu ứng sương mờ màu hồng */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-rose-100/30 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200 rounded-full opacity-20 blur-xl"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6 sm:space-y-8">
            {/* Field Họ và Tên */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-pink-900/80 mb-2 pl-1">
                Họ và Tên <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-3 text-base rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90 transition-all duration-200 placeholder-pink-300"
                  placeholder="Mohamed..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Users className="w-5 h-5 text-pink-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Field Số Điện Thoại */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-pink-900/80 mb-2 pl-1">
                Số Điện Thoại
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 text-base rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90 transition-all duration-200 placeholder-pink-300"
                  placeholder="09xx"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Phone className="w-5 h-5 text-pink-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Field Số Người Tham Dự */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-pink-900/80 mb-2 pl-1">
                Số Người Tham Dự
              </label>
              <div className="relative">
                <select 
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 text-base rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90 appearance-none transition-all duration-200 text-pink-900"
                >
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người</option>
                  <option value="5+">Hơn 4 người</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Users className="w-5 h-5 text-pink-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Field Lời Chúc */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-pink-900/80 mb-2 pl-1">
                Lời Chúc
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-3 text-base rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/90 resize-none transition-all duration-200 placeholder-pink-300"
                  placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
                />
                <div className="absolute top-3 right-3 flex items-center pr-3 pointer-events-none">
                  <MessageCircle className="w-5 h-5 text-pink-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Nút Submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-pink-200 hover:shadow-pink-300 relative overflow-hidden transition-all duration-300 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>Gửi Xác Nhận</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      
      <ModalOpen 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </>
  );
};

export default MailForm;