import React, { useState } from 'react';
import { render } from '@testing-library/react';



const setCookie = (name, value, expireMinutes) => {
  const date = new Date();
  date.setTime(date.getTime() + (expireMinutes * 60 * 1000));
  const expires = '; expires=' + date.toUTCString();

  document.cookie = name + '=' + value + expires + '; path=/';
}



Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      userName: userName,
      password: password,
    };

    const user = JSON.parse(localStorage.getItem(`user_${userData.id}`));

    if (user && user.userName === userData.userName && user.password === userData.password) {
      setMessage('Login successful!');
      setUserName('');
      setPassword('');
      setCookie('user', user.apiKey, 5);
    } else {
      setMessage('Incorrect Credentials')
    }
    
    render(
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    )
  }
  }


export default Login; 
