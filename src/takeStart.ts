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
    | string
    | Response
    | number
    | null
    | Function
  > {
  ready: Ready;
  idAttribute: string;
  target: HTMLElement | null;
  classList: Array<string> | null;
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
 * @param idAttribute 更新対象のnodeのID
 */
export const takeStart = (
  callback: Function,
  g: Generator,
  ready: Ready,
  idAttribute: string
): void => {
  request(ready.href, ready.onProgress, (response: Response): void => {
    const callbackArg: Partial<Start> = {};
    const isResponseOk = response.statusText === "OK" ? true : false;

    if (!isResponseOk) self.location.href = ready.href;

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
    callbackArg.idAttribute = idAttribute;
    callbackArg.target = isResponseOk
      ? response.html.querySelector(`#${idAttribute}`)
      : null;
    callbackArg.classList = isResponseOk
      ? Array.from(response.html.querySelector(`#${idAttribute}`).classList)
      : null;
    callbackArg.description = description();
    callbackArg.keywords = keywords();
    callbackArg.response = response;
    callbackArg.title = isResponseOk
      ? response.html.querySelector("title").textContent
      : null;
    callbackArg.afterDelay = 0;
    callbackArg.onDelay = (): void => {};

    g.next(callback(callbackArg));
  });
};
