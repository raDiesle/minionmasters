import React, { useEffect, useState } from 'react';
import './App.css';

async function fetchCards() {
  return [];
}

function App() {
  let [cards, setCards] = useState([]);
  useEffect(() => {
    fetchCards().then(data => {
      setCards(data.query.categorymembers);
    });  
  }, []);
  
  return (
    <div>
      
    </div>
  );
}

export default App;
