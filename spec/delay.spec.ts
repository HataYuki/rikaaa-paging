import * as assert from "power-assert";
import { delayMain } from "../src/delay";

describe("delay delayはrequestanimationframeを使っているので、nodejsでは通らない、ブラウザを見よ", () => {
  it("delay test", done => {
    const duration = 1000;
    let counter = 0;
    const values = [];

    delayMain(
      duration,
      value => {
        counter = value;
        values.push(value);
      },
      () => {
        assert(counter === 1);
        assert(values.filter(val => val === 1).length === 1);
        done();
      }
    );
  });
});
