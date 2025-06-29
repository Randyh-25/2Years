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
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186204/1_a02kg2.jpg',
    caption: 'Momen Pertama Kita',
    date: '8 Agustus 2022',
    story: 'Hari ketika semuanya dimulai dengan bertemu dirimu di Embung A ITERA💕',
    backText: 'Awal dari segalanya dimulai dari sini. Kita bertemu di Embung A, disana kamu duduk disebelahku. Aku masih ingat betapa gugupnya aku saat itu, tapi senyummu membuatku merasa tenang. Sejak hari itu, hidupku berubah selamanya. 💖'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186186/2_srh6cq.jpg',
    caption: 'Foto Pertama',
    date: '20 Agustus 2022',
    story: 'Gugup tapi bahagia, hati berdebar tapi tenang bersamamu ✨',
    backText: 'Foto pertama kita yang canggung tapi manis. Aku masih ingat betapa gugupnya aku waktu itu, tapi kamu berhasil membuatku merasa nyaman. 💕'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186194/5_nsejpi.jpg',
    caption: 'Ke DIY Pertama',
    date: '03 September 2023',
    story: 'Inget ini tidak?',
    backText: 'Kita menggambar kenangan indah yang selalu terukir dan menempel di dinding kosan'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186155/6_crgj5m.jpg',
    caption: 'Beli Seblak Pertama',
    date: '06 September 2023',
    story: 'Ini momen yang tak terlupakan, beli seblak pertama kita berdua di pinggir jalan 🌶️',
    backText: 'Malam itu kamu pengen makan seblak, jadi kita ke belwis buat beli seblak. Kita duduk di pinggir jalan sambil menunggu abangnya buatin pesenan kita 🌶️❤️'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186156/7_iftmht.jpg',
    caption: 'Nonton Bioskop Pertama',
    date: '08 September 2023',
    story: 'Nonton bioskop pertama kita berdua, rasanya seperti mimpi yang jadi kenyataan 🍿',
    backText: 'Ini momen yang sangat spesial, nonton bioskop pertama kita berdua. Kita nonton film horror, dan aku masih ingat betapa bahagianya kita saat itu. 🍿❤️'
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186161/8_rxqxra.jpg',
    caption: 'Mengantar Kamu ke Kampus',
    date: '29 September 2023',
    story: 'Hari itu aku mengantar kamu ke kampus karena kamu ada acara WCD',
    backText: 'Ini salah satu momen aku mengantar kamu ke kampus. Kita ngobrol sepanjang jalan, dan aku merasa sangat bahagia bisa menghabiskan waktu bersamamu. 💕'
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186154/9_au5bhc.jpg',
    caption: 'Healing ke Embung Kebun Raya',
    date: '1 Oktober 2023',
    story: 'Hari itu kita pergi ke Embung Kebun Raya untuk healing, menikmati keindahan alam dan kebersamaan kita 🌳',
    backText: 'Hari itu kita pergi ke Embung Kebun Raya untuk healing. Kita duduk di tepi embung, menikmati keindahan alam dan kebersamaan kita. Aku masih ingat betapa bahagianya aku saat itu, melihat senyummu yang cerah. 🌳❤️'
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186172/10_il62b4.jpg',
    caption: 'Jalan-Jalan ke Kemiling',
    date: '15 Oktober 2023',
    story: 'Hari itu kita jalan-jalan ke Kemiling, menikmati suasana bukit dan berbagi cerita',
    backText: 'Hari dimana kita jalan-jalan ke atas bukit kemiling, menikmati sejuknya udara disana, dan jauh dari kota yang berisik. Kita berbagi cerita, tertawa, dan menikmati momen-momen kecil yang membuat kita semakin dekat. 🌄❤️'
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186171/11_dw35vs.jpg',
    caption: 'Kamu & Rusa Kemiling',
    date: '15 Oktober 2023',
    story: 'Kamu berfoto dengan rusa di Kemiling, momen lucu dan menggemaskan 🦌',
    backText: 'Kamu terlihat sangat bahagia saat berfoto dengan rusa itu. Momen yang tak terlupakan! 🦌❤️'
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186165/12_rpkxut.jpg',
    caption: 'Bersantai di Taman Kemiling',
    date: '15 Oktober 2023',
    story: 'Hari itu kita bersantai di taman Kemiling, menikmati suasana yang tenang dan damai 🌼',
    backText: 'Momen yang sangat menenangkan, kita duduk di bangku taman sambil menikmati sosis favoritmu dan berbincang ringan. 🌼❤️'
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186173/13_vnejg5.jpg',
    caption: 'Ke Pantai Pertama Kali',
    date: '12 November 2023',
    story: 'Hari itu kita pergi ke pantai pasir putih untuk pertama kalinya, merasakan pasir dan ombak bersama 🌊',
    backText: 'Momen yang sangat spesial, kita bermain di pantai, merasakan ombak yang datang dan pergi. Aku masih ingat betapa bahagianya kita saat itu. 🌊❤️'
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186170/14_zjjsro.jpg',
    caption: 'Salah Satu Kegiatan di Kosan(Iseng)',
    date: '21 November 2023',
    story: 'Salah satu kegiatan iseng kita di kosan, membuat kenangan kecil yang berarti',
    backText: 'Salah satu momen iseng kita di kosan, kita membuat kenangan kecil yang berarti. Kita tertawa, bercanda, dan menikmati kebersamaan kita. Momen-momen seperti ini yang membuat hubungan kita semakin kuat. ❤️'
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186181/15_r83dtk.jpg',
    caption: 'Acara Leadership Training ITERA',
    date: '09 Desember 2023',
    story: 'Hari itu kita mengikuti acara Leadership Training di ITERA, belajar banyak hal baru dan memperkuat hubungan kita',
    backText: 'Momen yang sangat berharga, kita belajar banyak hal baru dan saling mendukung satu sama lain. Aku merasa hubungan kita semakin kuat setelah mengikuti acara ini. ❤️'
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186176/16_lr8ssk.jpg',
    caption: 'Tahun Baru 2024',
    date: '31 Desember 2023',
    story: 'Malam tahun baru yang penuh harapan dan kebahagiaan, merayakan bersama orang yang paling aku sayang 🎉',
    backText: 'Momen yang sangat spesial, kita merayakan tahun baru dengan penuh suka cita. Aku bersyukur bisa menghabiskan waktu bersamamu. 🎉❤️'
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186175/17_o70huq.jpg',
    caption: 'Bahagia',
    date: '17 Februari 2024',
    story: 'Kita tertawa bahagia atas apapun yang kita lakukan, momen yang selalu aku ingat',
    backText: 'Ini kita iseng foto bareng, entah apa yang kita tertawakan saat itu, tapi aku ingat betapa bahagianya kita. Momen-momen seperti ini yang membuat hidupku terasa lengkap. ❤️'
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186179/18_rxmoq2.jpg',
    caption: 'Keliling Gramedia',
    date: '3 Maret 2024',
    story: 'Keliling Gramedia, melihat buku-buku yang kita suka, berbagi cerita dan impian',
    backText: 'Keliling Gramedia adalah salah satu kegiatan favorit kita. Kita melihat buku-buku yang kita suka, berbagi cerita dan impian. Aku merasa sangat beruntung bisa menghabiskan waktu bersamamu di tempat yang kita cintai ini. 📚❤️'
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186184/19_uat0co.jpg',
    caption: 'Ke Pantai di Daerah Panjang',
    date: '09 Maret 2024',
    story: 'Hari itu kita pergi ke pantai di daerah Panjang, menikmati suasana pantai yang indah dan berbagi cerita',
    backText: 'Hari itu kita pergi ke pantai di daerah Panjang, menikmati suasana pantai yang indah. Kita berjalan di tepi pantai, merasakan pasir di kaki kita, dan berbagi cerita tentang impian dan harapan kita. Momen-momen seperti ini yang membuatku semakin mencintaimu. 🌊❤️'
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186181/20_xihwxe.jpg',
    caption: 'Jalan-Jalan ke Pasar Malam',
    date: '20 April 2024',
    story: 'Jalan-jalan ke pasar malam, menikmati suasana yang ramai dan berbagi kebahagiaan',
    backText: 'Aku ingat dimana kamu ingin menggunakan dress kamu yang baru, jadi kita pergi ke pasar malam. Kita menikmati suasana yang ramai, mencicipi makanan enak, dan berbagi kebahagiaan. Momen-momen seperti ini yang membuat hidupku terasa lengkap. 🎡❤️'
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186160/21_jkxuik.jpg',
    caption: 'Jalan-Jalan ke Pasar Malam #2',
    date: '31 Juli 2024',
    story: 'Jalan-jalan ke pasar malam lagi, kali ini dengan suasana yang lebih ceria dan penuh warna 🎠',
    backText: 'Setelah terpisah karena libur kuliah, kita akhirnya bisa jalan-jalan ke pasar malam lagi. Kita menikmati suasana yang lebih ceria dan penuh warna. Aku merasa sangat beruntung bisa menghabiskan waktu bersamamu di tempat yang kita cintai ini. 🎠❤️'
  },
  {
    id: 20,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186165/22_fhhgcn.jpg',
    caption: 'Masih di Embung Kebun Raya',
    date: '1 November 2024',
    story: 'Masih di Embung Kebun Raya, menikmati suasana yang tenang dan damai',
    backText: 'Embung ini adalah tempat yang sangat spesial bagi kita. Kita sering datang ke sini untuk bersantai, berbagi cerita, dan menikmati keindahan alam. Aku merasa sangat beruntung bisa menghabiskan waktu bersamamu di tempat yang kita cintai ini. 🌳❤️'
  },
  {
    id: 21,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186169/24_cwpy6r.jpg',
    caption: 'Seminar Hasil Kuliah Praktek',
    date: '04 November 2024',
    story: 'Seminar hasil kuliah praktek, momen yang penuh kebanggaan dan harapan untuk masa depan',
    backText: 'Hari itu kamu berhasil menyelesaikan seminar hasil kuliah praktek dengan baik. Aku merasa sangat bangga padamu. Momen-momen seperti ini yang membuatku semakin mencintaimu. Aku yakin masa depan kita akan cerah bersama. 🌟❤️'
  },
  {
    id: 22,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186163/23_jloaka.jpg',
    caption: 'Foto Bersama',
    date: '04 November 2024',
    story: 'Setelah selesai seminar kita foto bersama',
    backText: 'Momen ini sangat spesial bagi kita. Kita bisa mengabadikan kenangan indah ini dan mengenangnya di masa depan. 📸❤️'
  },
  {
    id: 23,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186173/25_ylu23a.jpg',
    caption: 'Ulang Tahun Kamu',
    date: '25 Desember 2024',
    story: 'Selamat ulang tahun sayang! Hari ini adalah hari spesial untukmu, aku berharap semua impianmu tercapai 🎂',
    backText: 'Selamat ulang tahun sayang! Hari ini adalah hari spesial untukmu, aku berharap semua impianmu tercapai. Aku sangat bersyukur bisa menghabiskan waktu bersamamu di hari istimewa ini. 🎂❤️'
  },
  {
    id: 24,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186177/26_nwoa0v.jpg',
    caption: 'Tahun Baru Kita Yang Kedua',
    date: '31 Desember 2024',
    story: 'Malam tahun baru yang penuh harapan dan kebahagiaan, merayakan bersama orang yang paling aku sayang 🎉',
    backText: 'Momen ini sangat spesial bagi kita. Kita bisa mengabadikan kenangan indah ini dan mengenangnya di masa depan. 🎉❤️'
  },
  {
    id: 25,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186179/27_djkqv4.jpg',
    caption: 'Masih di Tahun Baru',
    date: '31 Desember 2025',
    story: 'Senyum bahagia di tahun baru, berharap semua impian kita tercapai di tahun ini',
    backText: 'Aku masih ingat betapa bahagianya kita saat itu, melihat kembang api yang indah dan merayakan tahun baru bersama. Aku berharap tahun ini akan menjadi tahun yang penuh kebahagiaan dan kesuksesan bagi kita berdua. 🎇❤️'
  },
  {
    id: 26,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186184/28_ajcijt.jpg',
    caption: 'Nonton Komang di Bioskop',
    date: '12 April 2025',
    story: 'Hari dimana kita nonton film Komang di bioskop, momen yang penuh tawa dan kebahagiaan',
    backText: 'Aku masih ingat kamu menangis karena haru di akhir film. Momen itu sangat berarti bagi kita berdua. 🎬❤️'
  },
  {
    id: 27,
    url: 'https://res.cloudinary.com/dwfz1iaay/image/upload/v1751186195/29_qu0yhu.jpg',
    caption: 'Masih Dengan Kebun Raya',
    date: '15 April 2025',
    story: 'Masih di Kebun Raya, menikmati suasana yang tenang dan damai',
    backText: 'Aku merasa sangat beruntung bisa menghabiskan waktu bersamamu di tempat yang kita cintai ini. 🌳❤️'
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