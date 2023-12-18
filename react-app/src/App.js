// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Footer from './Footer';
import Details from './Details';

// Rename the functional component to MovieDetail
const MovieDetail = ({ movie }) => (
  <div>
    <h2>{movie.title}</h2>
    <img src={movie.image} alt={movie.title} />
    <p>{movie.description}</p>
    <div className="rating">
      {Array.from({ length: movie.rating }, (_, i) => (
        <span key={i}>&#9733;</span>
      ))}
    </div>
  </div>
);

const Home = ({ movies }) => (
  <div>
    <div id="search-results" className="movie-tiles">
      {movies.map((movie, index) => (
        <Link key={index} to={`/details/${index}`} className="movie-tile-link">
          <div className="movie-tile">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <div className="rating">
              {Array.from({ length: movie.rating }, (_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// Rename the JSX element to DetailsPage
const DetailsPage = ({ params }) => {
  const movieIndex = params.index;
  const movies = [
    { title: 'Film 1', image: '/image2.jpg', description: 'This is the first movie about...', rating: 4 },
    { title: 'Film 2', image: '/image2.jpg', description: 'This is the second movie about...', rating: 5 },
    { title: 'Film 3', image: '/image2.jpg', description: 'This is the third movie about...', rating: 3 },
    { title: 'Film 4', image: '/image2.jpg', description: 'This is the fourth movie about...', rating: 4 },
    { title: 'Film 5', image: '/image2.jpg', description: 'This is the fifth movie about...', rating: 2 },
    { title: 'Film 6', image: '/image2.jpg', description: 'This is the sixth movie about...', rating: 5 },
    { title: 'Film 7', image: '/image2.jpg', description: 'This is the seventh movie about...', rating: 3 },
    { title: 'Film 8', image: '/image2.jpg', description: 'This is the eighth movie about...', rating: 4 },
    { title: 'Film 9', image: '/image2.jpg', description: 'This is the ninth movie about...', rating: 1 },
    { title: 'Film 10', image: '/image2.jpg', description: 'This is the tenth movie about...', rating: 5 },
    { title: 'Film 11', image: '/image2.jpg', description: 'This is the eleventh movie about...', rating: 2 },
    { title: 'Film 12', image: '/image2.jpg', description: 'This is the twelfth movie about...', rating: 4 },
    { title: 'Film 13', image: '/image2.jpg', description: 'This is the thirteenth movie about...', rating: 3 },
    { title: 'Film 14', image: '/image2.jpg', description: 'This is the fourteenth movie about...', rating: 5 },
    { title: 'Film 15', image: '/image2.jpg', description: 'This is the fifteenth movie about...', rating: 4 },
  ];

  const movie = movies[movieIndex];

  return <MovieDetail movie={movie} />;
};

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
    { title: 'Film 1', image: '/image2.jpg', description: 'This is the first movie about...', rating: 4 },
    { title: 'Film 2', image: '/image2.jpg', description: 'This is the second movie about...', rating: 5 },
    { title: 'Film 3', image: '/image2.jpg', description: 'This is the third movie about...', rating: 3 },
    { title: 'Film 4', image: '/image2.jpg', description: 'This is the fourth movie about...', rating: 4 },
    { title: 'Film 5', image: '/image2.jpg', description: 'This is the fifth movie about...', rating: 2 },
    { title: 'Film 6', image: '/image2.jpg', description: 'This is the sixth movie about...', rating: 5 },
    { title: 'Film 7', image: '/image2.jpg', description: 'This is the seventh movie about...', rating: 3 },
    { title: 'Film 8', image: '/image2.jpg', description: 'This is the eighth movie about...', rating: 4 },
    { title: 'Film 9', image: '/image2.jpg', description: 'This is the ninth movie about...', rating: 1 },
    { title: 'Film 10', image: '/image2.jpg', description: 'This is the tenth movie about...', rating: 5 },
    { title: 'Film 11', image: '/image2.jpg', description: 'This is the eleventh movie about...', rating: 2 },
    { title: 'Film 12', image: '/image2.jpg', description: 'This is the twelfth movie about...', rating: 4 },
    { title: 'Film 13', image: '/image2.jpg', description: 'This is the thirteenth movie about...', rating: 3 },
    { title: 'Film 14', image: '/image2.jpg', description: 'This is the fourteenth movie about...', rating: 5 },
    { title: 'Film 15', image: '/image2.jpg', description: 'This is the fifteenth movie about...', rating: 4 },
  ];


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <Link to="/">
              <img src="./Logo_Klapka.png" alt="Movie World Logo" />
            </Link>
          </div>
          <div className="title-container">
            <Link to="/">
              <h1 className="title">Movie World</h1>
            </Link>
          </div>
          <SearchBar />
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
            <Route path="/details/:index" element={<Details />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
