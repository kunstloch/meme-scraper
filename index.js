// grab data from https://memegen.link/examples ->  data = 'string'

var https = require('https');
let htmlOfWebsite;
let htmlMatch;
let htmlSlicedToTen;
let htmlCorrectLink;
let htmlWithHttps;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

var fs = require('fs');
var dir = './top_memes';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var options = {
  host: 'memegen.link',
  path: '/examples'
};
var request = https.request(options, function(res) {
  htmlOfWebsite = '';
  res.on('data', function(chunk) {
    htmlOfWebsite += chunk;
  });
  res.on('end', function() {
    main(htmlOfWebsite);
  });
});
request.on('error', function(e) {
  console.log(e.message);
});
request.end();

function main(htmlOfWebsite) {
  htmlMatch = htmlOfWebsite.match(/"\/.+watermark=none" style/g);

  let htmlDecoded = htmlMatch.map(urlDecoded => entities.decode(urlDecoded));

  // let htmlFiltered = htmlMatch.filter(function htmtFiltering(filter) {
  // return !filter.includes('&#');
  // });

  htmlSlicedToTen = htmlDecoded.slice(0, 10);
  htmlCorrectLink = htmlSlicedToTen.map(function htmlCut(url) {
    return url.slice(1, -7);
  });
  htmlWithHttps = htmlCorrectLink.map(
    https => (https = `https://memegen.link${https}`)
  );

  console.log(htmlWithHttps);

  for (i = 0; i < 10; i++) {
    const fs = require('fs');

    const file = fs.createWriteStream(`top_memes/file${i}.jpg`);

    const requestTwo = https.get(htmlWithHttps[i], function(response) {
      response.pipe(file);
    });
  }
}
