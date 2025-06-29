import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Sparkles, Calendar, MapPin } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: 'PPLK 2022',
    title: 'Pertemuan Pertama di Embung A ITERA',
    description: 'Mahasiswa baru yang takdir mempertemukan kita di orientasi kampus. Siapa sangka momen sederhana ini akan menjadi awal dari cerita yang indah.',
    icon: <MapPin className="w-5 h-5" />,
    color: 'bg-blue-500',
    image: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186204/1_a02kg2.jpg'
  },
  {
    id: 2,
    date: 'Setelah PPLK',
    title: 'Kehilangan Kontak',
    description: 'Masa-masa sibuk kuliah membuat kita terpisah. Tapi takdir punya cara sendiri untuk mempertemukan dua hati yang ditakdirkan bersama.',
    icon: <Heart className="w-5 h-5" />,
    color: 'bg-gray-500'
  },
  {
    id: 3,
    date: '31 Mei 2023',
    title: 'Terhubung Kembali',
    description: '"Pagi-pagi kok galau njell?" - Kalimat sederhana yang mengubah segalanya. Randy membalas story Instagram Enjelly dan percakapan dimulai lagi.',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'bg-green-500',
    image: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751193924/bjir_oswdic.jpg'
  },
  {
    id: 4,
    date: 'Juni 2023',
    title: 'Hari-hari Mengobrol',
    description: 'Setiap hari dipenuhi pesan, setiap momen jadi istimewa. Dari pagi hingga malam, kita berbagi cerita, tawa, dan mimpi.',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    date: '30 Juni 2023',
    title: 'Resmi Menjadi Pasangan',
    description: 'Hari yang tak terlupakan ketika kita memutuskan untuk menjalani perjalanan cinta ini bersama. Awal dari "kita" yang sesungguhnya.',
    icon: <Heart className="w-5 h-5" />,
    color: 'bg-rose-500',
    image: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186254/4_epupl5.jpg'
  },
  {
    id: 6,
    date: 'Juli 2025',
    title: 'Dua Tahun Bersama',
    description: 'Hari ini kita merayakan dua tahun perjalanan cinta yang penuh warna. Meskipun jarak memisahkan, cinta kita semakin kuat.',
    icon: <Calendar className="w-5 h-5" />,
    color: 'bg-purple-500',
    image: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751193824/anjay_dseobz.jpg'
  }
];

const Timeline: React.FC = () => {
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
            Timeline Cinta
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Perjalanan cinta kita dari awal hingga sekarang, setiap momen adalah bagian dari cerita yang indah
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-rose-500 to-purple-500 h-full rounded-full" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-rose-100">
                    <div className="flex items-center mb-3">
                      <div className={`${event.color} text-white p-2 rounded-full mr-3 ${index % 2 !== 0 ? 'order-2 ml-3 mr-0' : ''}`}>
                        {event.icon}
                      </div>
                      <span className="text-rose-600 font-semibold text-sm">{event.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 font-['Poppins']">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {event.image && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-rose-500 rounded-full shadow-lg z-10">
                  <div className="absolute inset-1 bg-rose-500 rounded-full animate-pulse" />
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Timeline Hint */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-2 font-['Dancing_Script']">
              Dan Cerita Kita Berlanjut...
            </h3>
            <p className="text-rose-100">
              Masih banyak halaman kosong yang menanti untuk diisi dengan kenangan indah bersama ✨
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;