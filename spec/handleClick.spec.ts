import window from "./index.spec";
import handleClick from "../src/handleClick";
import * as assert from "power-assert";

describe("handleClick", () => {
  it("handleClick test", done => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];

    const anchors = document.querySelectorAll("a");
    let counter = 0;
    handleClick(Array.from(anchors), callback => {
      //   console.log(callback);
      counter++;
    });

    anchors[0].click();
    anchors[0].click();

    setTimeout(() => {
      assert(counter === 1);
      done();
    }, 100);
  });
});
