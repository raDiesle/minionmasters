const fetch = require("node-fetch");
const fs = require('fs');

/* untested */
async function fetchCards(cmcontinue = "") {
    let categoryCardsUrl = "https://minionmasters.gamepedia.com/api.php?action=query&list=categorymembers&prop=extracts&cmtitle=Category:Cards&format=json";

    if (cmcontinue) {
        categoryCardsUrl += `&cmcontinue=${cmcontinue}`;
    }
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}

async function fetchRemovedCards(cmcontinue = "") {
    let categoryCardsUrl = "https://minionmasters.gamepedia.com/api.php?action=query&list=categorymembers&prop=extracts&cmtitle=Category:Removed_cards&format=json";

    if (cmcontinue) {
        categoryCardsUrl += `&cmcontinue=${cmcontinue}`;
    }
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}

async function fetchUnobtainedCards(cmcontinue = "") {
    let categoryCardsUrl = "https://minionmasters.gamepedia.com/api.php?action=query&list=categorymembers&prop=extracts&cmtitle=Category:Unobtainable_cards&format=json";

    if (cmcontinue) {
        categoryCardsUrl += `&cmcontinue=${cmcontinue}`;
    }
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}


(async () => {
    const initialData = await fetchCards();
    let overallCategoryPageids = [...[], ...initialData.query.categorymembers.map(({pageid}) => pageid)];

    let cmContinue = initialData.continue.cmcontinue;
    while (cmContinue) {
        const nextPageData = await fetchCards(cmContinue);
        cmContinue = nextPageData.continue && nextPageData.continue.cmcontinue;

        overallCategoryPageids = [...overallCategoryPageids, ...nextPageData.query.categorymembers.map(({pageid}) => pageid)];
        console.log(cmContinue);
    }

    const removedCards = await fetchRemovedCards().map(({pageId}) => pageId);
    const unobtainedCards = await fetchUnobtainedCards().map(({pageId}) => pageId);

    const overallCategoryPageidsFiltered = overallCategoryPageids.filter(pageId => ![...removedCards, ...unobtainedCards].includes(pageId));

    fs.writeFileSync("jobCardPageIds.json", JSON.stringify(overallCategoryPageidsFiltered));
})();
