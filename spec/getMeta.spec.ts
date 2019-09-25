import window from "./index.spec";
import * as assert from "power-assert";
import getMeta from "../src/getMeta";
import "../src/polyfill/Array.from";

describe("getMeta", () => {
  before(() => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];
  });
  it("getMetaTest", () => {
    //   karmaのviewportをとってしまうので、index=1で。
    const metaViewportContent = getMeta("viewport", document)[1].getAttribute(
      "content"
    );
    const metaKeywordContent = getMeta("keywords", document)[0].getAttribute(
      "content"
    );
    const metadescContent = getMeta("description", document)[0].getAttribute(
      "content"
    );

    assert(metaViewportContent === "width=device-width, initial-scale=1.0");
    assert(metaKeywordContent === "keyword,test");
    assert(metadescContent === "description test.");
  });
});
