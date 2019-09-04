// grab data from https://memegen.link/examples ->  data = 'string'

var https = require('https');
let htmlOfWebsite;
let htmlMatch;
let htmlSlicedToTen;
let htmlCorrectLink;
let htmlWithHttps;

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
  htmlSlicedToTen = htmlMatch.slice(0, 10);
  htmlCorrectLink = htmlSlicedToTen.map(function htmlCut(url) {
    return url.slice(1, -7);
  });
  htmlWithHttps = htmlCorrectLink.map(
    https => (https = `https://memegen.link${https}`)
  );

  console.log(htmlWithHttps);

  for (i = 0; i < 10; i++) {
    const fs = require('fs');

    const file = fs.createWriteStream(`file${i}.jpg`);

    const requestTwo = https.get(htmlWithHttps[i], function(response) {
      response.pipe(file);
    });
  }
}

// for (i = 0; i < 5; i++)

<img
  class="meme-img"
  src="/afraid/i_don't_know_what_this_meme_is_for/and_at_this_point_i'm_too_afraid_to_ask.jpg?preview=true&amp;watermark=none"
></img>;

('https://memegen.link/older/it&#39;s_an_older_meme_sir/but_it_checks_out.jpg?preview=true&amp;watermark=none');

<img
  class="meme-img"
  src="https://memegen.link/afraid/i_don't_know_what_this_meme_is_for/and_at_this_point_i'm_too_afraid_to_ask.jpg?preview=true&amp;watermark=none"
></img>;
