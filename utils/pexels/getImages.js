const axios = require('axios').default;
const fs = require('fs');
const path = require('path');

const pexelApiKey = process.env.Pexel_Api_Key;

const imageCache = require('./image-cache.json');
const imageIds = require('./image-ids.json');
const cachedImageIds = imageCache.map((c) => c.id);

async function getImages() {
  const toFetch = imageIds.filter((id) => !cachedImageIds.includes(id));

  for (const id of toFetch) {
    const photo = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: pexelApiKey,
      },
    });
    imageCache.push(photo.data);
  }

  console.log('Got ', toFetch.length, ' New phtotos');
  fs.writeFileSync(
    path.join(__dirname, 'image-cache.json'),
    JSON.stringify(imageCache)
  );
}
getImages();
