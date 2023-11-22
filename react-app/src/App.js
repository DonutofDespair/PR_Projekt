import React from 'react';
import './App.css';

const links = [
  { image: 'netflix-logo.png', link: 'https://www.netflix.com' },
  { image: 'disney-logo.png', link: 'https://www.disneyplus.com' },
  { image: 'hbo-logo.png', link: 'https://www.hbomax.com' },
  { image: 'amazon-logo.png', link: 'https://www.primevideo.com/ref=atv_nb_logo?language=pl_PL' },
];

function App() {
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
    <div className="App">
      <header className="App-header">
        <div className="logo-search">
          <div className="logo">
            <img src="Logo_Klapka.png" alt="Movie World Logo" />
          </div>
          <div className="title-container">
            <h1 className="title">Movie World</h1>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="search-button">Search</button>
          </div>
        </div>
        <div id="login">
          <button className="login-button">Log In</button>
        </div>
        {/* Dodane linki do stron */}
        <div className="external-links">
          {links.map((link, index) => (
            <a key={index} href={link.link} target="_blank" rel="noopener noreferrer">
              <img src={link.image} alt={`Link to ${link.link}`} />
            </a>
          ))}
        </div>
      </header>
      <div className="container">
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
    </div>
  );
}

export default App;