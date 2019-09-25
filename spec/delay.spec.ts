import * as assert from "power-assert";
import { delayMain } from "../src/delay";

describe("delay このテストはCIでは通らない。ブラウザでチェック", () => {
  it("delay test", done => {
    const duration = 100;
    let counter = 0;

    delayMain(
      duration,
      value => {
        counter = value;
      },
      () => {
        assert(counter === 1);
        done();
      }
    );
  });
});
