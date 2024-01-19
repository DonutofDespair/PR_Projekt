import React, { useState } from 'react';
import './styles/AddMovie.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

// Komponent do dodawania nowego filmu
const AddMovie = () => {
    // Inicjalizuje hook do nawigacji w aplikacji
    const navigate = useNavigate();

    // Stan przechowujący dane formularza
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        rate: '',
        productionYear: '',
        genre: '',
    });

    // Obsługuje zmiany wprowadzanych danych w formularzu
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Zmienia trasę przeglądarki i odświeża stronę
    const handleChangeRoute = () => {
        navigate('/');
        window.location.reload();
    };

    // Obsługuje dodanie nowego filmu
    const handleAdd = async (event) => {
        event.preventDefault();

        // Sprawdza, czy wszystkie wymagane pola są wypełnione
        if (
            !formData.title ||
            !formData.image ||
            !formData.content ||
            !formData.rate ||
            !formData.productionYear ||
            !formData.genre
        ) {
            return;
        }

        // Wysyła zapytanie POST do API w celu dodania filmu
        axios
            .post('https://at.usermd.net/api/movies', {
                title: formData.title,
                image: formData.image,
                content: formData.content,
                rate: formData.rate,
                productionYear: formData.productionYear,
                genre: formData.genre,
            })
            .then((response) => {
                // Po pomyślnym dodaniu filmu, zmienia trasę przeglądarki
                handleChangeRoute();
            })
            .catch((error) => {
                console.log(error);

                // Resetuje formularz po nieudanej próbie dodania filmu
                setFormData({
                    title: '',
                    image: '',
                    content: '',
                    rate: '',
                    productionYear: '',
                    genre: '',
                });
            });
    };

    // Zmienia trasę przeglądarki do strony usuwania
    const handleDelete = () => {
        navigate('/delete');
    };

    return (
        <div className="main-box2 add-movie-box">
            <div className="add-movie-container">
                <h2>Dodaj film</h2>
                <form className="form-add-movie">
                    <div className="form-global form-left-column">
                        <p>Szczegółowe informacje</p>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Tytuł"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Okładka (link)"
                            value={formData.image}
                            onChange={handleInputChange}
                        />
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Opis"
                            rows="10"
                            value={formData.content}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            id="rate"
                            name="rate"
                            placeholder="Ocena"
                            value={formData.rate}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            id="pubYear"
                            name="productionYear"
                            value={formData.productionYear}
                            placeholder="Rok produkcji"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="Gatunek"
                            value={formData.genre}
                            onChange={handleInputChange}
                        />
                        <button type="submit" onClick={handleAdd}>
                            Dodaj film
                        </button>
                    </div>
                </form>
                <button type="button" onClick={handleDelete}>
                    Usuń film
                </button>
            </div>
        </div>
    );
};

export default AddMovie;