import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ShowDetails from './components/ShowDetails';
import ShowList from './components/ShowList';
import BookingForm from './components/BookingForm';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ShowList/>} />
      <Route path="/show/:id" element={<ShowDetails/>} />
      <Route path="/book/:id" element={<BookingForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
