import React, {useState} from 'react';
import './styles/Grid.css';
import { useNavigate } from 'react-router-dom';
import {useMovies} from "./MoviesContext";
import {FaStar} from "react-icons/fa";


const MovieGrid = () => {
    // Stan przechowujący numer aktualnej strony
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    // Hook do nawigacji
    const navigate = useNavigate();

    // Hook do pobierania filmów z kontekstu
    const { movies } = useMovies();

    // Funkcja obsługująca kliknięcie na element grida
    const handleItem = (title, id) => {
        navigate(`/details/${encodeURIComponent(title)}/${id}`);
    };

    // Obliczenia dotyczące paginacji
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Funkcja obsługująca zmianę strony
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="movie-grid-box">
            <div className="movie-grid">
                {currentMovies.map((movie) => (
                    <div className="item" key={movie.id} onClick={() => handleItem(movie.title, movie.id)}>
                        <img src={movie.image} alt={movie.title}/>
                        <h3>{movie.title}</h3>
                        <div className="rating"
                             style={{backgroundColor: '#000000', padding: '8px', borderRadius: '4px'}}>
                            <FaStar color="#ae12b0"/>
                            <span style={{color: '#ae12b0'}}>{movie.rate ?? '0.0'}</span>
                        </div>

                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({length: Math.ceil(movies.length / moviesPerPage)}, (_, index) => (
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
