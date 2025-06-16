import React, { useState, useEffect, useRef } from 'react';


const WeddingPhotosScroll = () => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentPair, setCurrentPair] = useState({ chure: 0, codau: 0 });
  const sectionsRef = useRef([]);

  // Dữ liệu ảnh
  const imageData = [
    {
      id: 'chure',
      title: 'ALY DUSÔ',
      images: [
        '/images/chure.jpg',
        '/images/chure-tt.jpg'
      ]
    },
    {
      id: 'codau', 
      title: 'HASIKIN',
      images: [
        '/images/codau.jpg',
        '/images/codau-tt.jpg'
      ]
    }
  ];

  // Intersection Observer để theo dõi khi ảnh xuất hiện
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleImages(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Hiệu ứng luân phiên ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPair(prev => ({
        chure: (prev.chure + 1) % 2,
        codau: (prev.codau + 1) % 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-800 mb-4">
          Cặp Đôi Hạnh Phúc
        </h2>
        <p className="text-lg text-rose-600 max-w-2xl mx-auto">
          Hành trình tình yêu đẹp nhất bắt đầu từ đây
        </p>
      </div>

      {/* Photo Sections */}
      <div className="space-y-32 px-4 pb-16">
        {imageData.map((person, personIndex) => (
          <div
            key={person.id}
            ref={el => sectionsRef.current[personIndex] = el}
            data-index={personIndex}
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              visibleImages.includes(personIndex)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Title */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif text-rose-800 mb-4">
                {person.title}
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
            </div>

            {/* Images Container */}
            <div className={`flex justify-center ${
              personIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } flex-col items-center gap-8 md:gap-16`}>
              
              {/* Main Image */}
              <div className="relative group">
                <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full overflow-hidden shadow-2xl">
                  {person.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${person.title} ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        currentPair[person.id] === imgIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-110'
                      }`}
                    />
                  ))}
                  
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Ring */}
                  <div className="absolute -inset-4 rounded-full border-2 border-rose-200 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"></div>
                </div>
                
                {/* Floating Hearts */}
                <div className="absolute -top-4 -right-4 text-rose-400 animate-pulse">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className={`text-center md:text-left max-w-md ${
                personIndex % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
              }`}>
                <div className="space-y-4">
                  <div className="text-rose-600 font-medium text-lg">
                    {person.id === 'chure' ? '💍 Chú Rể' : '👰 Cô Dâu'}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {person.id === 'chure' 
                      ? 'Người đàn ông tuyệt vời, luôn che chở và yêu thương. Với nụ cười ấm áp và trái tim nhân hậu.'
                      : 'Người phụ nữ xinh đẹp, dịu dàng và đầy tình yêu thương. Ánh mắt luôn tỏa sáng với hạnh phúc.'
                    }
                  </p>
                  
                  {/* Decorative Quote */}
                  <div className="italic text-rose-500 text-sm border-l-4 border-rose-200 pl-4 mt-6">
                    {person.id === 'chure' 
                      ? '"Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng."'
                      : '"Hạnh phúc thật sự là khi có ai đó để yêu thương và được yêu thương."'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <div className="text-center py-16">
        <div className="flex justify-center items-center space-x-4 text-rose-400">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-rose-300"></div>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-rose-300"></div>
        </div>
      </div>

    </div>
  );
};

export default WeddingPhotosScroll;