import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import News from './pages/News'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Feedback from 'react-bootstrap/esm/Feedback';

// import Banner from './components/Banner';
// import Highlights from './components/HighLights';

function App() {
  return (
    <Router>
      <AppNavBar />
      <Container>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/news" element={<News />} />
            {/* <Route path="/" element={<FeedbackForm />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
          {/* <Feedback />
          <News /> */}
      </Container>
      {/* <h1>Hello World</h1> */}
    </Router>
  );
}



export default App;
