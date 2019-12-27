const fetch = require("node-fetch");
const fs = require('fs');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function fetchPageContent(pageId) {
    let categoryCardsUrl = `https://minionmasters.gamepedia.com/api.php?action=parse&pageid=${pageId}&format=json`;
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}

(async () => {
    const cardPageIds = JSON.parse(fs.readFileSync("jobCardPageIds.json"));

    let overallCardData = {};

    const fetchAll = async () => {

        await asyncForEach(cardPageIds, async (pageId) => {

            const cardData = await fetchPageContent(pageId);

            const mappedCardData = {
                [pageId]: {
                    title: cardData.parse.title,
                    text: cardData.parse.text['*'],
                    cardCategories: cardData.parse.categories.map(cat => cat['*'])
                }
            };

            overallCardData = {...overallCardData, ...mappedCardData};
        });

        fs.writeFileSync("jobCardData.json", JSON.stringify(overallCardData, null, 4));
// .match(/(?<=\|+)(.*\=*)/g)
    }

    fetchAll();

})();
