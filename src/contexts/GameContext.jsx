
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  gameId: null,
  role: null, // 'player' or 'guesser'
  difficulty: 'easy',
  maxPasses: 3,
  timerDuration: 60,
  teams: {
    team1: {
      name: 'Squadra 1',
      players: ['', ''],
      guesser: '',
      score: 0,
      passes: 0,
      words: []
    },
    team2: {
      name: 'Squadra 2',
      players: ['', ''],
      guesser: '',
      score: 0,
      passes: 0,
      words: []
    }
  },
  currentTeam: 'team1',
  currentWord: '',
  gameState: 'setup', // 'setup', 'playing', 'paused', 'finished'
  timeRemaining: 60,
  connectedDevices: [],
  isHost: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_GAME_ID':
      return { ...state, gameId: action.payload };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'SET_MAX_PASSES':
      return { ...state, maxPasses: action.payload };
    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.payload, timeRemaining: action.payload };
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.team]: {
            ...state.teams[action.team],
            ...action.payload
          }
        }
      };
    case 'SET_CURRENT_TEAM':
      return { ...state, currentTeam: action.payload };
    case 'SET_CURRENT_WORD':
      return { ...state, currentWord: action.payload };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: action.payload };
    case 'ADD_CONNECTED_DEVICE':
      return {
        ...state,
        connectedDevices: [...state.connectedDevices, action.payload]
      };
    case 'REMOVE_CONNECTED_DEVICE':
      return {
        ...state,
        connectedDevices: state.connectedDevices.filter(device => device.id !== action.payload)
      };
    case 'SET_IS_HOST':
      return { ...state, isHost: action.payload };
    case 'RESET_GAME':
      return { ...initialState };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('wordGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        Object.keys(parsedState).forEach(key => {
          if (key === 'teams') {
            Object.keys(parsedState.teams).forEach(teamKey => {
              dispatch({
                type: 'UPDATE_TEAM',
                team: teamKey,
                payload: parsedState.teams[teamKey]
              });
            });
          } else {
            dispatch({
              type: `SET_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`,
              payload: parsedState[key]
            });
          }
        });
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('wordGameState', JSON.stringify(state));
  }, [state]);

  const value = {
    state,
    dispatch,
    actions: {
      setGameId: (id) => dispatch({ type: 'SET_GAME_ID', payload: id }),
      setRole: (role) => dispatch({ type: 'SET_ROLE', payload: role }),
      setDifficulty: (difficulty) => dispatch({ type: 'SET_DIFFICULTY', payload: difficulty }),
      setMaxPasses: (passes) => dispatch({ type: 'SET_MAX_PASSES', payload: passes }),
      setTimerDuration: (duration) => dispatch({ type: 'SET_TIMER_DURATION', payload: duration }),
      updateTeam: (team, data) => dispatch({ type: 'UPDATE_TEAM', team, payload: data }),
      setCurrentTeam: (team) => dispatch({ type: 'SET_CURRENT_TEAM', payload: team }),
      setCurrentWord: (word) => dispatch({ type: 'SET_CURRENT_WORD', payload: word }),
      setGameState: (state) => dispatch({ type: 'SET_GAME_STATE', payload: state }),
      setTimeRemaining: (time) => dispatch({ type: 'SET_TIME_REMAINING', payload: time }),
      addConnectedDevice: (device) => dispatch({ type: 'ADD_CONNECTED_DEVICE', payload: device }),
      removeConnectedDevice: (id) => dispatch({ type: 'REMOVE_CONNECTED_DEVICE', payload: id }),
      setIsHost: (isHost) => dispatch({ type: 'SET_IS_HOST', payload: isHost }),
      resetGame: () => dispatch({ type: 'RESET_GAME' })
    }
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
