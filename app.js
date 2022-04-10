const Twitter = require('twitter');
const keys = require('./config');

const client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret,
});

// create a stream
const stream = client.stream('statuses/filter', { track: '#html, #css #javascript' });

stream.on('data', function (tweet) {

    // like the found tweet
    client.post('favorites/create', { id: tweet.id_str }).then(result => {
        console.log('LIKED : "' + result.text + '"');
    }).catch(console.error);

    // retweet the found tweet
    client.post('statuses/retweet', { id: tweet.id_str }).then(result => {
        console.log('RETWEETED : "' + result.text + '"');
    }).catch(console.error);
});
