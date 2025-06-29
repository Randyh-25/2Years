import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingSection from './components/LandingSection';
import MemoryGallery from './components/MemoryGallery';
import Timeline from './components/Timeline';
import LoveLetter from './components/LoveLetter';
import LoveQuiz from './components/LoveQuiz';
import WishForm from './components/WishForm';
import Navigation, { MobileNavigation } from './components/Navigation';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const sections = [
    'landing',
    'gallery', 
    'timeline',
    'letter',
    'quiz',
    'wishes'
  ];

  useEffect(() => {
    // Initialize ambient music
    const audio = new Audio('/backsound.mp3'); // Ganti path sesuai nama file backsound kamu
    audio.loop = true;
    audio.volume = 0.3;
    setAudioElement(audio);

    if (isMusicPlaying) {
      audio.play().catch(console.log);
    }

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const toggleMusic = () => {
    if (audioElement) {
      if (isMusicPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch(console.log);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const scrollTo = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-hidden">
      {/* Music Control */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 border border-white/30"
      >
        {isMusicPlaying ? (
          <Volume2 className="w-5 h-5 text-rose-600" />
        ) : (
          <VolumeX className="w-5 h-5 text-rose-600" />
        )}
      </motion.button>

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={scrollTo}
        sections={sections}
      />
      <MobileNavigation 
        currentSection={currentSection} 
        onSectionChange={scrollTo}
        sections={sections}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {currentSection === 0 && <LandingSection onNext={() => scrollTo(1)} />}
          {currentSection === 1 && <MemoryGallery />}
          {currentSection === 2 && <Timeline />}
          {currentSection === 3 && <LoveLetter />}
          {currentSection === 4 && <LoveQuiz />}
          {currentSection === 5 && <WishForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;