# first time setup:
- npm install
- cd functions && npm install
- npm install -g firebase-tools
- firebase login
<br>

# run app
1. `npm install`
3. `npm start` 
<br>

# deployment
- `npm run deploy`
<br>

# update game data
1. use AssetStudio to get Actors, Cards and Spell files  
from `C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\data.unity3d`
2. get English_ToDownload  
from `C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\StreamingAssets\aa\StandaloneWindows\platform_common_ondemand_assets_all.bundle`
3. get global-metadata.dat  from `C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\il2cpp_data\Metadata`  
  by using Il2CppDumper https://github.com/Perfare/Il2CppDumper/releases  
  -> open GameAssembly.dll first, then global-metadata.dat, the results will be saved in dump.cs in the Il2CppDumper Directory
4. copypaste all files in the `/batch_jobs/card_data/game_data` folder
5. `npm run updateCardData`
6. test changes on run app by `npm start`
7. `npm run deploy`
<br>

# update images from game

## new version
1. https://github.com/Perfare/AssetStudio
2. Load folder
3. `C:\Program Files (x86)\Steam\steamapps\common\Minion Masters\MinionMasters_Data\StreamingAssets\aa\StandaloneWindows`
4. sort by asset type


## deprecated old mm version:
- download one of ( they dont work on mm different versions from time to time): 
  - or https://github.com/SeriousCache/UABE/releases -> requires to rename files after in powershell  `Get-Item .\*.* | ForEach-Object { Rename-Item $_ ($_.Name -replace "(\.jpg.*).png", ".png") }`
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
<br>

# another tool from another guy:
 https://github.com/Cadrach/mm-builder
<br>

# history
- previous there was jobCardTemplate.js to parse text from wiki
<br>

# find gamelogs

%appdata%\..\LocalLow\BetaDwarf ApS\Minion Masters

TeamWon. Team: 0 Matchmade: None Online Game: False I won: True
<br>

# elo Bucket: update

e.g.
https://firebasestorage.googleapis.com/v0/b/minionmastersmanager.appspot.com/o/src%2Fgenerated%2Felo%2Fdetails%2F1091792.json?alt=media&token=5d145bde-24dc-4367-8621-941deac59f4d

## set cors
cd functions
gsutil cors set cors.json gs://minionmastersmanager.appspot.com

## add batch job command
go to package.json -> scripts
<br>

# Getting New svg icons
  
  - find free svg icon
  - if necessary edit it e.g. with ``https://boxy-svg.com/``
  - convert to jsx with ``https://svg2jsx.com/``