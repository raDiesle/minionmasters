const fetch = require("node-fetch");
const fs = require('fs');

async function fetchCards (cmcontinue = "") {
let categoryCardsUrl = "https://minionmasters.gamepedia.com/api.php?action=query&list=categorymembers&prop=extracts&cmtitle=Category:Cards&format=json";
  // MOCK
  // categoryCardsUrl = cardsDataUrlMock;
  if(cmcontinue){
     categoryCardsUrl += `&cmcontinue=${cmcontinue}`;
  }
  const response = await fetch(categoryCardsUrl);
  const data = await response.json();
  return data;
}

(async () => {
  const initialData = await fetchCards();  
  let overallCategoryPageids = [...[], ...initialData.query.categorymembers.map(category => category.pageid)];
  
  let cmContinue = initialData.continue.cmcontinue;
  while(cmContinue){
    const nextPageData = await fetchCards(cmContinue);
    cmContinue = nextPageData.continue && nextPageData.continue.cmcontinue;

    overallCategoryPageids = [...overallCategoryPageids, ...nextPageData.query.categorymembers.map(category => category.pageid)];
    console.log(cmContinue);
  }

  const unobtainedCardPageId = 1952;
  const removedCardPageId = 1951;
  const overallCategoryPageidsFiltered = overallCategoryPageids.filter(pageId => ![unobtainedCardPageId, removedCardPageId].includes(pageId));

  fs.writeFileSync("jobCardPageIds.json", JSON.stringify());
})();
