const Twitter = require('twitter');

class TwitterService {
  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  retrieveHomeTimeline() {
    return this.client.get('statuses/home_timeline', {});
  }
}

function buildFeedConsumer(feed) {
  currentFeedPosition = -1;
  return {retrieveNextFeed, currentFeedPosition}

  function retrieveNextFeed() {
    if (feed.length == 0) return {};
    currentFeedPosition++;
    if (currentFeedPosition >= feed.length) return {};
    return feed[currentFeedPosition];
  }
}

module.exports = {
  TwitterService,
  buildFeedConsumer
}
