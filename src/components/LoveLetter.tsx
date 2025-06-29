import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const LoveLetter: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-['Dancing_Script'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-6">
            Surat Cinta Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Sebuah surat khusus dari hati Randy untuk Enjelly tercinta
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openEnvelope}
                  className="relative"
                >
                  {/* Envelope */}
                  <div className="w-80 h-60 bg-gradient-to-br from-rose-200 to-pink-200 rounded-lg shadow-2xl border-2 border-rose-300 overflow-hidden">
                    {/* Envelope flap */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-rose-300 to-pink-300 transform origin-top">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[60px] border-l-transparent border-r-transparent border-t-rose-300" />
                    </div>
                    
                    {/* Heart seal */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-rose-500 rounded-full p-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white fill-current" />
                    </div>
                    
                    {/* Address */}
                    <div className="absolute bottom-8 left-8 right-8 text-center">
                      <p className="text-rose-700 font-['Dancing_Script'] text-lg font-semibold">
                        Untuk Enjelly Tersayang
                      </p>
                      <p className="text-rose-600 text-sm mt-1">
                        Dari Randy dengan Cinta ❤️
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating sparkles */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-4 -right-4 text-yellow-400"
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -bottom-4 -left-4 text-pink-400"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                </motion.div>
                
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center mt-6 text-rose-600 font-medium"
                >
                  Klik untuk membuka surat ✨
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="max-w-2xl w-full"
              >
                {/* Letter Paper */}
                <div className="bg-gradient-to-br from-cream-50 to-rose-50 p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-rose-200 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-300 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose-300 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-lg" />
                  
                  {/* Letter content */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-center mb-8"
                    >
                      <h3 className="text-3xl font-['Dancing_Script'] font-bold text-rose-600 mb-2">
                        Untuk Enjelly Tersayang
                      </h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="space-y-6 text-gray-700 leading-relaxed font-['Poppins']"
                    >
                      <p className="text-lg">
                        Halo sayangku, Enjelly yang paling cantik di dunia ini... ❤️
                      </p>
                      
                      <p>
                        Dua tahun sudah kita bersama, dan rasanya baru kemarin aku membalas story Instagram-mu dengan 
                        kalimat sederhana "pagi-pagi kok galau njell?". Siapa sangka kalimat itu akan menjadi awal 
                        dari cerita cinta terindah dalam hidupku.
                      </p>
                      
                      <p>
                        Meskipun sekarang jarak memisahkan kita untuk sementara waktu, tapi cintaku padamu tidak pernah 
                        berkurang sedikitpun. Bahkan setiap hari tanpamu membuat aku semakin sadar betapa berharganya 
                        dirimu dalam hidupku.
                      </p>
                      
                      <p>
                        Terima kasih sudah menjadi alasan aku tersenyum setiap hari, menjadi tempat pulang yang paling 
                        nyaman, dan menjadi masa depan yang paling aku nantikan. Aku berjanji akan selalu menjaga 
                        cinta ini, akan selalu membuatmu bahagia, dan akan selalu ada untukmu.
                      </p>
                      
                      <p className="text-center text-xl font-semibold text-rose-600 font-['Dancing_Script']">
                        Aku cinta kamu, Enjelly Viranika ✨
                      </p>
                      
                      <p className="text-right">
                        Dengan cinta yang tak terbatas,<br />
                        <span className="font-['Dancing_Script'] text-xl text-rose-600">Randy Hendriyawan</span>
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Floating hearts */}
                  <motion.div
                    animate={{ 
                      y: [-20, -40, -20],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-8 text-rose-300"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [-30, -10, -30],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 left-8 text-pink-300"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;