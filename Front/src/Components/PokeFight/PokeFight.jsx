import { useState } from "react";
import "./FightingDeck.css";
//Pokemon fighting area to display both sides and interactions


const FightingDeck = () => {
  const [poke1, setPoke1] = useState(null);
  const [poke2, setPoke2] = useState(null);

  return (
    <div className="fighting-deck">
      <div className="poke1">
        {poke1 ? (
          <div>
            <img src={poke1.sprites.front_default} alt={poke1.name} />
            <p>{poke1.name}</p>
          </div>
        ) : (
          <p>Choose a Pokemon</p>
        )}
      </div>
      <div className="poke2">
        {poke2 ? (
          <div>
            <img src={poke2.sprites.front_default} alt={poke2.name} />
            <p>{poke2.name}</p>
          </div>
        ) : (
          <p>Choose a Pokemon</p>
        )}
      </div>
    </div>
  );
}






const calculatePoints = (pokedex, newPokemon) => {
  let points = 0;

  // Check if the user already has a Pokemon with the same type
  const sameTypePokemon = pokedex.some(
    (pokemon) => pokemon.type === newPokemon.type
  );
  if (sameTypePokemon) points += 1;

  // Check if the user gets a card from the same Pokemon but evolved
  const samePokemonEvolved = pokedex.some(
    (pokemon) => pokemon.name === newPokemon.prevEvo || pokemon.name === newPokemon.nextEvo
  );
  if (samePokemonEvolved) points += 2;

  // Check if the user collected all evolutions from one Pokemon
  const allEvolutionsCollected = pokedex.some(
    (pokemon) => 
      (pokemon.name === newPokemon.prevEvo && pokemon.name === newPokemon.nextEvo) ||
      (newPokemon.name === pokemon.prevEvo && newPokemon.name === pokemon.nextEvo)
  );
  if (allEvolutionsCollected) points += 3;

  return points;
};

// Call this function whenever a new Pokemon is added to the user's pokedex
const updatePoints = (pokedex, newPokemon) => {
  const additionalPoints = calculatePoints(pokedex, newPokemon);
  // Assuming you have a state variable called `userPoints`
  setUserPoints((prevPoints) => prevPoints + additionalPoints);
};