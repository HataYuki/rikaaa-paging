window.onload = function() {
  var paging = self.rikaaaPaging(
    ["#header", "#article", "#footer"],
    document.querySelectorAll("a")
  );

  var each = 100;
  var length = 3;
  var duration = each * length;

  paging.hookStart(function(data) {
    var ids = data.idAttributes;
    var current = data.currentTargets;
    var next = data.nextTargets;

    data.afterDelay = duration;

    for (var i = 0; i < ids.length; i++) next[ids[i]].style.opacity = 0;

    data.onDelay = function(ratio) {
      var step = Math.floor((ratio * duration) / each);

      switch (step) {
        case 0:
          current[ids[step]].style.transition = "opacity 200ms ease-in-out";
          current[ids[step]].style.opacity = 0;
          break;
        case 1:
          current[ids[step]].style.transition = "opacity 200ms ease-in-out";
          current[ids[step]].style.opacity = 0;
          break;
        case 2:
          current[ids[step]].style.transition = "opacity 200ms ease-in-out";
          current[ids[step]].style.opacity = 0;
          break;
      }
    };
    return data;
  });
  paging.hookEnd(function(data) {
    var ids = data.idAttributes;
    data.afterDelay = duration;

    data.onDelay = function(ratio) {
      var step = Math.floor((ratio * duration) / each);
      var opacity = paging.map(
        ratio * duration,
        each * step,
        each * (step + 1),
        0,
        1
      );

      switch (step) {
        case 0:
          data.updatedTargets[ids[step]].style.opacity = paging.curve(
            "LINEAR",
            opacity
          );
          break;
        case 1:
          data.updatedTargets[ids[step]].style.opacity = paging.curve(
            "EASE_IN",
            opacity
          );
          break;
        case 2:
          data.updatedTargets[ids[step]].style.opacity = paging.curve(
            "EASE_OUT",
            opacity
          );
          break;
      }
    };
    return data;
  });
};
