import React, {useEffect, useState} from 'react';
import './styles/Main.css'
import MovieGrid from "./MovieGrid";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Main = () => {
    // Hook do nawigacji
    const navigate = useNavigate();

    // Stan informujący o zalogowaniu użytkownika
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Efekt sprawdzający, czy użytkownik jest zalogowany po załadowaniu komponentu
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Funkcja zmieniająca trasę do strony dodawania filmu i przeładowująca stronę
    const handleChangeRoute = () => {
        navigate('/add');
        window.location.reload();
    };

    return (
        <div className="main">
            <div className="main-box">
                <section className="sectionGrid">
                    <h2>Filmy</h2>
                    <MovieGrid />
                </section>
            </div>
            {isLoggedIn && (
                <div className="add-movie-button" onClick={handleChangeRoute}>
                    <FaPlus />
                </div>
            )}
        </div>
    );
};

export default Main;
