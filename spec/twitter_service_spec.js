describe("Twitter Service", () => {
  it("retrieve home timeline", () => {
    const twitterService = new tronera.TwitterService();

    return twitterService.retrieveHomeTimeline().then((tweets) => {
      expect(tweets).not.to.have.lengthOf(0);
    });
  });
});
