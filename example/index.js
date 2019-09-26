window.onload = function() {
  var ids = ["#header", "#article", "#footer"];

  var paging = self.rikaaaPaging(ids, this.document.querySelectorAll("a"));

  var header = this.document.querySelector("header");
  var article = this.document.querySelector("article");
  var footer = this.document.querySelector("footer");

  paging.hookStart(function(data) {
    var each = 500;
    var duration = each * 3;

    data.afterDelay = duration;

    for (var i = 0; i < ids.length; i++) {}

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
};
