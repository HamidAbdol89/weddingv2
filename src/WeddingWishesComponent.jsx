import React, { useState, useEffect } from 'react';
import { Heart, Send, User, MessageCircle, Calendar, Sparkles, Star } from 'lucide-react';
import { database, ref, push, onValue } from './firebase';

export default function WeddingWishesComponent() {
  const [wishes, setWishes] = useState([]);
  const [formData, setFormData] = useState({
    senderName: '',
    message: '',
    relationship: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = () => {
  if (!formData.senderName.trim() || !formData.message.trim()) {
    setErrorMessage('Vui lòng điền đầy đủ tên và lời chúc!');
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
    return;
  }

    setIsSubmitting(true);
      setTimeout(() => setShowSuccess(false), 3000);

    
    const newWish = {
      senderName: formData.senderName,
      message: formData.message,
      relationship: formData.relationship,
      timestamp: new Date().toLocaleString('vi-VN')
    };
    
    push(ref(database, 'weddingWishes'), newWish)
      .then(() => {
        setFormData({ senderName: '', message: '', relationship: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi lời chúc:", error);
        alert('Có lỗi xảy ra khi gửi lời chúc!');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const wishesRef = ref(database, 'weddingWishes');
    
    onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const wishesList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setWishes(wishesList.reverse());
      } else {
        setWishes([]);
      }
    });
  }, []);

  const relationshipOptions = [
    { value: '', label: 'Chọn mối quan hệ' },
    { value: 'family', label: 'Gia đình' },
    { value: 'friend', label: 'Bạn bè' },
    { value: 'colleague', label: 'Đồng nghiệp' },
    { value: 'neighbor', label: 'Hàng xóm' },
    { value: 'other', label: 'Khác' }
  ];
  // Thêm vào file
useEffect(() => {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.group');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add('animate-fadeInUp');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Thêm vào useEffect khi mount
useEffect(() => {
  setTimeout(() => {
    document.querySelector('.group')?.classList.add('animate-fadeInUp');
  }, 100);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-rose-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-pink-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-rose-400 rounded-full opacity-20 animate-bounce"></div>
        <Sparkles className="absolute top-32 left-1/2 w-8 h-8 text-pink-200 opacity-30 animate-pulse" />
        <Star className="absolute bottom-40 right-1/4 w-6 h-6 text-rose-200 opacity-40 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">





        <div className="flex flex-col gap-8"> 
                 {/* Header cải tiến */}
<div className="text-center mb-16">
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center mb-4">
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-rose-400 mr-4"></div>
      <Heart className="text-rose-500 w-6 h-6" />
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-rose-400 ml-4"></div>
    </div>
    
    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-4 font-serif tracking-tight">
      Lời Chúc Đám Cưới
    </h1>
    
    <div className="flex items-center justify-center mb-6">
      <div className="w-16 h-px bg-gradient-to-r from-transparent to-pink-300 mr-4"></div>
      <Heart className="text-pink-400 w-5 h-5" />
      <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-300 ml-4"></div>
    </div>
    
    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
      Gửi những lời chúc tốt đẹp nhất đến cô dâu chú rể trong ngày trọng đại
    </p>
    
    <div className="mt-8 w-32 h-0.5 bg-gradient-to-r from-rose-100 via-rose-400 to-rose-100 mx-auto rounded-full"></div>
  </div>
</div>
          {/* Form gửi lời chúc */}
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl shadow-lg">
                  <Send className="text-white w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Gửi Lời Chúc
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="group/input">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-rose-500" />
                      <span>Tên của bạn *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="group/input">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Mối quan hệ</span>
                    </div>
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium text-gray-800"
                  >
                    {relationshipOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group/input">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-rose-500" />
                      <span>Lời chúc *</span>
                    </div>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Viết lời chúc của bạn tại đây..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-2xl font-bold text-white text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>Gửi Lời Chúc</span>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </>
                  )}
                </button>
       
              </div>
                 {showSuccess && (
  <div className="fixed inset-x-0 top-0 z-50 animate-fadeIn px-4 pt-4 sm:pt-8">
    <div className="bg-white backdrop-blur-lg bg-opacity-95 border border-emerald-100 text-gray-800 p-4 sm:p-5 rounded-xl shadow-lg flex items-start gap-3 max-w-md mx-auto">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 flex flex-wrap items-baseline gap-1 sm:gap-2">
          <span className="text-sm sm:text-base">Gửi thành công!</span>
          <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">Hoàn tất</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
          Lời chúc của bạn đã được gửi đến cô dâu chú rể. Cảm ơn bạn đã gửi gắm yêu thương!
        </p>
      </div>
      <button 
        onClick={() => setShowSuccess(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
        aria-label="Đóng thông báo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
)}
                  {showError && (
  <div className="fixed inset-x-0 top-0 z-50 animate-fadeIn px-4 pt-4 sm:pt-8">
    <div className="bg-white backdrop-blur-lg bg-opacity-95 border border-rose-100 text-gray-800 p-4 sm:p-5 rounded-xl shadow-lg flex items-start gap-3 max-w-md mx-auto">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 flex flex-wrap items-baseline gap-1 sm:gap-2">
          <span className="text-sm sm:text-base">Cần bổ sung thông tin</span>
          <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full">Thiếu dữ liệu</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">{errorMessage}</p>
      </div>
      <button 
        onClick={() => setShowError(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
        aria-label="Đóng thông báo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
)}
            </div>
            
          </div>

         {/* Danh sách lời chúc - Phiên bản tối ưu mobile */}
<div className="group">
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-6 md:p-8 border border-white/50 sm:border-2 transition-all duration-500">
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <div className="p-2 sm:p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg">
        <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
        Lời Chúc ({wishes.length})
      </h2>
    </div>
    
    <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
      {wishes.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500">
          <div className="relative inline-block mb-3 sm:mb-4">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300" />
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-pink-200 rounded-full animate-ping opacity-50"></div>
          </div>
          <p className="text-base sm:text-lg font-medium">Chưa có lời chúc nào</p>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Hãy là người đầu tiên gửi lời chúc!</p>
        </div>
      ) : (
        wishes.map((wish, index) => (
          <div 
            key={wish.id} 
            className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-2 sm:border-l-4 border-rose-400 transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: `${index < 10 ? index * 0.1 : 0}s` }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-md sm:shadow-lg">
                  {wish.senderName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">{wish.senderName}</h4>
                  {wish.relationship && (
                    <span className="text-xs sm:text-sm text-rose-600 bg-rose-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium">
                      {relationshipOptions.find(opt => opt.value === wish.relationship)?.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-xs text-gray-500 bg-white/50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                <Calendar className="w-2 h-2 sm:w-3 sm:h-3" />
                <span>{wish.timestamp}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base pl-0 sm:pl-13">
              {wish.message}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8">
          <div className="flex justify-center items-center gap-3 text-gray-600 mb-4">
            <Heart className="text-rose-400 w-6 h-6 animate-pulse" />
            <span className="text-xl font-semibold">Chúc mừng hạnh phúc của đôi uyên ương</span>
            <Heart className="text-rose-400 w-6 h-6 animate-pulse" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #f43f5e, #ec4899);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #e11d48, #db2777);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.group {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group.animate-fadeInUp {
  opacity: 1;
}

html {
  scroll-behavior: smooth;
}
      `}</style>
    </div>
  );
}