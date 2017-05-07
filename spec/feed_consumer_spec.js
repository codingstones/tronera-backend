const expect = require('chai').expect;
const services = require('../src/index');

describe("Feed Consumer", () => {

  let feedConsumer;

  describe("When loaded with empty feed", () => {
    it("returns empty feed", () => {
      feedConsumer = services.buildFeedConsumer([]);
      feedConsumer.retrieveNextFeed();

      expect(feedConsumer.retrieveNextFeed()).eql({});
    });
  });

  describe("When feed has items", () => {
    const TWEETS = [
      {id: 1, text: '#NowPlaying People Are Strange de The Doors ♫ https://t.co/lQNrT2fRBF'},
      {id: 2, text: 'Does IT Industry Need Better Namings? https://t.co/Utuzhwzogn'}
      ];
    let feedConsumer;
    beforeEach(() =>{
      feedConsumer = services.buildFeedConsumer(TWEETS);
    });

    it("iterates feeds", () => {
      expect(feedConsumer.retrieveNextFeed().id).eql(1);
      expect(feedConsumer.retrieveNextFeed().id).eql(2);
    });

    it("returns empty feed when reached last item", () => {
      feedConsumer.retrieveNextFeed();
      feedConsumer.retrieveNextFeed();
      expect(feedConsumer.retrieveNextFeed()).eql({});
    });
  });
});
