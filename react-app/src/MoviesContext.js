import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Utworzenie kontekstu dla filmów
const MoviesContext = createContext();

// Komponent dostarczający kontekstu dla filmów
export const MoviesProvider = ({ children }) => {
    // Stan przechowujący listę filmów
    const [movies, setMovies] = useState([]);

    // Efekt pobierający dane o filmach po załadowaniu komponentu
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Pobranie danych z API
                const response = await axios.get('https://at.usermd.net/api/movies');

                // Ustawienie danych w stanie komponentu
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Wywołanie funkcji pobierającej dane
        fetchData();
    }, []);

    // Zwrócenie dostarczonego kontekstu do dzieci
    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};

// Własny hook do korzystania z kontekstu filmów
export const useMovies = () => {
    // Pobranie kontekstu
    const context = useContext(MoviesContext);

    // Rzucenie błędu, jeśli hook używany jest poza dostarczonym kontekstem
    if (!context) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }

    // Zwrócenie kontekstu
    return context;
};
