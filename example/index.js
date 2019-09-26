window.onload = function() {
  var paging = self.rikaaaPaging(
    ["#header", "#article", "#footer"],
    this.document.querySelectorAll("a")
  );
};
