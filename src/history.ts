import { Ready } from "./takeReady";
import { dataStringify, dataParse } from "./dataStringify";
import onebang from "./onebang";

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
  const once = onebang(callback);
  self.onpopstate = (event: PopStateEvent): void => {
    once(dataParse({ ...event.state }));
  };
};
