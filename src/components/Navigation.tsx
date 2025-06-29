import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, Clock, Mail, HelpCircle, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
  sections: string[];
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange, sections }) => {
  const icons = [
    <Heart className="w-4 h-4" />,
    <Camera className="w-4 h-4" />,
    <Clock className="w-4 h-4" />,
    <Mail className="w-4 h-4" />,
    <HelpCircle className="w-4 h-4" />,
    <MessageCircle className="w-4 h-4" />
  ];

  const labels = [
    'Beranda',
    'Galeri',
    'Timeline',
    'Surat',
    'Kuis',
    'Harapan'
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.button
              key={section}
              onClick={() => onSectionChange(index)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                currentSection === index
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'text-rose-600 hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {icons[index]}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                  {labels[index]}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;