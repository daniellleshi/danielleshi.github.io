
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Home, Copy, Users, Clock, Target, Zap } from 'lucide-react';

function GameSetupPage() {
  const navigate = useNavigate();
  const { state, actions } = useGame();
  const { toast } = useToast();
  
  const [gameCode, setGameCode] = useState('');
  const [team1Players, setTeam1Players] = useState(['', '']);
  const [team2Players, setTeam2Players] = useState(['', '']);
  const [team1Guesser, setTeam1Guesser] = useState('');
  const [team2Guesser, setTeam2Guesser] = useState('');

  useEffect(() => {
    // Generate game code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameCode(code);
    actions.setGameId(code);
  }, [actions]);

  const handleStartGame = () => {
    // Validate form
    if (!team1Players[0] || !team1Players[1] || !team2Players[0] || !team2Players[1]) {
      toast({
        title: "Errore",
        description: "Inserisci i nomi di tutti i giocatori",
        variant: "destructive"
      });
      return;
    }

    if (!team1Guesser || !team2Guesser) {
      toast({
        title: "Errore", 
        description: "Inserisci i nomi degli indovinatori",
        variant: "destructive"
      });
      return;
    }

    // Update teams
    actions.updateTeam('team1', {
      players: team1Players,
      guesser: team1Guesser
    });
    
    actions.updateTeam('team2', {
      players: team2Players,
      guesser: team2Guesser
    });

    actions.setGameState('playing');
    navigate('/game');
  };

  const copyGameCode = () => {
    navigator.clipboard.writeText(gameCode);
    toast({
      title: "Codice copiato!",
      description: "Il codice della partita è stato copiato negli appunti"
    });
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
        className="w-full max-w-6xl mx-auto space-y-8 relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold gradient-text text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Configurazione Partita
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Code */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Codice Partita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-xl mb-4">
                    {gameCode}
                  </div>
                  <Button
                    onClick={copyGameCode}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copia Codice
                  </Button>
                </div>
                <p className="text-white/70 text-sm text-center">
                  Condividi questo codice con gli indovinatori per farli unire alla partita
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Settings */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Impostazioni
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Difficoltà</Label>
                  <Select
                    value={state.difficulty}
                    onChange={(e) => actions.setDifficulty(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  >
                    <option value="easy" className="text-black">Facile (nessuna penalità)</option>
                    <option value="hard" className="text-black">Difficile (-1 per errori)</option>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Timer (secondi)</Label>
                  <Select
                    value={state.timerDuration}
                    onChange={(e) => actions.setTimerDuration(parseInt(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                  >
                    <option value={30} className="text-black">30 secondi</option>
                    <option value={60} className="text-black">60 secondi</option>
                    <option value={90} className="text-black">90 secondi</option>
                    <option value={120} className="text-black">120 secondi</option>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Passi massimi</Label>
                  <Select
                    value={state.maxPasses}
                    onChange={(e) => actions.setMaxPasses(parseInt(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                  >
                    <option value={3} className="text-black">3 passi</option>
                    <option value={5} className="text-black">5 passi</option>
                    <option value={10} className="text-black">10 passi</option>
                    <option value={999} className="text-black">Infiniti</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Connected Devices */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Dispositivi Collegati
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {state.connectedDevices.length === 0 ? (
                    <p className="text-white/70 text-sm text-center py-4">
                      Nessun indovinatore collegato ancora
                    </p>
                  ) : (
                    state.connectedDevices.map((device, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white text-sm">{device.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Teams Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Squadra 1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Giocatore 1</Label>
                  <Input
                    value={team1Players[0]}
                    onChange={(e) => setTeam1Players([e.target.value, team1Players[1]])}
                    placeholder="Nome del primo giocatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Giocatore 2</Label>
                  <Input
                    value={team1Players[1]}
                    onChange={(e) => setTeam1Players([team1Players[0], e.target.value])}
                    placeholder="Nome del secondo giocatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Indovinatore</Label>
                  <Input
                    value={team1Guesser}
                    onChange={(e) => setTeam1Guesser(e.target.value)}
                    placeholder="Nome dell'indovinatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Squadra 2
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Giocatore 1</Label>
                  <Input
                    value={team2Players[0]}
                    onChange={(e) => setTeam2Players([e.target.value, team2Players[1]])}
                    placeholder="Nome del primo giocatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Giocatore 2</Label>
                  <Input
                    value={team2Players[1]}
                    onChange={(e) => setTeam2Players([team2Players[0], e.target.value])}
                    placeholder="Nome del secondo giocatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Indovinatore</Label>
                  <Input
                    value={team2Guesser}
                    onChange={(e) => setTeam2Guesser(e.target.value)}
                    placeholder="Nome dell'indovinatore"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Start Game Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-xl neon-glow transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Inizia la Partita
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default GameSetupPage;
