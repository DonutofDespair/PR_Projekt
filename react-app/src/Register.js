import React, { useState } from 'react';
import './Registration.css';  // Assuming your CSS file is named Registration.css
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [errors, setErrors] = useState({});
  const handleChangeRoute = () => {
    navigate('/signin');
    window.location.reload();
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    axios
      .post('https://at.usermd.net/api/user/create', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        handleChangeRoute();
      })
      .catch((error) => {
        console.log(error);

        setFormData({
          name: '',
          email: '',
          password: '',
        });
      });
  };

  return (
    <div className="registration-container">
      <div className="login-container">
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
    </div>
  );
};

export default Register;
