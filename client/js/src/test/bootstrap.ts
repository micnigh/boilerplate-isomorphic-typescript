if (/PhantomJS/.test(navigator.userAgent)) {
  // no console output if in phantom - too noisy
  console.log = function () {};
} else {
  if (process.env.BROWSER_SYNC_SNIPPETS !== "undefined") {
    (<string[]>process.env.BROWSER_SYNC_SNIPPETS).forEach(s => {
      document.write(`<script src="${s}"></script>`);
    });
  }
}
