// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddReviewPage from './pages/AddReviewPage';
import EditReviewPage from './pages/EditReviewPage';

// Define the function that renders the content in routes using State.
function App() {

  const [review, setReview] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Thingamabob Reviews</h1>
            <p>User Reviews for Humans, by Humans</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact><HomePage setReview={setReview} /></Route>
            <Route path="/add-review"><AddReviewPage /></Route>
            <Route path="/edit-review"><EditReviewPage review={review} /></Route>
          </main>

          <footer>
            <p>&copy; 2022 Andrea Irwin</p>
          </footer>

      </Router>
    </>
  );
}

export default App;