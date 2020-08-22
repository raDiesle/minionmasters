


# getting started
1. `npm install`
2. `npm run compressImages`
3. `npm start` 

# Later on
4. `npm start`
5. `npm run deploy`

# update game data
1. Download and replace file manual from: https://drive.google.com/file/d/0B-3hJBoCehBpQVBUYVdxZDVNSms/view?usp=sharing
in /batch_jobs/
2. replace `: ,` with `: 0,`
3. reformat with prettier
6. Download card images from blog or if needed screenshot game: dimensions 555 x 658
7. place it /batch_jobs/generated/img and rename accordingly: find imageName from GameData.json
8. `npm run generateData`
9. `npm run deploy`

# another tool from another guy:
 https://github.com/Cadrach/mm-builder

# history
- previous there was jobCardTemplate.js to parse text from wiki
