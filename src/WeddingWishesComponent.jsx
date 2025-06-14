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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.senderName.trim() || !formData.message.trim()) {
      alert('Vui lòng điền đầy đủ tên và lời chúc!');
      return;
    }

    setIsSubmitting(true);
    
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
        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-lg">Gửi thành công! 🎉</p>
                <p className="text-sm opacity-90">Lời chúc của bạn đã được gửi đến cô dâu chú rể</p>
              </div>
            </div>
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Heart className="text-rose-500 w-12 h-12 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Lời Chúc Đám Cưới
            </h1>
            <div className="relative">
              <Heart className="text-rose-500 w-12 h-12 animate-pulse" />
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          <p className="text-gray-600 text-xl font-medium">
            Gửi những lời chúc tốt đẹp nhất đến cô dâu chú rể
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid xl:grid-cols-2 gap-8">
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
            </div>
          </div>

          {/* Danh sách lời chúc */}
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl shadow-lg">
                  <Heart className="text-white w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Lời Chúc ({wishes.length})
                </h2>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {wishes.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="relative inline-block mb-4">
                      <Heart className="w-16 h-16 mx-auto text-gray-300" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-200 rounded-full animate-ping opacity-50"></div>
                    </div>
                    <p className="text-lg font-medium">Chưa có lời chúc nào</p>
                    <p className="text-sm mt-2">Hãy là người đầu tiên gửi lời chúc!</p>
                  </div>
                ) : (
                  wishes.map((wish, index) => (
                    <div 
                      key={wish.id} 
                      className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-l-4 border-rose-400 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {wish.senderName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{wish.senderName}</h4>
                            {wish.relationship && (
                              <span className="text-sm text-rose-600 bg-rose-100 px-3 py-1 rounded-full font-medium">
                                {relationshipOptions.find(opt => opt.value === wish.relationship)?.label}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>{wish.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium text-base pl-13">
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
      `}</style>
    </div>
  );
}