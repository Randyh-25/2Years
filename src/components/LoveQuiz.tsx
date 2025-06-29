import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, X, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Di mana kita pertama kali bertemu?",
    options: [
      "Di kampus saat kuliah biasa",
      "Di Embung A ITERA saat PPLK 2022",
      "Di café dekat kampus",
      "Di acara organisasi"
    ],
    correct: 1,
    explanation: "Betul sayang! Kita pertama bertemu saat PPLK 2022 di Embung A ITERA sebagai mahasiswa baru ❤️"
  },
  {
    id: 2,
    question: "Apa pesan pertama Randy ke Enjelly yang memulai semuanya?",
    options: [
      "Halo, apa kabar?",
      "Pagi-pagi kok galau njell?",
      "Ingat aku gak?",
      "Lagi ngapain?"
    ],
    correct: 1,
    explanation: "Hehe iya! Kalimat sederhana yang mengubah hidup kita berdua. Siapa sangka ya? 😘"
  },
  {
    id: 3,
    question: "Kapan kita resmi jadian?",
    options: [
      "31 Mei 2023",
      "1 Juni 2023", 
      "30 Juni 2023",
      "1 Juli 2023"
    ],
    correct: 2,
    explanation: "30 Juni 2023 - tanggal yang tak akan pernah terlupa, awal dari 'kita' yang sesungguhnya 💕"
  },
  {
    id: 4,
    question: "Apa yang Randy paling suka dari Enjelly?",
    options: [
      "Cara tertawanya yang manis",
      "Sifat perhatiannya",
      "Semuanya, dari ujung rambut sampai ujung kaki",
      "Cara bicaranya yang lucu"
    ],
    correct: 2,
    explanation: "Semua yang ada pada dirimu sempurna di mataku, sayang. Dari ujung rambut sampai ujung kaki ✨"
  },
  {
    id: 5,
    question: "Berapa lama kita sudah bersama sampai hari ini?",
    options: [
      "1 tahun 11 bulan",
      "2 tahun",
      "2 tahun 1 bulan", 
      "1 tahun 10 bulan"
    ],
    correct: 1,
    explanation: "Tepat 2 tahun kita bersama! Dan semoga sampai selamanya ya, sayangku 🥰"
  }
];

const LoveQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
      return "Perfetto! Kamu benar-benar mengenal kita dengan sempurna! 🥰";
    } else if (percentage >= 80) {
      return "Hebat! Kamu tahu hampir semua tentang kita ❤️";
    } else if (percentage >= 60) {
      return "Bagus! Tapi masih ada yang perlu kamu ingat lagi 😊";
    } else {
      return "Ayolah sayang, kamu harus lebih memperhatikan cerita kita 😘";
    }
  };

  if (quizCompleted) {
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
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl font-['Dancing_Script'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-4">
                Selamat Sayang!
              </h2>
            </motion.div>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-rose-500 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {getScoreMessage()}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Main Lagi</span>
              </motion.button>
            </div>
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
            Kuis Romantis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Seberapa baik kamu mengingat cerita cinta kita? Ayo kita lihat! 😉
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
              <span>Skor: {score}</span>
            </div>
            <div className="w-full bg-rose-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-rose-200"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center font-['Poppins']">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4 mb-8">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                        selectedAnswer === index
                          ? 'bg-rose-500 text-white border-rose-500 shadow-lg'
                          : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-white bg-white'
                            : 'border-rose-300'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                      selectedAnswer !== null
                        ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Selesai' : 'Lanjut'}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-rose-200 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6"
                >
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <div className="text-center">
                      <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-green-600 mb-4">Benar! 🎉</h3>
                    </div>
                  ) : (
                    <div className="text-center">
                      <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-red-600 mb-4">Salah 💔</h3>
                    </div>
                  )}
                </motion.div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {questions[currentQuestion].explanation}
                </p>

                {/* Floating hearts */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex justify-center space-x-2 mt-6"
                >
                  <Heart className="w-6 h-6 text-rose-400 fill-current" />
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                  <Heart className="w-6 h-6 text-rose-400 fill-current" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoveQuiz;