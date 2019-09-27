import { Start } from "./takeStart";
import { Ready } from "./takeReady";
import getMeta from "./getMeta";
import { elementWrap, elementUnwrap } from "./elementWrap";

export interface End
  extends Record<
    string,
    | Element
    | string
    | number
    | Function
    | Ready
    | Start
    | Record<string, Element | null>
    | Array<string>
  > {
  idAttributes: Array<string>;
  previousTargets: Record<string, Element | null>;
  updatedTargets: Record<string, Element | null>;
  newUrl: string;
  afterDelay: number;
  ready: Ready;
  start: Start;
  onDelay: Function;
}

/**
 * HTMLを更新後、その結果を返す
 * @param callback endCallback
 * @param g generator
 * @param start takeGetHTMLの戻り値
 * @param initializer Generatorを初期化する関数。
 */
export const takeEnd = (
  callback: Function,
  g: Generator,
  start: Start,
  initializer: Function
): void => {
  const callbackArg: Partial<End> = {};
  callbackArg.previousTargets = {};
  callbackArg.updatedTargets = {};

  start.idAttributes.forEach(id => {
    const previousTarget = document.querySelector(id);
    callbackArg.previousTargets[id] = previousTarget;

    const wraped = previousTarget !== null ? elementWrap(previousTarget) : null;

    if (wraped !== null && start.nextTargets[id] !== null)
      wraped.removeChild(previousTarget),
        wraped.appendChild(start.nextTargets[id]);

    callbackArg.updatedTargets[id] =
      wraped !== null ? elementUnwrap(wraped) : null;
  });

  // change title
  document.title = start.title;
  // change meta
  getMeta("keywords", document)[0].setAttribute(
    "content",
    start.keywords.join(",")
  );
  getMeta("description", document)[0].setAttribute(
    "content",
    start.description
  );

  callbackArg.idAttributes = start.idAttributes;
  callbackArg.afterDelay = 0;
  callbackArg.newUrl = start.response.url;
  callbackArg.ready = start.ready;
  callbackArg.start = start;
  callbackArg.afterDelay = 0;
  callbackArg.onDelay = (): void => {};

  const config = callback(callbackArg);
  if (config) setTimeout(() => g.next(callback(callbackArg)), 0);
  else setTimeout(() => initializer(), 0);
};
