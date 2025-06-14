import React from 'react';

const WeddingMap = () => {
  return (
    <div className="h-96 w-full">
      {/* Bạn có thể nhúng Google Maps hoặc Mapbox ở đây */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841540144447!2d105.7689044152605!3d10.029933992833397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51c2e3b1%3A0x9e8f7d1a3b7e3b1d!2sExample%20Wedding%20Venue!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default WeddingMap;