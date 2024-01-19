import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Details.css';
import { FaStar } from 'react-icons/fa';


const MovieDetails = () => {
    // Pobranie identyfikatora filmu z parametrów URL
    const { id } = useParams();

    // Stan przechowujący szczegóły filmu
    const [movieDetails, setMovieDetails] = useState(null);

    // Efekt pobierający szczegóły filmu po załadowaniu komponentu
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Pobranie danych o filmie z API
                const response = await axios.get(`https://at.usermd.net/api/movies/${id}`);

                // Sprawdzenie poprawności odpowiedzi
                if (!response.data) {
                    throw new Error('Network response was not ok');
                }

                // Ustawienie szczegółów filmu w stanie komponentu
                const movieDetailsData = response.data;
                setMovieDetails(movieDetailsData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        // Wywołanie funkcji pobierającej szczegóły filmu
        fetchMovieDetails();
    }, [id]);

    // Wyświetlanie informacji o ładowaniu, jeśli dane są jeszcze pobierane
    if (!movieDetails) {
        return <p>Loading...</p>;
    }


    return (
        <div className="main-box-movie-details movie-box">
            <div className="movie-box-first-column-movie-details">
                <img src={movieDetails.image} alt={movieDetails.title} />
            </div>
            <div className="movie-box-second-column-movie-details">
                <h2>{movieDetails.title}</h2>
                <p>{movieDetails.content}</p>
                <table>
                    <tbody>
                    <tr>
                        <td className="td-label">Ocena:</td>
                        <td>
                            <div className="rating-container">
                                <div className="rating">
                                    <FaStar color="#ae12b0" />
                                    <span>{movieDetails.rate}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-label">Rok produkcji:</td>
                        <td>{movieDetails.productionYear}</td>
                    </tr>
                    <tr>
                        <td className="td-label">Gatunek:</td>
                        <td>{movieDetails.genre}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieDetails;
