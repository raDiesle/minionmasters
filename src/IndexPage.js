import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Flipper} from "react-flip-toolkit";
import * as qs from "qs";
import {Card, CardContainer} from "./CardContainer";
import {Route} from "react-router";

const defaultState = {
    filter: "",
    display: "grid",
    sort: "ascending"
};

async function fetchCards() {
    const response = await fetch("/jobCardProps.json");
    const data = response.json();
    return data;
}

function IndexPage() {
    const history = useHistory();
    const location = useLocation();

    const [focused, setFocused] = useState(false);

    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    const sortByCosts = (keys, sort) => {
        if (sort === "ascending") {
            return [...keys].sort((a, b) => {
                if (cards[a].length < cards[b].length) return -1
                else if (cards[b].length < cards[a].length) return 1
                else return 0
            })
        } else {
            return [...keys].sort((a, b) => {
                if (cards[a].length > cards[b].length) return -1
                else if (cards[b].length > cards[a].length) return 1
                else return 0
            })
        }
    };

    const updateQueryParam = obj => {
        history.push({
            search: `?${qs.stringify({
                ...qs.parse(location.search.replace("?", "")),
                ...obj
            })}`
        })
    };

    const navigate = set => {
        history.push({
            pathname: `/${set.replace(/\s/g, "-")}`,
            search: location.search
        })
    };

    const [filterName, setFilterName] = useState("");

    useEffect(() => {

    }, [filterName]);


    const onFilterByName = value => {
        setFilterName(value);
        setCards((cCards) => cCards.filter(card => card.name.startsWith(value)));
    };

    const queryParamState = {
        ...defaultState,
        ...qs.parse(location.search.replace("?", ""))
    };

    const visiblecardsets = sortByCosts(
        cards.map(card => card.manacost),
        queryParamState.sort
    ).filter(set =>
        queryParamState.filter
            ? set.match(new RegExp("^" + queryParamState.filter))
            : true
    );

    const onClick = index => {
        console.log(index);
        setFocused(focused => focused === index ? null : index);
    };


    return (
        <div>
            <input
                type="text"
                value={filterName}
                onChange={event => onFilterByName(event.target.value)}
            />
            <Flipper flipKey={filterName}
                     spring="gentle"
                     staggerConfig={{
                         card: {
                             reverse: focused !== null
                         }
                     }}
                     decisionData={focused}
            >
                <ul style={{listStyleType: "none", display: "flex", flexWrap: "wrap"}}>
                    {cards.map(card => (
                        <CardContainer
                            key={card.pageId}
                            card={card}
                            focused={focused}
                            onClick={onClick}
                        />
                    ))}
                </ul>
            </Flipper>
        </div>
    );
}

export default IndexPage;