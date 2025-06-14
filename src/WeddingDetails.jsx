import React from 'react';
import { Heart, Users, Calendar, MapPin, Clock, Home } from 'lucide-react';

const WeddingDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16 space-y-8 sm:space-y-12 bg-gradient-to-br from-rose-50 via-white to-purple-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 mb-4">
          Chi Tiết Lễ Cưới
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full"></div>
      </div>

      {/* Thông tin gia đình */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-12">
        {/* Nhà Trai */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700">Nhà Trai</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold text-blue-800 mb-2">Cha: HJ. ALY</p>
              <p className="font-semibold text-blue-800">Mẹ: HJ. MA RI GIAH</p>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium">Số nhà 218, Tổ 6</p>
                <p>Ấp Phũm Soài, Xã Châu Phong</p>
                <p>TX Tân Châu, Tỉnh An Giang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nhà Gái */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-full shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-pink-700">Nhà Gái</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="bg-pink-50 p-4 rounded-xl">
              <p className="font-semibold text-pink-800 mb-2">Cha: HJ. ABD HALIEM</p>
              <p className="font-semibold text-pink-800">Mẹ: HJ. HA LY MAH</p>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium">Số nhà 232, Tổ 3</p>
                <p>Ấp Châu Giang, Xã Châu Phong</p>
                <p>TX Tân Châu, Tỉnh An Giang</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lịch trình lễ cưới */}
      <div className="space-y-6">
        <h3 className="text-2xl sm:text-3xl font-serif text-center text-purple-700 mb-8">
          Lịch Trình Lễ Cưới
        </h3>
        
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {/* Ngày đầu tiên */}
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold">Ngày Đầu Tiên</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-white/80 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Thứ 7, 12 Tháng 7</p>
                  <p className="text-sm text-white/80">Nhằm ngày 18 tháng 6 năm Ất Tỵ</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-white/80 flex-shrink-0" />
                <p className="font-semibold">Tối 7:00 PM</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Home className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Tại tư gia - Nhà Trai</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-sm font-medium">🌙 Thiệp Ngah Đãi</p>
              </div>
            </div>
          </div>

          {/* Ngày thứ hai */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold">Ngày Thứ Hai</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-white/80 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Chủ Nhật, 13 Tháng 7</p>
                  <p className="text-sm text-white/80">Nhằm ngày 19 tháng 6 năm Ất Tỵ</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-white/80 flex-shrink-0" />
                <p className="font-semibold">Sáng 8:00 AM</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Home className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Tại tư gia - Hôn lễ chính thức</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-sm font-medium">☀️ Lễ Thành Hôn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lưu ý đặc biệt */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-amber-400 p-2 rounded-full">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-xl font-bold text-amber-800">Thông Tin Quan Trọng</h4>
        </div>
        <div className="text-amber-800 space-y-2">
          <p className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            <span>Hôn lễ được cử hành tại tư gia</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            <span>Hai ngày liên tiếp với các nghi thức truyền thống</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            <span>Theo lịch âm: 18-19 tháng 6 năm Ất Tỵ</span>
          </p>
        </div>
      </div>

      {/* Lời cảm ơn */}
      <div className="text-center bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <Heart className="w-12 h-12 mx-auto mb-4 text-white/80" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Lời Cảm Ơn Chân Thành</h3>
          </div>
          <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Sự hiện diện của quý vị sẽ làm cho ngày đặc biệt của chúng tôi trở nên ý nghĩa và trọn vẹn hơn. 
            Chúng tôi rất mong được chia sẻ niềm hạnh phúc thiêng liêng này cùng với gia đình và bạn bè thân yêu!
          </p>
          <div className="mt-6 text-sm text-white/80">
            ✨ Cảm ơn sự quan tâm và chúc mừng của mọi người ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDetails;