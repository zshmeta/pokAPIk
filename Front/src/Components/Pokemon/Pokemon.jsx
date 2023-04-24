import React, { useState, useEffect } from 'react';

// Définition du type PokeProps (auparavant avec le mot-clé "const" et des guillemets supplémentaires)


// Simplification du composant fonctionnel Poke et déstructuration des propriétés de PokeProps
const Poke = ({ name, strength, weakness, previousState,  nextState, lastState  }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Force/Types: {strength}</p>
            <p>Faiblesses: {weakness}</p>
            <p>Evolution: {previousState}, {nextState}, {lastState}</p>
        </div>
    );
}

// Séparation du composant App du composant Poke
// (ce composant était précédemment imbriqué dans Poke)
import React, { useState, useEffect } from 'react';
import * as api from '../api';

const pikApok = () => {
  // Hook to manage data, loading, and error state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pokemons = await api.fetchAllPokemons();
        setData(pokemons);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Rendering the component with loading, error, and data information
  return (
    <div>
      //...
      {data.map((poke) => (
        <Poke key={poke.id} {...poke} />
      ))}
    </div>
  );
}
   // Passer un tableau vide en second argument pour que useEffect ne s'exécute qu'une fois au montage

    // Rendre le composant App avec les informations de chargement, d'erreur et de données
    return (
        <div>
            <h1>Pokemon</h1>
            {loading && <p>Chargement...</p>} // Montrer le message de chargemment jusqu'a que else
            {error && <p>Erreur: {error.message}</p>} // Montrer le message d'erreur si il y as erreur
            {data && <Poke {...data} />} // Avec ses donnees
        </div>
    );
export default pikApok;