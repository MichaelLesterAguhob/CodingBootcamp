import "./App.css";
import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './context/UserContext';

import AppNavBar from "./components/AppNavBar";
// import Banner from './components/Banner'
// import Highlights from './components/Highlights';

import Home from './pages/Home'
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import {News, FeedbackForm } from './pages/News'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import AddCourse from "./pages/AddCourse";

function App() {

  const [user, setUser] = useState({
      id: null,
      isAdmin: null
  });

  function unsetUser() {
      localStorage.clear();
  }

  useEffect(() => {

    console.log(user);
    console.log(localStorage);

  }, [user]);

  useEffect(() => {

    if(localStorage.getItem("token") !== null) {

        fetch('http://localhost:4000/users/details', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    } else {
        setUser({
            id: null,
            isAdmin: null
        })
    }
}, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser}}>
          <Router>
                <AppNavBar />

                <Container>
                  <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/courses' element={<Courses />} />
                      <Route path='/courses/:courseId' element={<CourseView />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/logout' element={<Logout />} />
                      <Route path='/profile' element={<Profile />} />
                      <Route path="*" element={<Error />} />
                      <Route path='/news' element={
                      <>
                        <News />
                        <FeedbackForm /> 
                      </>
                    } /> 
                  </Routes>
                </Container>   
          </Router>
    </UserProvider>
  );
}

export default App;