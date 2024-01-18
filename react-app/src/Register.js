import React, { useState } from 'react';
import './styles/Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // Hook do nawigacji
  const navigate = useNavigate();

  // Stan przechowujący dane z formularza rejestracji
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Funkcja obsługująca zmiany w inputach formularza
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Stan przechowujący błędy
  const [errors, setErrors] = useState({});

  // Funkcja zmieniająca trasę do strony logowania i przeładowująca stronę
  const handleChangeRoute = () => {
    navigate('/signin');
    window.location.reload();
  };

  // Funkcja obsługująca proces rejestracji
  const handleRegistration = async (event) => {
    event.preventDefault();

    // Sprawdzenie, czy wszystkie pola są wypełnione
    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    // Wysłanie danych do serwera w celu rejestracji
    axios
        .post('https://at.usermd.net/api/user/create', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          // Przejście do strony logowania po udanej rejestracji
          handleChangeRoute();
        })
        .catch((error) => {
          console.log(error);

          // W przypadku błędu, wyczyszczenie danych z formularza
          setFormData({
            name: '',
            email: '',
            password: '',
          });
        });
  };

  return (
    <div className="registration-container">
        <h2>Zarejestruj się</h2>
        <form className="form-global">
          <label htmlFor="name" className="label">
            Nazwa
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nazwa"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="email" className="label">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
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
          <button type="submit" onClick={handleRegistration}>
            Zarejestruj się
          </button>
        </form>
        <p className="have-account-text">
          Masz już konto?{' '}
          <Link to="/signin" className="login-link-text">
            Zaloguj się
          </Link>
        </p>
      </div>
  );
};

export default Register;
