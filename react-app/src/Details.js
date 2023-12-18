// Details.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { index } = useParams();

  // Check if index is defined
  if (!index) {
    return <div>No movie index provided</div>;
  }

  const movieIndex = parseInt(index, 10);
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


  // Check if the movieIndex is within a valid range
  if (isNaN(movieIndex) || movieIndex < 0 || movieIndex >= movies.length) {
    return <div>Invalid movie index</div>;
  }

  const movie = movies[movieIndex];

  return (
    <div className="details-container">
      <div className="details-left">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="details-right">
        <h2>{movie.title}</h2>
        <div className="rating">
          {Array.from({ length: movie.rating }, (_, i) => (
            <span key={i}>&#9733;</span>
          ))}
        </div>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default Details;
