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
  > {
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
 */
export const takeEnd = (
  callback: Function,
  g: Generator,
  start: Start
): void => {
  const callbackArg: Partial<End> = {};
  callbackArg.previousTargets = {};
  callbackArg.updatedTargets = {};

  start.idAttributes.forEach(id => {
    const previousTarget = document.querySelector(id);
    callbackArg.previousTargets[id] = previousTarget;

    const wraped = previousTarget !== null ? elementWrap(previousTarget) : null;

    if (wraped !== null && start.targets[id] !== null)
      wraped.removeChild(previousTarget), wraped.appendChild(start.targets[id]);

    callbackArg.updatedTargets[id] =
      wraped !== null ? elementUnwrap(wraped) : null;
  });

  // const previousTarget = document.getElementById(start.idAttribute);
  // const wraped = elementWrap(previousTarget);
  // wraped.removeChild(previousTarget);
  // wraped.appendChild(start.target);

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

  // callbackArg.previousTarget = previousTarget;
  // callbackArg.updatedTarget = elementUnwrap(wraped);
  callbackArg.afterDelay = 0;
  callbackArg.newUrl = start.response.url;
  callbackArg.ready = start.ready;
  callbackArg.start = start;
  callbackArg.afterDelay = 0;
  callbackArg.onDelay = (): void => {};

  // Promise.resolve().then(() => g.next(callback(callbackArg)));
  setTimeout(() => g.next(callback(callbackArg)), 0);
};
