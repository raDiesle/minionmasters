import isEmpty from "lodash.isempty";
import React from "react";

export function DecksForTournament({ config, decks }) {
  const decksWithMatchingFilter = decks.filter(deck => deck.tags.map(({ label }) => label).includes(config.name));
  return <>
    <h4>{isEmpty(decksWithMatchingFilter) ? config.name : <a href={`/decks?tag=${encodeURIComponent(config.name)}`}>{config.name}</a>}</h4>
    {isEmpty(decksWithMatchingFilter) ? <div>No deck saved yet</div> : <div>
      <ol>
        {decksWithMatchingFilter.map(deck => <li key={deck.dbid}>
        <a href={`/decks/single?deckId=${deck.dbid}`}>{deck.deckname}</a>
      </li>)}</ol>
    </div>}
  </>;
}