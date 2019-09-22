import "./polyfill/Array.from";
import { request, Response } from "./request";
import { Ready } from "./takeReady";
import getMeta from "./getMeta";

export interface Start
  extends Record<
    string,
    Ready | string | HTMLElement | Array<string> | string | Response | null
  > {
  ready: Ready;
  idAttribute: string;
  target: HTMLElement | null;
  classList: Array<string> | null;
  title: string | null;
  keywords: Array<string> | null;
  description: string | null;
  response: Response;
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
  request(
    ready.href,
    ready.timeout,
    ready.onProgress,
    (response: Response): void => {
      const callbackArg: Partial<Start> = {};
      const isResponseOk = response.statusText === "OK" ? true : false;
      const keywords = (): Array<string> | null => {
        if (isResponseOk && response.document)
          return getMeta("keywords", response.document)[0]
            .getAttribute("content")
            .split(",");
        else return null;
      };
      const description = (): string | null => {
        if (isResponseOk && response.document)
          return getMeta("description", response.document)[0].getAttribute(
            "content"
          );
        else return null;
      };

      callbackArg.ready = ready;
      callbackArg.idAttribute = idAttribute;
      callbackArg.target = isResponseOk
        ? response.document.getElementById(idAttribute)
        : null;
      callbackArg.classList = isResponseOk
        ? Array.from(response.document.getElementById(idAttribute).classList)
        : null;
      callbackArg.description = description();
      callbackArg.keywords = keywords();
      callbackArg.response = response;
      callbackArg.title = isResponseOk ? response.document.title : null;

      g.next(callback(callbackArg));
    }
  );
};
