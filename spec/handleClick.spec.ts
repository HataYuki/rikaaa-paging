import window from "./index.spec";
import * as assert from "power-assert";
import handleClick from "../src/handleClick";

describe("handleClick", () => {
  before(() => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];
  });

  it("click once test", done => {
    const anchors = document.querySelectorAll("a");

    let counter = 0;
    handleClick(anchors, () => {
      counter++;
    });

    anchors[0].click();
    anchors[1].click();
    anchors[2].click();
    anchors[3].click();

    setTimeout(function() {
      assert(counter === 1);
      done();
    }, 100);
  });

  it("click recover test", done => {
    const anchors = document.querySelectorAll("a");

    let counter = 0;
    handleClick(anchors, () => {
      counter++;
    });

    anchors[0].click();
    anchors[1].click();
    anchors[2].click();
    anchors[3].click();

    setTimeout(function() {
      assert(counter === 1);
      done();
    }, 100);
  });
});
