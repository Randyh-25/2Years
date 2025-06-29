import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

interface Photo {
  id: number;
  url: string;
  caption: string;
  date: string;
  story: string;
  backText: string; // Text untuk bagian belakang foto
}

const photos: Photo[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Momen Pertama Kita',
    date: '31 Mei 2023',
    story: 'Hari ketika semuanya dimulai dengan "pagi-pagi kok galau njell?" 💕',
    backText: 'Awal dari segalanya dimulai dari sini. Sebuah balasan sederhana yang mengubah hidup kita berdua. Terima kasih sudah menjawab story-ku waktu itu, sayang. ❤️'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Kencan Pertama',
    date: '10 Juni 2023',
    story: 'Gugup tapi bahagia, hati berdebar tapi tenang bersamamu ✨',
    backText: 'Kencan pertama kita yang canggung tapi manis. Aku masih ingat betapa gugupnya aku waktu itu, tapi kamu berhasil membuatku merasa nyaman. 💕'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Hari Jadian Kita',
    date: '30 Juni 2023',
    story: 'Hari yang tidak akan pernah terlupa, awal dari selamanya 💖',
    backText: '30 Juni 2023 - Hari yang mengubah status kita menjadi "kita". Hari dimana aku berani mengungkapkan perasaanku dan kamu menerimanya dengan senyuman manis. 🥰'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/1024970/pexels-photo-1024970.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Liburan Bersama',
    date: '15 Agustus 2023',
    story: 'Setiap tempat jadi lebih indah kalau bersamamu 🌟',
    backText: 'Liburan pertama kita berdua. Setiap tempat yang kita kunjungi jadi berkesan karena ada kamu di sampingku. Semoga bisa jalan-jalan lagi ya sayang! ✈️'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Ulang Tahun Pertama',
    date: '12 November 2023',
    story: 'Merayakan hari spesialmu dengan cinta yang tak terbatas 🎂',
    backText: 'Ulang tahun pertama yang kita rayakan bersama. Melihat senyummu saat meniup lilin adalah hadiah terbaik untukku. Happy birthday my love! 🎉'
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1851148/pexels-photo-1851148.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Tahun Baru Bersama',
    date: '1 Januari 2024',
    story: 'Memulai tahun baru dengan harapan dan cinta yang sama 🎊',
    backText: 'Tahun baru pertama kita bersama. Berharap tahun ini dan tahun-tahun selanjutnya kita selalu bersama. Selamat tahun baru sayang! 🎆'
  }
];

// Create back texture with text
const createBackTexture = (text: string, caption: string, date: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle pattern
    ctx.fillStyle = '#f8f9fa';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }
    
    // Add border
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Title
    ctx.fillStyle = '#d63384';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText(caption, canvas.width / 2, 120);
    
    // Date
    ctx.fillStyle = '#6f42c1';
    ctx.font = '32px serif';
    ctx.fillText(date, canvas.width / 2, 180);
    
    // Decorative line
    ctx.strokeStyle = '#fd7e14';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 200);
    ctx.lineTo(canvas.width / 2 + 150, 200);
    ctx.stroke();
    
    // Main text
    ctx.fillStyle = '#495057';
    ctx.font = '28px serif';
    ctx.textAlign = 'left';
    
    // Word wrap for main text
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    const maxWidth = canvas.width - 120;
    
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    
    // Draw text lines
    let y = 280;
    for (const line of lines) {
      ctx.fillText(line, 60, y);
      y += 40;
    }
    
    // Add hearts decoration
    ctx.fillStyle = '#e91e63';
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('💕', 150, canvas.height - 80);
    ctx.fillText('💕', canvas.width - 150, canvas.height - 80);
    ctx.fillText('💕', canvas.width / 2, canvas.height - 50);
  }
  
  return new THREE.CanvasTexture(canvas);
};

// 3D Photo Component with flip functionality
const Photo3D: React.FC<{ photo: Photo }> = ({ photo }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [frontTexture, setFrontTexture] = useState<THREE.Texture | null>(null);
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Load front texture (photo)
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    
    loader.load(
      photo.url,
      (loadedTexture) => {
        loadedTexture.flipY = false;
        setFrontTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading front texture:', error);
        // Fallback for front
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 512, 384);
          gradient.addColorStop(0, '#ff69b4');
          gradient.addColorStop(1, '#ffd1dc');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 512, 384);
          
          ctx.fillStyle = 'white';
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('❤️ ' + photo.caption + ' ❤️', 256, 192);
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setFrontTexture(fallbackTexture);
      }
    );

    // Create back texture with text
    const backTex = createBackTexture(photo.backText, photo.caption, photo.date);
    setBackTexture(backTex);
  }, [photo]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Auto flip every 8 seconds
      const flipTime = Math.floor(state.clock.elapsedTime / 8) % 2;
      const targetRotation = flipTime * Math.PI;
      
      // Smooth rotation transition
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.02
      );
    }
  });

  if (!frontTexture || !backTexture) {
    return (
      <mesh>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
    );
  }

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Front side (photo) */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial 
            map={frontTexture}
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Back side (text) */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial 
            map={backTexture}
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Frame */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[4.2, 3.2]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Floating particles for 3D scene
const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff69b4"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface PhotoFrame3DProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoFrame3D: React.FC<PhotoFrame3DProps> = ({ photo, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-8 right-8 bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-all duration-300 border border-white/20 shadow-lg z-50"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>
      
      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />
          <pointLight position={[0, 0, 8]} intensity={0.7} color="#ffd1dc" />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          {/* 3D Photo with flip */}
          <Photo3D photo={photo} />
          
          {/* Floating Particles */}
          <FloatingParticles />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minDistance={3}
            maxDistance={12}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
          <p className="text-white/90 text-sm mb-1">
            🖱️ Drag untuk memutar • 🔄 Foto akan flip otomatis • 📱 Scroll untuk zoom
          </p>
          <p className="text-white/70 text-xs">
            ESC untuk keluar • Lihat bagian belakang foto untuk pesan spesial ✨
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MemoryGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Handle ESC key to close 3D viewer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-['Dancing_Script'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-6">
            Galeri Kenangan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Setiap foto menyimpan cerita, setiap momen adalah harta yang tak ternilai
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Klik foto untuk melihat dalam mode 3D ✨
                </p>
                <h3 className="text-white text-lg font-semibold">{photo.caption}</h3>
                <p className="text-white/80 text-sm">{photo.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center space-x-6"
        >
          <button
            onClick={prevPhoto}
            className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-rose-500 scale-125' : 'bg-rose-200'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextPhoto}
            className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* 3D Photo Viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoFrame3D
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGallery;