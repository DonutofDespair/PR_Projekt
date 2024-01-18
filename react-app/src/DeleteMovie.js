import React, { useEffect, useState } from 'react';
import './styles/Delete.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteMovie = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        selectedMovieId: '',
    });

    // Efekt pobierający listę filmów po załadowaniu komponentu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://at.usermd.net/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchData();
    }, []);

    // Obsługa zmiany wartości w polu wyboru filmu do usunięcia
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Zmiana trasy po usunięciu filmu
    const handleChangeRoute = () => {
        navigate('/');
        window.location.reload();
    };

    // Obsługa usuwania filmu
    const handleDelete = async (event) => {
        event.preventDefault();

        // Sprawdzenie, czy wybrano film do usunięcia
        if (!formData.selectedMovieId) {
            return;
        }

        try {
            // Pobranie tokena z localStorage
            const token = localStorage.getItem('token');

            // Ustawienie nagłówków z tokenem autoryzacyjnym
            const headers = {
                Authorization: `Bearer ${token}`
            };

            // Wykonanie żądania DELETE w celu usunięcia filmu
            const response = await axios.delete(`https://at.usermd.net/api/movie/${formData.selectedMovieId}`, { headers });

            // Sprawdzenie poprawności odpowiedzi
            if (!response.data) {
                throw new Error('Nieprawidłowa odpowiedź sieciowa');
            }

            // Zmiana trasy po udanym usunięciu
            handleChangeRoute();
        } catch (error) {
            console.error('Błąd podczas usuwania filmu:', error);
        }
    };


    return (
        <div className="main-box-delete-movie add-movie-box">
            <div className="add-movie-container-delete-movie">
                <h2 className="delete-movie-title">Usuń film</h2>
                <form className="form-add-movie-delete-movie">
                    <div className="form-global-delete-movie form-left-column-delete-movie">
                        <select
                            id="selectedMovieId"
                            name="selectedMovieId"
                            value={formData.selectedMovieId}
                            onChange={handleInputChange}
                            className="delete-movie-select"
                        >
                            <option value="">Wybierz film do usunięcia</option>
                            {movies.map((movie) => (
                                <option key={movie.id} value={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                        <button type="submit" onClick={handleDelete} className="delete-movie-button">
                            Usuń film
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteMovie;
