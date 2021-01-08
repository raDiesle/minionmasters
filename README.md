


# getting started
1. `npm install`
2. `npm run compressImages`
3. `npm start` 

# Later on
4. `npm start`
5. `npm run deploy`

# first time setup:
- npm install
- cd functions && npm install
- npm install -g firebase-tools
- firebase login

# update game data
1. Download and replace file manual from: https://drive.google.com/file/d/0B-3hJBoCehBpQVBUYVdxZDVNSms/view?usp=sharing
in /batch_jobs/
2. replace `: ,` with `: 0,`
3. reformat with prettier
6. Download card images from blog or if needed screenshot game: dimensions 555 x 658
7. place it /batch_jobs/generated/img and rename accordingly: find imageName from GameData.json
8. `npm run generateData`
9. `npm run deploy`


# update images from game
- download https://github.com/DerPopo/UABE/releases/tag/2.2stabled
- open AssetBundleExtractor.exe
- open C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\StreamingAssets\AssetBundles\gui\cards highres
- unpack it somewhere e.g. C:\Downloads
- open "info"
- sort by type
- select all Texture2d
- click on Plugins
- select png
- create new folder and select it to be exported
- copy images to the folder in batch_jobs/images_highres_from_game/img
- run npm run compressImages and test app. commit all new images to git

# another tool from another guy:
 https://github.com/Cadrach/mm-builder

# history
- previous there was jobCardTemplate.js to parse text from wiki
