import React from 'react';
import styled from "styled-components";
import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Actions Pokémon</h2>

      <button className={ button } onClick={showPokemon()} >Afficher le Pokémon</button>

      <button className={button} onClick={changePokemon()} >Modifier un Pokémon</button>

      <button  className={button} onClick={addPokemon()} >Ajouter un Pokémon</button>


      <button  className={button} onClick={remPokemon()} >Supprimer un Pokémon</button>
    </div>
  );
}

const button = styled.button`
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
     width: 113px;
     height: 100vh;
     background-color: rgba(0, 0, 0, 0.5);
`

export default Sidebar;
