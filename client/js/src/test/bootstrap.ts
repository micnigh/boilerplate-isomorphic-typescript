if (/PhantomJS/.test(navigator.userAgent)) {
  // no console output if in phantom - too noisy
  console.log = function () {};
}
