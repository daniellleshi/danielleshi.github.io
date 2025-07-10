import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Trophy, Zap, Brain, Target } from 'lucide-react';

function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Due Squadre',
      description: 'Ogni squadra ha 2 giocatori e 1 indovinatore'
    },
    {
      icon: Clock,
      title: 'Timer Personalizzabile',
      description: 'Scegli la durata: 30, 60, 90 secondi o personalizzato'
    },
    {
      icon: Target,
      title: 'Passi Limitati',
      description: 'Strategia importante: usa i passi con saggezza!'
    },
    {
      icon: Brain,
      title: 'Due Modalità',
      description: 'Facile (senza penalità) o Difficile (-1 per errori)'
    },
    {
      icon: Zap,
      title: 'Multi-Dispositivo',
      description: 'Connetti smartphone e tablet con codice stanza'
    },
    {
      icon: Trophy,
      title: 'Punteggio Dinamico',
      description: 'Vince chi ha più punti, in caso di parità meno passi'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0D051F] tech-grid-background">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D051F] via-transparent to-[#0D051F]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.3)_0,_rgba(139,92,246,0)_50%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-8 relative z-10 max-w-6xl mx-auto"
      >
        <div className="space-y-6">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-28 h-28 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center neon-button">
              <Brain className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-8xl font-black font-orbitron uppercase tracking-widest neon-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Word Clash
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Il gioco di squadra più esplosivo! Due team si sfidano per indovinare le parole con suggerimenti creativi e strategia vincente.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Card className="glass-card border-fuchsia-500/20 hover:border-fuchsia-500/60 hover:bg-black/40 transition-all duration-300 h-full">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Button
            onClick={() => navigate('/role-selection')}
            className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-10 py-7 text-xl font-bold rounded-xl neon-button transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            size="lg"
          >
            Inizia la Sfida
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WelcomePage;