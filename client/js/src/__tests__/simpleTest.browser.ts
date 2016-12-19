describe("__tests__ browser test", () => {
  it("runs", () => {
    expect(true).toEqual(true);
  });

  it("runs async", async (done) => {
    try {
      let i = false;
      let deferred = new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 0);
      });
      i = await deferred;
      expect(i).toEqual(true);
    } catch (e) {
      fail(e);
    } finally {
      done();
    }
  });
});
