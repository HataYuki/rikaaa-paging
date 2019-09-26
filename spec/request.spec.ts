import * as assert from "power-assert";
import { request } from "../src/request";

/**
 * virtual boxのブラウザなどは、localhostをIPアドレスに変更しないとテストは通らない。
 */

describe("request", () => {
  it("request success", done => {
    request(
      "http://localhost:9876/debug.html",
      value => {
        assert(value);
      },
      data => {
        assert(
          data.html.querySelector("title").textContent === "Karma DEBUG RUNNER"
        );
        assert(data.status === 200);
        assert(data.statusText === "OK");
        assert(data.url === "http://localhost:9876/debug.html");
        done();
      }
    );
  });

  it("request false", done => {
    request(
      "http://localhost:9876/index.spec.html",
      value => {
        // assert(value);
      },
      data => {
        assert(data.html === null);
        assert(data.status === 404);
        assert(data.statusText === "Not Found");
        assert(data.url === "http://localhost:9876/index.spec.html");
        done();
      }
    );
  });
});
