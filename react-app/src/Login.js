// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Importuj plik stylów dla Login.js

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    haslo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dane logowania:', formData);
    // Dodaj logikę logowania tutaj
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa urzytkownika:
          <input type="text" name="login" value={formData.login} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Hasło:
          <input type="password" name="haslo" value={formData.haslo} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Zaloguj się</button>
      </form>
      <p className="no-account-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
