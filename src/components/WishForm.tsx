import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, Sparkles, Check } from 'lucide-react';
import emailjs from 'emailjs-com';

const WishForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Future',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      alert('Tolong isi pesan terlebih dahulu ya sayang ❤️');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email || 'tidak diisi',
        message: formData.message
      };

      await emailjs.send(
        'service_x795sgp',
        'template_ce6i1r4',
        templateParams,
        'RwGRlZ7bm2WBZMbIL'
      );

      setIsSubmitted(true);
      setFormData({ name: 'Future', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Maaf sayang, ada kesalahan. Coba lagi ya! 💕');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-rose-200">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-6"
            >
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-4xl font-['Dancing_Script'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-4">
                Pesan Terkirim! 💕
              </h2>
              
              <p className="text-xl text-gray-600 mb-6">
                Terima kasih sayang! Pesan cintamu sudah sampai ke Randy. 
                Dia pasti senang banget baca pesanmu ❤️
              </p>
              
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Heart className="w-6 h-6 text-rose-400 fill-current" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-['Dancing_Script'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-6">
            Formulir Pesan Harapan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Kirimkan pesan spesial untuk Randy! Ceritakan apa yang ada di hatimu ❤️
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-rose-200 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-4 right-4 text-rose-300 opacity-30"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-6 left-6 text-pink-300 opacity-30"
            >
              <Heart className="w-6 h-6" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-colors duration-300 font-medium"
                  placeholder="Future (default)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nama yang akan muncul di pesan (opsional)
                </p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-gray-400">(Opsional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-colors duration-300"
                  placeholder="email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pesan untuk Randy ❤️
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tulis pesan hatimu untuk Randy di sini... Ceritakan perasaanmu, harapanmu, atau apapun yang ingin kamu sampaikan ✨"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 10 karakter untuk pesan yang bermakna
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Kirim Pesan Cinta</span>
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-6 text-sm text-gray-500"
            >
              <p>
                Pesan akan dikirim langsung ke email Randy dengan penuh cinta 💕
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WishForm;