const fetch = require("node-fetch");
const fs = require('fs');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


async function fetchPageContent(pageId) {
    let categoryCardsUrl = ` https://minionmasters.gamepedia.com/api.php?action=query&pageids=${pageId}&prop=revisions&rvprop=content&rvslots=main&format=json`;
    const response = await fetch(categoryCardsUrl);
    const data = await response.json();
    return data;
}

(async () => {
    const cardPageIds = JSON.parse(fs.readFileSync("jobCardPageIds.json"));

    let overallCardData = [];

    const fetchAll = async () => {

        await asyncForEach(cardPageIds, async (pageId) => {

            const cardData = await fetchPageContent(pageId);

            const propsAsArrayString = cardData.query.pages[pageId].revisions[0].slots.main['*'].match(/(?<=\|+)(.*\=*)/g);
            if (!propsAsArrayString) {
                console.log("error on: " + pageId);
                return;
            }
            const propsAsMap = propsAsArrayString.reduce((map, str) => {
                const [key, value] = str.split("=");
                map[key] = value;
                return map;
            }, {});
            propsAsMap.pageId = pageId;
            const mappedCardData = [propsAsMap];
            console.log(pageId);
            overallCardData = [...overallCardData, ...mappedCardData];
        });

        fs.writeFileSync("jobCardProps.json", JSON.stringify(overallCardData, null, 4));
// 
    }

    fetchAll();

})();
