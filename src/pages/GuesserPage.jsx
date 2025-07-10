
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Home, Clock, Trophy, SkipForward, Square, Smartphone } from 'lucide-react';

function GuesserPage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const { toast } = useToast();
  
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    // Simulate checking if it's this guesser's turn
    // In a real app, this would be synchronized with the main game
    const interval = setInterval(() => {
      setIsMyTurn(Math.random() > 0.5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStop = () => {
    toast({
      title: "Timer fermato!",
      description: "Dai la tua risposta ai giocatori"
    });
  };

  const handlePass = () => {
    toast({
      title: "Parola passata",
      description: "Aspetta la prossima parola"
    });
  };

  // Mock data for demonstration
  const mockGameState = {
    timeRemaining: 45,
    currentTeam: 'team1',
    teams: {
      team1: { name: 'Squadra 1', score: 3, passes: 1 },
      team2: { name: 'Squadra 2', score: 2, passes: 0 }
    },
    maxPasses: 3,
    gameId: state.gameId || 'ABC123'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
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
        className="w-full max-w-md mx-auto space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center neon-glow floating">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Indovinatore
          </h1>
          
          <p className="text-lg text-white/80">
            Partita: {mockGameState.gameId}
          </p>
        </motion.div>

        {/* Game Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">
                {isMyTurn ? 'È il tuo turno!' : `Turno di ${mockGameState.teams[mockGameState.currentTeam].name}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Timer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white">Tempo rimanente</span>
                </div>
                <div className={`text-4xl font-bold ${mockGameState.timeRemaining <= 10 ? 'text-red-400 pulse-animation' : 'text-white'}`}>
                  {Math.floor(mockGameState.timeRemaining / 60)}:{(mockGameState.timeRemaining % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Scores */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-white" />
                  <span className="text-white">Punteggi</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between p-2 bg-white/10 rounded-lg">
                    <span className="text-white/80">{mockGameState.teams.team1.name}</span>
                    <span className="text-white font-bold">{mockGameState.teams.team1.score}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/10 rounded-lg">
                    <span className="text-white/80">{mockGameState.teams.team2.name}</span>
                    <span className="text-white font-bold">{mockGameState.teams.team2.score}</span>
                  </div>
                </div>
              </div>

              {/* Passes */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SkipForward className="w-5 h-5 text-white" />
                  <span className="text-white">Passi utilizzati</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {mockGameState.teams[mockGameState.currentTeam].passes} / {mockGameState.maxPasses}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-white font-semibold">Controlli di Gioco</h3>
                  <p className="text-white/70 text-sm">
                    {isMyTurn ? 'Ascolta i suggerimenti e prendi la tua decisione' : 'Aspetta il tuo turno'}
                  </p>
                </div>

                <Button
                  onClick={handleStop}
                  disabled={!isMyTurn}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 text-lg font-semibold rounded-xl neon-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Square className="w-5 h-5 mr-2" />
                  STOP - Ho la risposta!
                </Button>

                <Button
                  onClick={handlePass}
                  disabled={!isMyTurn || mockGameState.teams[mockGameState.currentTeam].passes >= mockGameState.maxPasses}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-4 text-lg font-semibold rounded-xl neon-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <SkipForward className="w-5 h-5 mr-2" />
                  PASSA - Troppo difficile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-2 text-center">Istruzioni</h3>
              <div className="space-y-1 text-white/70 text-sm">
                <p>• Ascolta attentamente i suggerimenti</p>
                <p>• Premi STOP quando hai la risposta</p>
                <p>• Usa PASSA per parole troppo difficili</p>
                <p>• I passi sono limitati, usali con saggezza!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
            <span className="text-sm">Connesso alla partita</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default GuesserPage;
