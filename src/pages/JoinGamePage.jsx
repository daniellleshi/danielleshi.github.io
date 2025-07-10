
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Home, Smartphone, Wifi } from 'lucide-react';

function JoinGamePage() {
  const navigate = useNavigate();
  const { actions } = useGame();
  const { toast } = useToast();
  
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleJoinGame = async () => {
    if (!gameCode.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci il codice della partita",
        variant: "destructive"
      });
      return;
    }

    if (!playerName.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci il tuo nome",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);

    // Simulate connection delay
    setTimeout(() => {
      actions.setGameId(gameCode.toUpperCase());
      actions.addConnectedDevice({
        id: Date.now(),
        name: playerName,
        role: 'guesser'
      });
      
      toast({
        title: "Connesso!",
        description: "Ti sei unito alla partita con successo"
      });
      
      navigate('/guesser');
      setIsConnecting(false);
    }, 2000);
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
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center neon-glow floating">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Unisciti alla Partita
          </h1>
          
          <p className="text-xl text-white/80">
            Inserisci il codice della partita per collegarti come indovinatore
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                <Wifi className="w-5 h-5" />
                Connessione
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Codice Partita</Label>
                <Input
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  placeholder="Inserisci il codice (es. ABC123)"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center text-lg font-mono"
                  maxLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Il tuo Nome</Label>
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Come ti chiami?"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                onClick={handleJoinGame}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl neon-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Connessione in corso...
                  </div>
                ) : (
                  'Unisciti alla Partita'
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="glass-effect border-white/20 p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Come Indovinatore:</h3>
            <div className="space-y-1 text-white/70 text-sm">
              <p>• Ascolterai i suggerimenti dei tuoi compagni</p>
              <p>• Potrai fermare il timer per dare la risposta</p>
              <p>• Userai i "passi" per saltare parole difficili</p>
              <p>• Vedrai il punteggio in tempo reale</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default JoinGamePage;
