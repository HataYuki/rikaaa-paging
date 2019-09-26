import window from "./index.spec";
import * as assert from "power-assert";
import Error from "../src/errorInterface";
import {
  IDATTRIBUTE_ERROR_TEXT,
  ANCHORS_ERROR_TEXT,
  ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_1,
  ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_2,
  checkingIdAttribute,
  checkingAnchors,
  checkingEntiresFucArg
} from "../src/error.constructor";

describe("error", () => {
  before(() => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];
  });
  it("idAttribute", () => {
    const result1: Error = checkingIdAttribute("111");
    const result2: Error = checkingIdAttribute([1, 2, 3]);
    const result3: Error = checkingIdAttribute(["aaaa"]);
    const result4: Error = checkingIdAttribute(["#aaaa", "#bbbb"]);

    assert(result1.isError && result1.errorTxt === IDATTRIBUTE_ERROR_TEXT);
    assert(result2.isError && result2.errorTxt === IDATTRIBUTE_ERROR_TEXT);
    assert(result3.isError && result3.errorTxt === IDATTRIBUTE_ERROR_TEXT);
    assert(!result4.isError && result4.errorTxt === "");
  });
  it("anchors", () => {
    const result1: Error = checkingAnchors("aaa");
    const result2: Error = checkingAnchors(document.body.querySelectorAll("*"));
    const result3: Error = checkingAnchors(document.querySelectorAll("a"));

    assert(result1.isError && result1.errorTxt === ANCHORS_ERROR_TEXT);
    assert(result2.isError && result2.errorTxt === ANCHORS_ERROR_TEXT);
    assert(!result3.isError && result3.errorTxt === "");
  });
  it("entires func arg", () => {
    const HOOKREADY = "hookReady";
    const HOOKRESULT = "hookResult";

    const result1: Error = checkingEntiresFucArg(HOOKREADY, "aaa");
    const result2: Error = checkingEntiresFucArg(HOOKREADY, () => {});
    const result3: Error = checkingEntiresFucArg(HOOKREADY, value => value);

    const result4: Error = checkingEntiresFucArg(HOOKRESULT, "aaaa");
    const result5: Error = checkingEntiresFucArg(HOOKRESULT, () => {});

    assert(
      result1.isError &&
        result1.errorTxt ===
          `${HOOKREADY}()${ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_1}`
    );
    assert(
      result2.isError &&
        result2.errorTxt ===
          `${HOOKREADY}()${ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_1}`
    );
    assert(!result3.isError && result3.errorTxt == "");

    assert(
      result4.isError &&
        result4.errorTxt ===
          `${HOOKRESULT}()${ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_2}`
    );

    assert(!result5.isError && result5.errorTxt === "");
  });
});
