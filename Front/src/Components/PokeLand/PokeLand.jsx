import React, { useState } from 'react';

const Landing = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your actual authentication logic
    if (email === 'test@example.com' && password === 'password') {
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
      };

      setMessage('Login successful!');
      onLogin(userData);
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      <p>No Yet a zshPooki?</p>
      <p className="pooki">please note that poucaving is bad mmkay</p>
      <p>"Not Yet a zshPokemeta?"</p>
      <button type="submit">Login</button>
      <button type="button" onClick={() => onSignUp()}>
        Create Account
      </button>

      {message && <p>{message}</p>}
    </div>

  );
};

export default Landing;