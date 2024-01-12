// App.jsx

import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { MoviesProvider } from './MoviesContext';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import SearchResults from './SearchResults';
import MovieDetails from './MovieDetails';
import Register from './Register';
import AddMovie from './AddMovie';
import DeleteMovie from './DeleteMovie';
import { isExpired } from 'react-jwt';

function App() {
  const isAuthenticated = !isExpired(localStorage.getItem('token'));

  return (
    <MoviesProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            {isAuthenticated ? (
              <>
                <Route path="/add" element={<AddMovie />} />
                <Route path="/delete" element={<DeleteMovie />} />
              </>
            ) : null}
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/details/:title/:id" element={<MovieDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
