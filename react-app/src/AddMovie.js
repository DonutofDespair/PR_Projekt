import React, { useState } from 'react';
import './styles/AddMovie.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddMovie = () => {
    const navigate = useNavigate();

    // Stan przechowujący dane formularza
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        productionYear: '',
        genre: '',
    });

    // Aktualizacja danych formularza po zmianie
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Zmiana trasy i przeładowanie strony
    const handleChangeRoute = () => {
        navigate('/');
        window.location.reload();
    };

    // Obsługa przesyłania formularza (dodawanie filmu)
    const handleAdd = async (event) => {
        event.preventDefault();

        // Walidacja pól formularza
        if (
            !formData.title ||
            !formData.image ||
            !formData.content ||
            !formData.productionYear ||
            !formData.genre
        ) {
            return;
        }

        // Wykonanie żądania POST w celu dodania filmu
        axios
            .post('https://at.usermd.net/api/movies', {
                title: formData.title,
                image: formData.image,
                content: formData.content,
                productionYear: formData.productionYear,
                genre: formData.genre,
            })
            .then((response) => {
                // Zmiana trasy po udanym dodaniu
                handleChangeRoute();
            })
            .catch((error) => {
                console.log(error);

                // Zresetowanie danych formularza w przypadku błędu
                setFormData({
                    title: '',
                    image: '',
                    content: '',
                    productionYear: '',
                    genre: '',
                });
            });
    };

    // Zmiana trasy do strony usuwania
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
                <button type="button" onClick={handleDelete} >
                    Usuń film
                </button>
            </div>
        </div>
    );
};

export default AddMovie;