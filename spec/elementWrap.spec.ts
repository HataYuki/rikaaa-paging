import window from "./index.spec";
import * as assert from "power-assert";
import { elementWrap, elementUnwrap } from "../src/elementWrap";
import "../src/polyfill/Array.from";

describe("elementWrap", () => {
  before(() => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];
  });
  it("wrap test", () => {
    const target = document.querySelector(".wrapChild");

    const wraped: any = elementWrap(target);

    assert(Array.from(wraped.parentNode.classList)[0] === "wrapTarget");
  });
  it("unwrap test", done => {
    setTimeout(() => {
      const target: any = document.querySelector(".wrapChild").parentNode;
      const unwraped = elementUnwrap(target);

      assert(unwraped.classList[0] === "wrapChild");
      done();
    }, 100);
  });
});
