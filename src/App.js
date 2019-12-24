import React, { useEffect, useState } from "react";
import "./App.css";
import { Flipper, Flipped } from "react-flip-toolkit";

async function fetchCards() {
  const response = await fetch("/jobCardProps.json");
  const data = response.json();
  return data;
}

function App() {
  let [cards, setCards] = useState([]);
  useEffect(() => {
    fetchCards().then(data => {
      setCards(data);
    });
  }, []);

  const [filterName, setFilterName] = useState("");

  useEffect(()=> {
    
  }, [filterName]);


  const onFilterByName = value => {
    setFilterName(value);
    setCards((cCards) => cCards.filter(card => card.name.startsWith(value)));
  };

  return (
    <div>
      <input
        type="text"
        value={filterName}
        onChange={event => onFilterByName(event.target.value)}
      />
      <Flipper flipKey={filterName}>
        <ul style={{ listStyleType: "none", display: "flex", flexWrap: "wrap" }}>
          {cards.map(({pageId, image}) => (
            
            <Flipped key={pageId} flipId={pageId}>
              <li style={{ width: "100px" }}>
                <img
                  style={{ width: "100%" }}
                  src={
                    "/img_sharp/" +
                    image
                  }
                  alt={image}
                />
              </li>
            </Flipped>
          ))}
        </ul>
      </Flipper>
    </div>
  );
}

export default App;
