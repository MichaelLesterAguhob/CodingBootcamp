import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';

const UpdateProfile = () => {
//   const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

// console.log({user});
//   useEffect(() => {

//     if (user) {
//       setFirstName(user.firstName || '');
//       setLastName(user.lastName || '');
//       setMobileNo(user.mobileNo || '');
//     }
//   }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ 
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,}),
    })
    .then((res) => res.json())
    .then((data) => {
      // Handle response (e.g., show a success message or handle errors)
      console.log({data});
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            className='form-control'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            className='form-control'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            id="mobileNo"
            type="text"
            className='form-control'
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary mt-3'>Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
