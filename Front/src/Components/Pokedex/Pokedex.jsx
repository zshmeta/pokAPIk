export const Pokedex = () => {

  const Pokeball = () => {
    const pokeball = 1;
    return pokeball;
  }

  const PokeballRun = () => {
    const pokeballRun = 0;
    return pokeballRun;
  }

  const PokeballCapture = () => {
    const pokeballCapture = 0;
    return pokeballCapture;
  }




  return (
    <>
      <h2>Mon Pokedex</h2>
    <p>Mes Pokeball: <Pokeball /></p>
    <p>Pokemon Echapee: <PokeballRun /></p>
    <p>Pokemon capturee: <PokeballCapture /></p>

    </>
  );
};


function pokedexAdd (pikAPIok) {
  return pokeball + pokeballRun + pokeballCapture;
}