// api.js
const API_URL = './pokemonList';

export const fetchAllPokemons = async () => {
  try {
    const response = await fetch(`${API_URL}/cartes`);
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const addPokemon = async (pokemon) => {
  try {
    const response = await fetch(`${API_URL}/cartes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemon),
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const modifyPokemon = async (id, pokemon) => {
  try {
    const response = await fetch(`${API_URL}/cartes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemon),
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const deletePokemon = async (nom) => {
  try {
    await fetch(`${API_URL}/cartes/${nom}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw err;
  }
};
