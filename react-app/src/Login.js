import React, { useState } from 'react';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // Stan przechowujący dane formularza
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  // Funkcja obsługująca zmianę wartości w polach formularza
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Stan przechowujący błędy walidacji
  const [errors, setErrors] = useState({});

  // Funkcja zmieniająca trasę po zalogowaniu
  const handleChangeRoute = () => {
    navigate('/');
    window.location.reload();
  };

  // Funkcja obsługująca logowanie
  const handleLogin = async (event) => {
    event.preventDefault();

    // Walidacja pól formularza
    if (!formData.login || !formData.password) {
      return;
    }

    axios
        .post('https://at.usermd.net/api/user/auth', {
          login: formData.login,
          password: formData.password,
        })
        .then((response) => {
          // Zapisanie tokena do localStorage po udanym zalogowaniu
          localStorage.setItem('token', response.data.token);
          handleChangeRoute();
        })
        .catch((error) => {
          // Obsługa błędów podczas logowania
          const errorMessages = {};
          errorMessages.password =
              "Podany login nie istnieje lub hasło jest błędne!";
          setErrors(errorMessages || {});
          console.log(error);

          // Zresetowanie danych formularza po błędzie
          setFormData({
            login: '',
            password: '',
          });
        });
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <h2>Zaloguj się</h2>
        <form className="form-global">
          <label htmlFor="login" className="label">
            Login
          </label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Login"
            value={formData.login}
            onChange={handleInputChange}
          />
          <label htmlFor="password" className="label">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleLogin}>
            Zaloguj się
          </button>
        </form>
        <p className="no-account-text">
          Nie masz jeszcze konta?{' '}
          <Link to="/signup" className="login-link-text-gray">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
