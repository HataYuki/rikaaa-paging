import { Ready } from "../src/takeReady";
import * as assert from "power-assert";
import { dataParse, dataStringify } from "../src/dataStringify";

describe("dataStringify", () => {
  let stringifyed = null,
    currentUrl = "http://localhost:9876/debug.html",
    href = "http://localhost:9876/aaaa.html";
  it("dataStringify test", () => {
    const dammy = {
      afterDelay: 1000,
      currentUrl: currentUrl,
      href: href,
      onDelay: () => {
        return "onDelay";
      },
      onProgress: arg => {
        return arg;
      }
    };

    stringifyed = dataStringify(dammy);

    assert(typeof stringifyed.afterDelay === "number");
    assert(typeof stringifyed.currentUrl === "string");
    assert(typeof stringifyed.href === "string");
    assert(typeof stringifyed.onDelay === "string");
    assert(typeof stringifyed.onProgress === "string");
  });
  it("dataParse test", () => {
    const parsed = dataParse(stringifyed);
    assert(parsed.afterDelay === 1000);
    assert(parsed.currentUrl === currentUrl);
    assert(parsed.href === href);
    assert(parsed.onDelay() === "onDelay");
    assert(parsed.onProgress(1000) === 1000);
  });
});
