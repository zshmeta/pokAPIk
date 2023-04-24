import React, { useState } from 'react';
import * as api from '../api';

const questions = [
  {
    question: "Lequel des choix suivants n'est PAS un Pokémon de départ?",
    choices: ["Bulbizarre", "Salamèche", "Carapuce", "Pikachu"],
    answer: "Pikachu"
  },
  {
    question: "Quel type de Pokémon n'est PAS super efficace contre le type Eau?",
    choices: ["Électrique", "Plante", "Poison", "Feu"],
    answer: "Poison"
  },
  {
    question: "Lequel des choix suivants est un Pokémon légendaire?",
    choices: ["Pikachu", "Mewtwo", "Dracaufeu", "Raichu"],
    answer: "Mewtwo"
  },
  {
    question: "Lequel de ces Pokémon n'est pas un Pokémon de type Fée?",
    choices: ["Togepi", "Flabebe", "Mew", "Absol"],
    answer: "Absol"
  },
  {
    question: "Quel est le Pokémon le plus puissant de la première génération?",
    choices: ["Mewtwo", "Mew", "Artikodin", "Moltres"],
    answer: "Mewtwo"
  },

  {
    question: "Lequel de ces Pokémon évolue en Dracaufeu?",
    choices: ["Carapuce", "Salamèche", "Bulbizarre", "Pikachu"],
    answer: "Salamèche",
  },
  // Your question objects here
];

const QuestionApp = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === questions[currentQuestion].answer) {
      setMessage('Correct answer! Adding a Pokemon.');

      const pokemonList = await api.getPokemonList(); // Load your Pokemon list from the API
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const newPokemon = pokemonList[randomIndex];

      try {
        await api.addToPokedex(newPokemon);
        setMessage(newPokemon.name + ' attrapé!');
      } catch (err) {
        setMessage("Oups, il s'est enfui.");
        console.error(err);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setMessage('Quiz terminé!'); // End the quiz
      }
    } else {
      setMessage('Mauvaise réponse.');
    }
    setInput('');
  };

  return (
    <div>
      <h3>{questions[currentQuestion].question}</h3>
      <form onSubmit={handleSubmit}>
        {questions[currentQuestion].choices.map((choice, index) => (
          <label key={ index }>
            <input
              type="radio"
              value={ choice }
              checked={input === choice}
              onChange={(e) => setInput(e.target.value)}
            />
            {choice}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuestionApp;
