import React, { useState } from 'react';
import styled from 'styled-components';
import * as CryptoJS from 'crypto-js';

 

const PokeSign = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoritePokemon, setFavoritePokemon] = useState('');
  const [message, setMessage] = useState('');
  const [api_key, setApikey] = useState('');





  const TogglePassword = () => {
    const password = document.querySelector('.password');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };

  const generateApiKey = () => {
    const keyLength = 32;
    const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let api_key = '';

    for (let i = 0; i < keyLength; i++) {
        api_key += Characters.charAt(Math.floor(Math.random() * Characters.length));
      }
      return api_key;
    };
    
    const hashedApiKey = CryptoJS.SHA256(generateApiKey()).toString();


  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      id: Date.now(),
      name: name,
      userName: userName,
      email: email,
      password: password,
      favoritePokemon: favoritePokemon,
      api_key: hashedApiKey,
    };



    localStorage.setItem(`user_${userData.id}`, JSON.stringify(userData));

    setMessage('Account created successfully!');
    setName('');
    setUserName('');
    setEmail('');
    setPassword('');
    setFavoritePokemon('');
    setApikey('');
  };

    return (
        <div>
          <h1>PokeCompte</h1>
          <StyledForm onSubmit={handleSubmit}>
            <Label>
              Name:
              <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
            </Label>
            <br/>
            <Label>
              userName:
              <Input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
              />
            </Label>
            <br/>
            <Label className={Label}>
              Email:
              <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </Label>
            <br/>
            <Label>
              Password:
            <Input
              className='password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />
            
          </Label>
          <div className="showPassword">
              <input type="checkbox" onClick={TogglePassword} />
          </div>
          <br />
          <Label>
              Favorite Pokémon:
              <Input
                  type="text"
                  value={favoritePokemon}
                  onChange={(e) => setFavoritePokemon(e.target.value)} required
              />
            </Label>
            <br/>
          <button type="submit">Create Account</button>
          <button type="button">Login</button>
          </StyledForm>
          {message && <p>{message}</p>}
        </div>
  )
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`

const Label = styled.label`
    position: relative;
    margin-top: 8px; 
  &:before {
    content:" ";
    position: absolute;
    width: 100%;
    height: 5px;
    top: -30px;
    background: linear-gradient(to right,  #fff, #FF9000);
    z-index: -1;
    transform-origin: 50% 100%;
    transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
    color: #FF9000;
    transition: 0.3s;
}
  &:after {
    content:" ";
    position: absolute;
    width: 100%;
    height: 5px;
    top: -8px;
    background: #6E6E6E;
    z-index: -1;
    transform-origin: 50% 100%;
    transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
    color: #FF9000;
    transition: 0.3s;
}`
const Input = styled.input`
  padding: 16px 20px;
  width: 360px;
  border: none    ;
  outline: none;
  font-family: 'Roboto', sans-serif;
  color: #FF9000;
  position: relative;
  background: transparent;
  border-bottom: 1px solid #FF9000;
  appearance: none;
  &:focus + &label::before, 
  &.hasInput + label::before {
    transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
}

&:focus + &label::after,
&.hasInput+ label::after {
    transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
}

&.hasInputInvalid &label::before, &.hasInputInvalid &label::after {
    background: linear-gradient(to right,  red, #FF9000);
}


&.hasInputValid &label::after {
    background: linear-gradient(to right,  green, #FF9000);
}

&.hasInputValid &label::before {
    background: linear-gradient(to right,  green, #FF9000);
}

&:focus {
    border-bottom: 1px solid #FF9000;
}
`

export default PokeSign;
