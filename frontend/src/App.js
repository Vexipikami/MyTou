import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sleep from './pages/Sleep';
import Workout from './pages/Workout';
import Meal from './pages/Meal';
import Notes from './pages/Notes';
import Summary from './pages/Summary';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
