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
  entires.ready(data => {
    // data.afterDelay = 1000;
    data.onDelay = val => {
      console.log(val);
    };
    return data;
  });

  // entires.result(data => {
  //   console.log(data.oldUrl);
  //   console.log(data.newUrl);
  //   console.log(data.updatedTarget);
  //   console.log(data.previousTarget);
  // });
  // const start = ready.start();
  // const end = start.end();
  // end.result();
});
