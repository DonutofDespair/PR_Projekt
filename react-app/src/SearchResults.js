import React, { useState, useEffect } from 'react';
import './styles/Search.css';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://at.usermd.net/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleItem = (title, id) => {
        navigate(`/details/${encodeURIComponent(title)}/${id}`);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="main-box add-movie-box">
            <div className="search-result-container">
                <h2>Wyniki wyszukiwania dla: {query}</h2>
                {filteredMovies.length > 0 ? (
                    <ul>
                        {filteredMovies.map((movie) => (
                            <li key={movie.id}>
                                <div className="link-element-item" onClick={() => handleItem(movie.title, movie.id)}>
                                    <h4 className="-link" >
                                        {movie.title}
                                    </h4>
                                    <p>{movie.content}</p>
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p id="no-results">Brak wyników dla podanego zapytania.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
