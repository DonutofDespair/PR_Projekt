import logo from './images/Logo_Klapka.png';
import React, { useEffect, useState } from 'react';
import './styles/Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearchButtonClick = () => {
        handleSearch();
    };

    const handleSearch = () => {
        navigate(`/search/${searchTerm}`);
        setSearchTerm('');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Sprawdzanie, czy użytkownik jest zalogowany po załadowaniu komponentu
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []); // Pusta tablica oznacza, że useEffect będzie wykonane tylko raz po zamontowaniu komponentu

    const handleLogout = () => {
        // Logika do wylogowania użytkownika (np. usuwanie tokena)
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
