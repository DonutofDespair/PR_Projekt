import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from "./MoviesContext";
import { FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import './styles/Delete.css';

const MovieDetails = () => {
    const { id } = useParams();
    const { setMovies } = useMovies();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://at.usermd.net/api/movies/${id}`);
                if (!response.data) {
                    throw new Error('Network response was not ok');
                }

                const movieDetailsData = response.data;
                setMovieDetails(movieDetailsData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieDetails) {
        // Render loading state or handle the absence of data
        return <p>Loading...</p>;
    }

    return (
        <div className="main-box movie-box">
            <div className="movie-box-first-column">
                <img src={movieDetails.image} alt={movieDetails.title} />
                {/*<button onClick="#"><FaPlayCircle />;</button>*/}
            </div>
            <div className="movie-box-second-column">
                <h2>{movieDetails.title}</h2>
                <p>{movieDetails.content}</p>
                <table>
                    <tbody>
                    <tr>
                        <td className="td">Aktorzy:</td>
                        <td>{movieDetails.mainActors}</td>
                    </tr>
                    <tr>
                        <td>Producent</td>
                        <td>{movieDetails.producer}</td>
                    </tr>
                    <tr>
                        <td>Gatunek</td>
                        <td>{movieDetails.genre}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieDetails;
