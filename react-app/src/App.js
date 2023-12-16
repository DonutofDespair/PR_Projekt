// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Footer from './Footer'; // Dodaj import

const Home = ({ movies }) => (
  <div>
    <h2>Home</h2>
    <div id="search-results" className="movie-tiles">
      {movies.map((movie, index) => (
        <div key={index} className="movie-tile">
          <img src={movie.image} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <div className="rating">
            {Array.from({ length: movie.rating }, (_, i) => (
              <span key={i}>&#9733;</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Details = () => (
  <div>
    <h2>Details</h2>
    {/* Place the content of the details page here */}
  </div>
);

const AddMovie = () => (
  <div>
    <h2>Add Movie</h2>
    {/* Place the content of the add movie page here */}
  </div>
);

const SignIn = () => (
  <div>
    <h2>Sign In</h2>
    {/* Place the content of the sign-in page here */}
  </div>
);

const ExternalLinks = () => (
  <div className="external-links">
    <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer">
      <img src="netflix-logo.png" alt="Link to Netflix" />
    </a>
    <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">
      <img src="disney-logo.png" alt="Link to Disney+" />
    </a>
    <a href="https://www.hbomax.com" target="_blank" rel="noopener noreferrer">
      <img src="hbo-logo.png" alt="Link to HBO Max" />
    </a>
    <a href="https://www.primevideo.com/ref=atv_nb_logo?language=pl_PL" target="_blank" rel="noopener noreferrer">
      <img src="amazon-logo.png" alt="Link to Amazon Prime Video" />
    </a>
  </div>
);

const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Search" />
    <button className="search-button">Search</button>
  </div>
);

const App = () => {
  const movies = [
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
    { title: 'Film', image: 'image2.jpg', description: 'This is a great movie about...', rating: 5 },
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo-search">
            <div className="logo">
              <Link to="/">
                <img src="Logo_Klapka.png" alt="Movie World Logo" />
              </Link>
            </div>
            <div className="title-container">
              <Link to="/">
                <h1 className="title">Movie World</h1>
              </Link>
            </div>
            <SearchBar />
          </div>
          <div id="login">
            <Link to="/login" className="signin-button">
              Sign In
            </Link>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
          </div>
          <ExternalLinks />
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home movies={movies} />} />
            <Route path="/details" element={<Details />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer /> {/* Dodaj stopkę na dole strony */}
      </div>
    </Router>
  );
};

export default App;
