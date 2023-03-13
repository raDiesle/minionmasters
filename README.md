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
8. update version in src/version.js export const CURRENT_GAME_VERSION = "1.25";
9. elo-detail.js find and adjust [FILTER_CURRENT_SEASON] [FILTER_PREVIOUS_SEASON]
10. adjust by try error  const DATE_TO_ALIGN_CYCLE for correct conquest circle by increasing only some hours or some days. dont try to give correct date in the future
11. test changes on run app by `npm start`
12. `npm run deploy`


# update images from game
- download one of ( they dont work on mm different versions from time to time): 
  - or https://github.com/SeriousCache/UABE/releases -> requires to rename files after: powershell Get-Item .\*.* | ForEach-Object { Rename-Item $_ ($_.Name -replace "(\.jpg.*).png", ".png") }
  - https://github.com/SeriousCache/UABE/releases/download/2.2stabled/AssetsBundleExtractor_2.2stabled_64bit.zip 
  - 
  - https://github.com/Perfare/AssetStudio -https://github.com/DerPopo/UABE/releases/tag/2.2stabled- 
  
- open AssetStudioGUI.exe
- Click in menu on "Open". Select folder C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\StreamingAssets\AssetBundles\gui\
- Select "cards highres"
- Data are loaded. Go to Asset List tab. Sort by type
- export Texture2d files as png
- create some new folder again e.g. in your user downloads folder "imgs" and select it to be exported into
- copy images to the folder in batch_jobs/images_highres_from_game/img
- say "override all" to get updated images  
- run 'npm run compressImages' and test app if all images are correct. commit all original and compressed new images to git
- delete old folder you created

# another tool from another guy:
 https://github.com/Cadrach/mm-builder

# history
- previous there was jobCardTemplate.js to parse text from wiki


# find gamelogs

%appdata%\..\LocalLow\BetaDwarf ApS\Minion Masters

TeamWon. Team: 0 Matchmade: None Online Game: False I won: True


# elo Bucket: update

e.g.
https://firebasestorage.googleapis.com/v0/b/minionmastersmanager.appspot.com/o/src%2Fgenerated%2Felo%2Fdetails%2F1091792.json?alt=media&token=5d145bde-24dc-4367-8621-941deac59f4d

## set cors
cd functions
gsutil cors set cors.json gs://minionmastersmanager.appspot.com
