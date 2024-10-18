import React, { useState, useEffect, useContext } from 'react';
// import UserContext from '../context/UserContext';

const SearchCourses = () => {
//   const { user } = useContext(UserContext); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
//   const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const priceRange = {
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    };

    fetch('http://localhost:4000/courses/search-by-price', {
      method: 'POST',
      body: JSON.stringify(priceRange),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error searching courses:', error);
      });
  };

//   useEffect(() => {
//     // Optionally fetch all courses initially if needed
//     fetch('http://localhost:4000/courses/all', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setCourses(data);
//       });
//   }, []);

  return (
    <div>
      <h1>Search Courses by Price Range</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            id="minPrice"
            type="number"
            className='form-control'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            id="maxPrice"
            type="number"
            className='form-control'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary'>Search</button>
      </form>

      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((course) => (
            <li key={course._id}>
                {course.name}
              {/* <h3>{course.name}</h3>
              <p>Price: ${course.price}</p>
              <p>Description: {course.description}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found in this price range.</p>
      )}
    </div>
  );
};

export default SearchCourses;
