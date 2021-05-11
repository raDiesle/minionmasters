# first time setup:
- npm install
- cd functions && npm install
- npm install -g firebase-tools
- firebase login

# run app
1. `npm install`
3. `npm start` 

# deployment
5. `npm run deploy`

# update game data
1. Download and replace file manual from: https://drive.google.com/file/d/0B-3hJBoCehBpQVBUYVdxZDVNSms/view?usp=sharing
in /batch_jobs/
2. replace `: ,` with `: 0,`
3. reformat with prettier
4. `npm run generateData`
5. in general, with every release new formattings in text are expected , those should be handled in the job* file to replace properly.
6. also there might be new abilities added, which needs to be defined in abilities-config.js
7. see `update images from game`
8. test changes on run app
9. `npm run deploy`


# update images from game
- download https://github.com/DerPopo/UABE/releases/tag/2.2stabled
- open AssetBundleExtractor.exe
- open C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\StreamingAssets\AssetBundles\gui\cards highres
- answer "yes" on "do you want to extract?"
- unpack it somewhere e.g. C:\Downloads\mm_file give it some name
- open "info"
- sort by type
- select all Texture2d
- click on Plugins
- select png
- create some new folder again and select it to be exported
- copy images to the folder in batch_jobs/images_highres_from_game/img
- say "skip for all " to not override  
- run 'npm run compressImages' and test app if all images are correct. commit all new images to git

# another tool from another guy:
 https://github.com/Cadrach/mm-builder

# history
- previous there was jobCardTemplate.js to parse text from wiki
