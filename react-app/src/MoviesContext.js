import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

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

    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }
    return context;
};
