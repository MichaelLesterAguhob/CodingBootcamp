import './App.css';
import {Container} from 'react-bootstrap';

import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import News from './pages/News'
import Register from './pages/Register'

// import Banner from './components/Banner';
// import Highlights from './components/HighLights';

function App() {
  return (
    <>
      <AppNavBar />
      <Container>
          <Home />
          <Courses />
          <News />
          <Register />
      </Container>
      {/* <h1>Hello World</h1> */}
    </>
  );
}



export default App;
