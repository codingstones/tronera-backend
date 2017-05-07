const expect = require('chai').expect;
const services = require('../src/index');

describe("Twitter Service", () => {
  it("retrieve home timeline", () => {
    const twitterService = new services.TwitterService();

    const results = twitterService.retrieveHomeTimeline();

    expect(results).not.to.have.lengthOf(0);
  });
});
