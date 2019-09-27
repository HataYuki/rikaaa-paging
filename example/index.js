window.onload = function() {
  var paging = self.rikaaaPaging(
    ["#header", "#article", "#footer"],
    this.document.querySelectorAll("a")
  );

  var each = 200;
  var duration = each * 3;

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
    data.afterDelay = duration;

    data.onDelay = function(ratio) {
      var step = Math.floor((ratio * duration) / each);

      switch (step) {
        case 0:
          data.updatedTargets[ids[step]].style.transition =
            "opacity 200ms ease-in-out";
          data.updatedTargets[ids[step]].style.opacity = 1;
          break;
        case 1:
          data.updatedTargets[ids[step]].style.transition =
            "opacity 200ms ease-in-out";
          data.updatedTargets[ids[step]].style.opacity = 1;
          break;
        case 2:
          data.updatedTargets[ids[step]].style.transition =
            "opacity 200ms ease-in-out";
          data.updatedTargets[ids[step]].style.opacity = 1;
          break;
      }
    };
    return data;
  });
};
