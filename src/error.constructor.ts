import Error from "./errorInterface";
import "./polyfill/Array.from";

export const IDATTRIBUTE_ERROR_TEXT =
  'The first argument of rikaaaPaging constructor is invalid. The argument type is array of id attribute string. For example "[#idAttribute1,#idAttribute2]".';
export const ANCHORS_ERROR_TEXT =
  "The second argument of rikaaaPaging constructor is invalid. The argument type is nodelist of HTML anchor elements.";
export const ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_1 =
  "'s argument is invalid. The argument is function with return own argument.";
export const ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_2 =
  "'s argument is invalid. The argument is function.";

const notHaveError = { isError: false, errorTxt: "" };

/**
 * 引数が、#で始まる文字列の配列であるかを判定する。
 * @param arg idAttributes
 */
export const checkingIdAttribute = (arg: any): Error => {
  const haveError = { isError: true, errorTxt: IDATTRIBUTE_ERROR_TEXT };

  if (!Array.prototype.isPrototypeOf(arg)) return haveError;
  if (arg.filter(item => typeof item !== "string").length !== 0)
    return haveError;
  if (arg.filter(item => /^#/.test(item)).length !== arg.length)
    return haveError;

  return notHaveError;
};

/**
 * 引数が、アンカーエレメントのノードリストであるかを判定する。
 * @param arg anchors
 */
export const checkingAnchors = (arg: any): Error => {
  const haveError = { isError: true, errorTxt: ANCHORS_ERROR_TEXT };
  const elementArray = Array.from(arg);

  if (!NodeList.prototype.isPrototypeOf(arg)) return haveError;
  if (elementArray.filter(item => item.tagName !== "A").length !== 0)
    return haveError;

  return notHaveError;
};

/**
 * argが引数を持った関数であるかを判定する。hookResultの時は関数であるかのみ確認する。
 * @param entiresKeyName entiresのkey
 * @param arg entires.###()の引数
 */
export const checkingEntiresFucArg = (
  entiresKeyName: string,
  arg: any
): Error => {
  const haveError = {
    isError: true,
    errorTxt: `${entiresKeyName}()${ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_1}`
  };

  if (entiresKeyName === "hookResult")
    haveError.errorTxt = `${entiresKeyName}()${ENTIRES_ARG_FUNC_DONT_HAVE_RETUREN_VAL_ERROR_TEXT_2}`;

  if (typeof arg !== "function") return haveError;
  if (!arg(true) && entiresKeyName !== "hookResult") return haveError;
  return notHaveError;
};
