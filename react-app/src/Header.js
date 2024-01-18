import logo from './images/Logo_Klapka.png';
import React, { useEffect, useState } from 'react';
import './styles/Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Obsługa zmiany wartości w polu wyszukiwania
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Obsługa naciśnięcia klawisza Enter w polu wyszukiwania
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Obsługa naciśnięcia przycisku wyszukiwania
    const handleSearchButtonClick = () => {
        handleSearch();
    };

    // Obsługa wyszukiwania i nawigacji do strony wyników
    const handleSearch = () => {
        navigate(`/search/${searchTerm}`);
        setSearchTerm('');
    };

    // Stan informujący o zalogowaniu użytkownika
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Efekt sprawdzający, czy użytkownik jest zalogowany po załadowaniu komponentu
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Obsługa wylogowania użytkownika
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <header className="header">
            <div className="header-box">
                <Link to="/">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                </Link>
                <Link to="/" className="logo-text_2">
                    Movie World
                </Link>


                <div className="search">
                    <input
                        type="text"
                        placeholder="Wyszukaj film w naszej bazie..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="search-button" onClick={handleSearchButtonClick}>
                        <FaSearch />
                    </button>
                </div>

                <div className="login">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="login-btn">
                            Wyloguj się
                        </button>
                    ) : (
                        <Link to="/signin" className="login-btn">
                            Zaloguj się
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
