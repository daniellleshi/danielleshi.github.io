
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Medal, Star, Home, RotateCcw, Users } from 'lucide-react';

function ResultsPage() {
  const navigate = useNavigate();
  const { state, actions } = useGame();

  // Calculate winner
  const team1 = state.teams.team1;
  const team2 = state.teams.team2;
  
  let winner = null;
  let isDraw = false;
  
  if (team1.score > team2.score) {
    winner = 'team1';
  } else if (team2.score > team1.score) {
    winner = 'team2';
  } else {
    // Same score, check passes
    if (team1.passes < team2.passes) {
      winner = 'team1';
    } else if (team2.passes < team1.passes) {
      winner = 'team2';
    } else {
      isDraw = true;
    }
  }

  const winnerTeam = winner ? state.teams[winner] : null;

  const handleNewGame = () => {
    actions.resetGame();
    navigate('/role-selection');
  };

  const handleBackHome = () => {
    actions.resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-4xl mx-auto space-y-8 relative z-10"
      >
        {/* Winner Announcement */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        >
          <div className="flex justify-center">
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center neon-glow"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
          </div>

          {isDraw ? (
            <div>
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                Pareggio! 🤝
              </h1>
              <p className="text-2xl text-white/80 mt-4">
                Entrambe le squadre hanno giocato alla perfezione!
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                {winnerTeam?.name} Vince! 🎉
              </h1>
              <p className="text-2xl text-white/80 mt-4">
                Congratulazioni per la vittoria!
              </p>
            </div>
          )}
        </motion.div>

        {/* Final Scores */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Team 1 */}
          <Card className={`glass-effect border-white/20 ${winner === 'team1' ? 'neon-glow border-yellow-400/50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {winner === 'team1' && <Trophy className="w-6 h-6 text-yellow-400" />}
                {winner !== 'team1' && !isDraw && <Medal className="w-6 h-6 text-gray-400" />}
                {isDraw && <Star className="w-6 h-6 text-yellow-400" />}
                {team1.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{team1.score}</div>
                <div className="text-white/70">Punti</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Passi utilizzati:</span>
                  <span className="text-white">{team1.passes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Parole totali:</span>
                  <span className="text-white">{team1.words?.length || 0}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Giocatori
                </h4>
                <div className="space-y-1 text-sm">
                  {team1.players?.map((player, index) => (
                    <div key={index} className="text-white/70">• {player}</div>
                  ))}
                  <div className="text-white/70">• {team1.guesser} (Indovinatore)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team 2 */}
          <Card className={`glass-effect border-white/20 ${winner === 'team2' ? 'neon-glow border-yellow-400/50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {winner === 'team2' && <Trophy className="w-6 h-6 text-yellow-400" />}
                {winner !== 'team2' && !isDraw && <Medal className="w-6 h-6 text-gray-400" />}
                {isDraw && <Star className="w-6 h-6 text-yellow-400" />}
                {team2.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{team2.score}</div>
                <div className="text-white/70">Punti</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Passi utilizzati:</span>
                  <span className="text-white">{team2.passes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Parole totali:</span>
                  <span className="text-white">{team2.words?.length || 0}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Giocatori
                </h4>
                <div className="space-y-1 text-sm">
                  {team2.players?.map((player, index) => (
                    <div key={index} className="text-white/70">• {player}</div>
                  ))}
                  <div className="text-white/70">• {team2.guesser} (Indovinatore)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Game Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Riepilogo Partita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{state.difficulty === 'easy' ? 'Facile' : 'Difficile'}</div>
                  <div className="text-white/70 text-sm">Modalità</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{state.timerDuration}s</div>
                  <div className="text-white/70 text-sm">Timer per turno</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{state.maxPasses === 999 ? '∞' : state.maxPasses}</div>
                  <div className="text-white/70 text-sm">Passi massimi</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            onClick={handleNewGame}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl neon-glow transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nuova Partita
          </Button>
          
          <Button
            onClick={handleBackHome}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Torna al Menu
          </Button>
        </motion.div>

        {/* Celebration Animation */}
        {!isDraw && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ResultsPage;
