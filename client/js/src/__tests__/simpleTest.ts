describe("Can Run Tests", () => {
  it("can run a simple test", () => {
    expect(true).toEqual(true);
  });

  it("can run a simple async/await test", async () => {
    let i = false;
    let deferred = new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 0);
    });
    i = await deferred;
    expect(i).toEqual(true);
  });
});
