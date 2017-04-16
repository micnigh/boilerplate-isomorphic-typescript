describe("__tests__ node test", () => {
  it("runs", () => {
    expect(true).toEqual(true);
  });

  it("runs async", async () => {
    let i = false;
    let deferred = new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 0);
    });
    i = await deferred;
    expect(i).toEqual(true);
  });
});
