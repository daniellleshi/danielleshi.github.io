import React from 'react';

// Questa è una lista di parole di fallback.
// In una vera applicazione, si dovrebbe gestire il caso in cui l'API non risponda.
const FALLBACK_WORDS = [
  'ELEFANTE', 'PIZZA', 'MONTAGNA', 'TELEFONO', 'BICICLETTA',
  'GIARDINO', 'COMPUTER', 'OCEANO', 'CHITARRA', 'CASTELLO',
  'FARFALLA', 'AUTOMOBILE', 'BIBLIOTECA', 'GELATO', 'AEROPLANO',
  'FIORE', 'CALCIO', 'CUCINA', 'DRAGO', 'SPIAGGIA',
  'LIBRERIA', 'CIOCCOLATO', 'UNIVERSO', 'PIRAMIDE', 'VULCANO'
];

/**
 * Ottiene una nuova parola per il gioco.
 * @returns {Promise<string>} Una promessa che si risolve con una nuova parola.
 */
export const getNewWord = async () => {
  // NOTA: Non posso effettuare chiamate dirette a siti web come parolecasuali.it
  // a causa delle restrizioni di sicurezza del browser (CORS).
  // Per funzionare, quel sito dovrebbe fornire un'API pubblica con CORS abilitato.
  //
  // Per ora, simulo la chiamata utilizzando una lista predefinita di parole.
  // Questa funzione è pronta per essere sostituita con una vera chiamata API in futuro.

  console.log("Simulazione chiamata API per una nuova parola...");

  try {
    // Qui andrebbe la vera chiamata API, ad esempio:
    // const response = await fetch('https://api.parolecasuali.it/v1/word');
    // const data = await response.json();
    // return data.word.toUpperCase();

    // Simulazione con una parola casuale dalla lista di fallback
    const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
    const randomWord = FALLBACK_WORDS[randomIndex];
    
    return Promise.resolve(randomWord);

  } catch (error) {
    console.error("Errore nel recupero della parola (simulato), uso una parola di fallback:", error);
    const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
    return Promise.resolve(FALLBACK_WORDS[randomIndex]);
  }
};