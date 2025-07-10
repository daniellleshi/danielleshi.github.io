import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';
import { getNewWord } from '@/services/wordService';
import { ArrowLeft, Home, Play, Pause, SkipForward, CheckCircle, XCircle, Clock, Trophy, Users, Loader } from 'lucide-react';

function GamePage() {
  const navigate = useNavigate();
  const { state, actions } = useGame();
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswerDialog, setShowAnswerDialog] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isFetchingWord, setIsFetchingWord] = useState(false);

  const generateNewWord = useCallback(async () => {
    setIsFetchingWord(true);
    try {
      const newWord = await getNewWord();
      actions.setCurrentWord(newWord);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare una nuova parola. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsFetchingWord(false);
    }
  }, [actions, toast]);

  useEffect(() => {
    if (state.gameState === 'playing' && !state.currentWord) {
      generateNewWord();
    }
  }, [state.gameState, state.currentWord, generateNewWord]);

  useEffect(() => {
    let timer;
    if (isPlaying && state.timeRemaining > 0) {
      timer = setInterval(() => {
        actions.setTimeRemaining(state.timeRemaining - 1);
      }, 1000);
    } else if (state.timeRemaining === 0 && isPlaying) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [isPlaying, state.timeRemaining, actions]);

  const handleTimeUp = () => {
    setIsPlaying(false);
    const nextTeam = state.currentTeam === 'team1' ? 'team2' : 'team1';
    
    // Controlla se entrambe le squadre hanno giocato
    if (state.currentTeam === 'team2') {
        navigate('/results');
        return;
    }
    
    actions.setCurrentTeam(nextTeam);
    actions.setTimeRemaining(state.timerDuration);
    actions.setCurrentWord('');
    generateNewWord();
    
    toast({
      title: "Tempo Scaduto!",
      description: `Ora tocca a ${state.teams[nextTeam].name}`
    });
  };

  const handleStartPause = () => {
    if (state.currentWord) {
      setIsPlaying(!isPlaying);
      toast({
        title: !isPlaying ? "Timer Avviato!" : "Timer in Pausa",
        description: "La sfida continua!",
      });
    } else {
      toast({
        title: "Parola Mancante",
        description: "Attendi il caricamento di una nuova parola.",
        variant: "destructive"
      });
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowAnswerDialog(true);
  };

  const handlePass = () => {
    const currentTeam = state.teams[state.currentTeam];
    if (currentTeam.passes >= state.maxPasses) {
      toast({
        title: "Passi Esauriti!",
        description: "Non puoi più saltare parole.",
        variant: "destructive"
      });
      return;
    }

    actions.updateTeam(state.currentTeam, {
      passes: currentTeam.passes + 1,
      words: [...currentTeam.words, { word: state.currentWord, result: 'passed' }]
    });

    generateNewWord();
    setCurrentPlayerIndex((prev) => (prev + 1) % 2);
    toast({
      title: "Parola Saltata",
      description: `Restano ${state.maxPasses - (currentTeam.passes + 1)} passi.`
    });
  };

  const handleAnswerResult = (isCorrect) => {
    const currentTeam = state.teams[state.currentTeam];
    let scoreChange = 0;
    
    if (isCorrect) {
      scoreChange = 1;
    } else if (state.difficulty === 'hard') {
      scoreChange = -1;
    }

    actions.updateTeam(state.currentTeam, {
      score: currentTeam.score + scoreChange,
      words: [...currentTeam.words, { 
        word: state.currentWord, 
        result: isCorrect ? 'correct' : 'wrong' 
      }]
    });

    setShowAnswerDialog(false);
    generateNewWord();
    setCurrentPlayerIndex((prev) => (prev + 1) % 2);
    
    toast({
      title: isCorrect ? "Risposta Corretta! +1" : "Risposta Sbagliata!",
      description: `Punteggio attuale: ${currentTeam.score + scoreChange}`,
      variant: isCorrect ? 'default' : 'destructive'
    });
  };
  
  const currentTeamData = state.teams[state.currentTeam];
  const currentPlayer = currentTeamData.players[currentPlayerIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0D051F] tech-grid-background">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D051F] via-transparent to-[#0D051F]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.3)_0,_rgba(139,92,246,0)_50%)]"></div>

      <div className="absolute top-6 left-6 flex gap-4 z-20">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-white/70 hover:bg-white/10 hover:text-white p-3 rounded-full"> <ArrowLeft className="w-5 h-5" /> </Button>
        <Button variant="ghost" onClick={() => navigate('/')} className="text-white/70 hover:bg-white/10 hover:text-white p-3 rounded-full"> <Home className="w-5 h-5" /> </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-5xl mx-auto space-y-6 relative z-10"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold uppercase tracking-wider neon-text">
            Turno di {currentTeamData.name}
          </h1>
          <p className="text-xl text-fuchsia-300/80 mt-2">
            Suggeritore: <span className="font-bold">{currentPlayer}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card border-fuchsia-500/20 text-center">
            <CardHeader><CardTitle className="text-fuchsia-300"><Clock className="inline mr-2"/>Timer</CardTitle></CardHeader>
            <CardContent>
              <div className={`text-5xl font-orbitron font-bold ${state.timeRemaining <= 10 && state.timeRemaining > 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {Math.floor(state.timeRemaining / 60)}:{(state.timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-fuchsia-500/20 text-center">
            <CardHeader><CardTitle className="text-fuchsia-300"><Trophy className="inline mr-2"/>Punteggio</CardTitle></CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-white">{currentTeamData.score}</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-fuchsia-500/20 text-center">
            <CardHeader><CardTitle className="text-fuchsia-300"><SkipForward className="inline mr-2"/>Passi</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {currentTeamData.passes} / {state.maxPasses === 999 ? '∞' : state.maxPasses}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card border-fuchsia-500/40 min-h-[250px] flex items-center justify-center">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl text-white/80 mb-4 font-orbitron">Parola Target</h2>
            <div className="relative">
              <AnimatePresence>
                {isFetchingWord ? (
                   <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader className="w-24 h-24 text-fuchsia-500 animate-spin" />
                   </motion.div>
                ) : (
                  <motion.div
                    key={state.currentWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl md:text-8xl font-black font-orbitron tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-fuchsia-500"
                  >
                    {state.currentWord}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            onClick={handleStartPause}
            disabled={isFetchingWord || !state.currentWord}
            className={`w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wider ${
              isPlaying 
                ? 'bg-gradient-to-r from-red-600 to-pink-600 neon-button' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 neon-button'
            }`}
          >
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? 'Pausa' : 'Avvia'}
          </Button>

          <Button
            onClick={handleStop}
            disabled={!isPlaying || isFetchingWord}
            className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-8 py-6 text-lg font-bold rounded-xl neon-button transform hover:scale-105 transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
          >
            Stop - Risposta
          </Button>

          <Button
            onClick={handlePass}
            disabled={!isPlaying || isFetchingWord || currentTeamData.passes >= state.maxPasses}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-6 text-lg font-bold rounded-xl neon-button transform hover:scale-105 transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
          >
            <SkipForward className="w-6 h-6 mr-2" />
            Passa
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAnswerDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-card border-fuchsia-500/50 p-8 rounded-2xl max-w-md w-full text-center"
            >
              <h3 className="text-3xl font-orbitron font-bold text-white mb-4">Risposta Data?</h3>
              <p className="text-white/80 text-lg mb-2">
                Parola:
              </p>
               <p className="font-bold text-4xl mb-8 gradient-text font-orbitron">{state.currentWord}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => handleAnswerResult(true)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-lg rounded-xl neon-button"
                >
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Corretta
                </Button>
                <Button
                  onClick={() => handleAnswerResult(false)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 text-lg rounded-xl neon-button"
                >
                  <XCircle className="w-6 h-6 mr-2" />
                  Sbagliata
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GamePage;