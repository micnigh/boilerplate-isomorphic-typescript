describe("Can Run Tests", function () {
  it("can run a simple test", function () {
    expect(true).toEqual(true);
  });

  it("can run a simple async/await test", async function (done) {
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
