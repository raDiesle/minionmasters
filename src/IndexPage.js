import React, {useEffect, useState} from 'react';
import {Flipped, Flipper} from "react-flip-toolkit";
import * as qs from "qs";

const defaultState = {
    filter: "",
    display: "grid",
    sort: "ascending"
}

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
}

function IndexPage({history}) {

    const updateQueryParam = obj => {
        history.push({
            search: `?${qs.stringify({
                ...qs.parse(this.props.location.search.replace("?", "")),
                ...obj
            })}`
        })
    };

    const navigate = set => {
        history.push({
            pathname: `/${set.replace(/\s/g, "-")}`,
            search: this.props.location.search
        })
    };


    async function fetchCards() {
        const response = await fetch("/jobCardProps.json");
        const data = response.json();
        return data;
    }

    let [cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards().then(data => {
            setCards(data);
        });
    }, []);

    const [filterName, setFilterName] = useState("");

    useEffect(() => {

    }, [filterName]);


    const onFilterByName = value => {
        setFilterName(value);
        setCards((cCards) => cCards.filter(card => card.name.startsWith(value)));
    };

    const focusedSet = this.props.location.pathname.split(/\//g)[1];

    const queryParamState = {
        ...defaultState,
        ...qs.parse(this.props.location.search.replace("?", ""))
    };

    const visiblecardsets = sortByCosts(
        cards.map(card => cost),
        queryParamState.sort
    ).filter(set =>
        queryParamState.filter
            ? set.match(new RegExp("^" + queryParamState.filter))
            : true
    );

    return (
        <div>
            <input
                type="text"
                value={filterName}
                onChange={event => onFilterByName(event.target.value)}
            />
            <Flipper flipKey={filterName}>
                <ul style={{listStyleType: "none", display: "flex", flexWrap: "wrap"}}>
                    {cards.map(({pageId, image}) => (

                        <Flipped key={pageId} flipId={pageId}>
                            <li style={{width: "100px"}}>
                                <img
                                    style={{width: "100%"}}
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

export default IndexPage;