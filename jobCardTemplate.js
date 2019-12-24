const fs = require('fs');

function supplantTemplate (inputString, inputPattern) {
    return inputString.replace(/{{{([^{{{}}}}]*)}}}/g,
      (a, b) => {
        var r = inputPattern[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
    );
  };
  

  const cardPageIds = JSON.parse(fs.readFileSync("jobCardPageIds.json"));
  const cardData = JSON.parse(fs.readFileSync("jobCardData.json"));
  const cardProps = JSON.parse(fs.readFileSync("jobCardProps.json"));

  let overallCardData = {};
  
  cardPageIds.forEach(pageId => {
        
        console.log(cardProps[pageId].props);

        const currentCardData = cardData.find(card => cardData.pageId === pageId);
        const currentCardProps = cardProps.find(card => card.pageId === pageId);
    overallCardData[pageId] = {
        parsedText : supplantTemplate(currentCardData.text, currentCardProps.props)    
  }
});

fs.writeFileSync("jobCardTemplate.json", JSON.stringify(overallCardData, null, 3));
