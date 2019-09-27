import "./polyfill/Array.from";
import { request, Response } from "./request";
import { Ready } from "./takeReady";
import getMeta from "./getMeta";

export interface Start
  extends Record<
    string,
    | Ready
    | string
    | HTMLElement
    | Array<string>
    | Record<string, Element | null>
    | string
    | Response
    | number
    | null
    | Function
  > {
  ready: Ready;
  idAttributes: Array<string>;
  currentTargets: Record<string, Element | null> | null;
  nextTargets: Record<string, Element | null> | null;
  title: string | null;
  keywords: Array<string> | null;
  description: string | null;
  response: Response;
  afterDelay: number;
  onDelay: Function;
}
/**
 * XMLHttprequest通信終了時、データを返す
 * @param callback startCallback
 * @param g generator
 * @param ready takeAnchorsClickの戻り値
 * @param idAttributes 更新対象のnodeのID
 * @param initializer Generatorを初期化する関数。
 */
export const takeStart = (
  callback: Function,
  g: Generator,
  ready: Ready,
  idAttributes: Array<string>,
  initializer: Function
): void => {
  request(ready.href, ready.onProgress, (response: Response):
    | void
    | boolean => {
    const callbackArg: Partial<Start> = {};
    const isResponseOk = response.statusText === "OK" ? true : false;

    if (!isResponseOk) {
      self.location.href = ready.href;
      return false;
    }

    const keywords = (): Array<string> | null => {
      if (isResponseOk && response.html)
        return getMeta("keywords", response.html)[0]
          .getAttribute("content")
          .split(",");
      else return null;
    };
    const description = (): string | null => {
      if (isResponseOk && response.html)
        return getMeta("description", response.html)[0].getAttribute("content");
      else return null;
    };

    callbackArg.ready = ready;
    callbackArg.idAttributes = idAttributes;
    callbackArg.nextTargets = isResponseOk
      ? idAttributes.reduce((a, c) => {
          const Obj = {};
          Obj[c] = response.html.querySelector(c);
          return { ...a, ...Obj };
        }, {})
      : null;
    callbackArg.currentTargets = isResponseOk
      ? idAttributes.reduce((a, c) => {
          const Obj = {};
          Obj[c] = document.querySelector(c);
          return { ...a, ...Obj };
        }, {})
      : null;
    callbackArg.description = description();
    callbackArg.keywords = keywords();
    callbackArg.response = response;
    callbackArg.title = isResponseOk
      ? response.html.querySelector("title").textContent
      : null;
    callbackArg.afterDelay = 0;
    callbackArg.onDelay = (): void => {};

    const config = callback(callbackArg);
    if (config) g.next(config);
    else initializer();
  });
};
