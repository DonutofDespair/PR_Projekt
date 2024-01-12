import React, {useState} from 'react';
import './styles/Grid.css';
import {FaStar} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {useMovies} from "./MoviesContext";

const MovieGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    const navigate = useNavigate();
    const { movies } = useMovies();

    const handleItem = (title, id) => {
        navigate(`/details/${encodeURIComponent(title)}/${id}`);
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="movie-grid-box">
            <div  className="movie-grid">
                {currentMovies.map((movie) => (
                    <div className="item" key={movie.id} onClick={() => handleItem(movie.title, movie.id)}>
                        <img src={movie.image} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>

    );
};

export default MovieGrid;
