
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { Users, Smartphone, ArrowLeft, Home } from 'lucide-react';

function RoleSelectionPage() {
  const navigate = useNavigate();
  const { actions } = useGame();

  const handleRoleSelection = (role) => {
    actions.setRole(role);
    if (role === 'player') {
      actions.setIsHost(true);
      navigate('/game-setup');
    } else {
      navigate('/join-game');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 left-6 flex gap-4 z-20">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 p-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 p-3"
        >
          <Home className="w-5 h-5" />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-8 relative z-10 max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Scegli il tuo Ruolo
        </motion.h1>

        <motion.p
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Seleziona se vuoi essere un Giocatore (che vede le parole) o un Indovinatore (che deve indovinarle)
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Player Role */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card 
              className="glass-effect border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group h-full"
              onClick={() => handleRoleSelection('player')}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl">Giocatore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 text-center">
                  Crea una nuova partita e configura le impostazioni di gioco
                </p>
                <div className="space-y-2 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Vedi le parole target</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Dai suggerimenti creativi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Gestisci la partita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Valuti le risposte</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl">
                  Crea Partita
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guesser Role */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card 
              className="glass-effect border-white/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group h-full"
              onClick={() => handleRoleSelection('guesser')}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl">Indovinatore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 text-center">
                  Unisciti a una partita esistente con il codice stanza
                </p>
                <div className="space-y-2 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Ascolta i suggerimenti</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Indovina le parole</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Controlla il timer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Usa i passi strategicamente</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl">
                  Unisciti alla Partita
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            💡 Suggerimento: I Giocatori creano la partita, gli Indovinatori si collegano con il codice
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RoleSelectionPage;
