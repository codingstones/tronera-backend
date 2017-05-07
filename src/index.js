require('isomorphic-fetch');

class Twitter {
  constructor(options) {
    this.baseUrl = "https://api.twitter.com/1.1/"

    this.consumerKey = options.consumerKey;
    this.consumerSecret = options.consumerSecret;
    this.accessTokenKey = options.accessTokenKey;
    this.accessTokenSecret = options.accessTokenSecret;
  }

  get(endpoint, params) {
    return this._tokenForApplication().then((response) => {
      const access_token = response.access_token;
      const url = this.baseUrl + endpoint + '.json' + this._toQueryString(params);

      return fetch(url, {
        headers: new Headers({
          "Authorization": "Bearer " + access_token,
        })
      }).then((response) => {
        return response.json();
      });
    });
  }

  _tokenForApplication() {
    return fetch("https://api.twitter.com/oauth2/token", {
      method: "POST",
      headers: new Headers({
        "Authorization": "Basic " + this._encodeConsumerKeyAndSecret(),
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }),
      body: "grant_type=client_credentials"
    }).then((response) => {
      return response.json();
    });
  }

  _encodeConsumerKeyAndSecret() {
    //FIXME: Use an isomorphic btoa function
    return new Buffer(this.consumerKey + ':' + this.consumerSecret).toString('base64');
  }

  _toQueryString(object) {
    return '?' + Object.keys(object).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    }).join('&');
  }
}

class TwitterService {
  constructor() {
    this.client = new Twitter({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  retrieveHomeTimeline() {
    return this.client.get('statuses/user_timeline', {screen_name: 'codingstones'})
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
