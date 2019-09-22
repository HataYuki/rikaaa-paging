import { Ready } from "./takeReady";
import { dataStringify, dataParse } from "./dataStringify";

if (!self.history || !self.history.pushState)
  throw new Error("rikaaa-paging.js はこのブラウザに対応していません。");

/**
 *  history.pushState
 * @param ready Ready
 * @param title title
 * @param url url
 */
export const pushState = (ready: Ready, title: string, url: string): void => {
  history.pushState(dataStringify(ready), title, url);
};

/**
 *  history.replaceState
 * @param ready Ready
 * @param title title
 * @param url url
 */
export const replaceState = (
  ready: Ready,
  title: string,
  url: string
): void => {
  history.replaceState(dataStringify(ready), title, url);
};

/**
 * popstateイベント発火時にコールバックにstateを引数として渡す。
 * @param callback
 */
export const handlePopstate = (callback: Function): void => {
  self.onpopstate = (event: PopStateEvent): void => {
    callback(dataParse({ ...event.state }));
  };
};
