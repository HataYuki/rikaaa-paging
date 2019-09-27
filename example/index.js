window.onload = function() {
  var ids = ["#header", "#article", "#footer"];

  var paging = self.rikaaaPaging(ids, this.document.querySelectorAll("a"));

  var each = 200;
  var duration = each * 3;

  paging.hookStart(function(data) {
    var header = this.document.querySelector(ids[0]),
      article = this.document.querySelector(ids[1]),
      footer = this.document.querySelector(ids[2]);

    data.afterDelay = duration;

    for (var i = 0; i < ids.length; i++) data.targets[ids[i]].style.opacity = 0;

    data.onDelay = function(ratio) {
      var step = Math.floor((ratio * duration) / each);

      switch (step) {
        case 0:
          header.style.transition = "opacity 200ms ease-in-out";
          header.style.opacity = 0;
          break;
        case 1:
          article.style.transition = "opacity 200ms ease-in-out";
          article.style.opacity = 0;
          break;
        case 2:
          footer.style.transition = "opacity 200ms ease-in-out";
          footer.style.opacity = 0;
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
