const ready = fn => {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    setTimeout(() => {
      fn();
    }, 0);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

ready(() => {
  const entires = self.rikaaapaging("test", document.querySelectorAll("a"));
  entires
    .ready()
    .start()
    .end()
    .result();
  // const start = ready.start();
  // const end = start.end();
  // end.result();
});
