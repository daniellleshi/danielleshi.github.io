
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { GameProvider } from '@/contexts/GameContext';
import WelcomePage from '@/pages/WelcomePage';
import RoleSelectionPage from '@/pages/RoleSelectionPage';
import GameSetupPage from '@/pages/GameSetupPage';
import JoinGamePage from '@/pages/JoinGamePage';
import GamePage from '@/pages/GamePage';
import GuesserPage from '@/pages/GuesserPage';
import ResultsPage from '@/pages/ResultsPage';

function App() {
  return (
    <GameProvider>
      <Router>
        <Helmet>
          <title>Gioco Indovina la Parola - Sfida di Squadra</title>
          <meta name="description" content="Un emozionante gioco di squadra dove due team si sfidano per indovinare le parole. Connetti più dispositivi e divertiti con i tuoi amici!" />
        </Helmet>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route path="/game-setup" element={<GameSetupPage />} />
            <Route path="/join-game" element={<JoinGamePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/guesser" element={<GuesserPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
