const fetch = require("node-fetch");
const fs = require('fs');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function fetchPageContent (pageId) {
    let categoryCardsUrl = ` https://minionmasters.gamepedia.com/api.php?action=query&pageids=${pageId}&prop=revisions&rvprop=content&rvslots=main&format=json`;
  const response = await fetch(categoryCardsUrl);
  const data = await response.json();
  return data;
}

(async () => {
  const cardPageIds = JSON.parse(fs.readFileSync("categories.json"));
 
  let overallCardData = [];
  
  let i = 0;

  const fetchAll = async() => {

  
  await asyncForEach(cardPageIds, async (pageId) => {
    
    if(i > 5){
      return;
    }
    i++;
    const cardData = await fetchPageContent(pageId);

    const propsAsArrayString = cardData.query.pages[pageId].revisions[0].slots.main['*'].match(/(?<=\|+)(.*\=*)/g);
    const propsAsArrayMap = propsAsArrayString.map(str => {
        const [key, value] = str.split("=");
        return {
            [key]: value
        }; 
    });
    const mappedCardData = {
      props : propsAsArrayMap 
    };
      
    overallCardData = [...overallCardData, ...[mappedCardData]];
  });

  fs.writeFileSync("cardProps.json", JSON.stringify(overallCardData, null, 4));
// 
}

fetchAll();
  
})();
