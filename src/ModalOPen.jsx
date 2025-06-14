import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ModalOpen = ({ modalOpen, setModalOpen, modalContent }) => {
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-500 animate-fadeIn">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl w-[95%] max-w-lg mx-auto border border-white/20 overflow-hidden"
          >
            {/* Hiệu ứng ánh sáng */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-xl opacity-30 ${modalContent.isError ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-lg opacity-20 ${modalContent.isError ? 'bg-red-400' : 'bg-emerald-400'}`}></div>
            </div>
            
            {/* Nội dung chính */}
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                {modalContent.isLoading ? (
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
                ) : modalContent.isError ? (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-full border border-red-200 shadow-inner"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-4 rounded-full border border-emerald-200 shadow-inner"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-3xl font-extrabold mb-4 text-center bg-clip-text ${modalContent.isError 
                  ? 'text-transparent bg-gradient-to-r from-red-500 to-red-600' 
                  : 'text-transparent bg-gradient-to-r from-emerald-500 to-teal-600'}`}
              >
                {modalContent.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 mb-8 text-center leading-relaxed text-lg"
              >
                {modalContent.message}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className={`relative overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    modalContent.isError 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 hover:shadow-red-300/50 text-white' 
                      : 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-emerald-300/50 text-white'
                  }`}
                >
                  <span className="relative z-10">Đóng</span>
                  <span className={`absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300`}></span>
                </button>
              </motion.div>
            </div>
            
            {/* Hiệu ứng viền ánh sáng */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none border-2 ${modalContent.isError ? 'border-red-500/20' : 'border-emerald-500/20'}`}></div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ModalOpen; 