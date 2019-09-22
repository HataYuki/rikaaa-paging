import { Start } from "./takeStart";
import { Ready } from "./takeReady";
import getMeta from "./getMeta";
import { elementWrap, elementUnwrap } from "./elementWrap";

export interface End
  extends Record<string, Element | string | number | Ready | Start> {
  previousTarget: Element;
  updatedTarget: Element;
  newUrl: string;
  delay: number;
  ready: Ready;
  start: Start;
}

/**
 * HTMLを更新後、その結果を返す
 * @param callback endCallback
 * @param g generator
 * @param start takeGetHTMLの戻り値
 */
export const takeEnd = (
  callback: Function,
  g: Generator,
  start: Start
): void => {
  const previousTarget = document.getElementById(start.idAttribute);
  const wraped = elementWrap(previousTarget);
  wraped.removeChild(previousTarget);
  wraped.append(start.target);

  const updatedTarget = elementUnwrap(wraped);

  // change title
  document.title = start.title;
  // change meta
  const metaKeywords = getMeta("keywords", document)[0];
  const metaDescription = getMeta("description", document)[0];
  metaKeywords.setAttribute("content", start.keywords.join(","));
  metaDescription.setAttribute("content", start.description);

  const modifiedData = callback({
    previousTarget,
    updatedTarget,
    delay: 0,
    newUrl: start.response.url,
    ready: start.ready,
    start: start
  });

  Promise.resolve().then(() => {
    g.next(modifiedData);
  });
};
