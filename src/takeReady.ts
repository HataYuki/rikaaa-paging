import handleClick from "./handleClick";
import { handlePopstate } from "./history";

export interface Ready {
  currentUrl: string;
  href: string;
  delay: number;
  timeout: number;
  onProgress: Function;
}

interface ReadyEvent extends Ready, MouseEvent {
  target: HTMLAnchorElement;
}

/**
 * クリック時にReadyを返す；
 * @param callback readyCallback
 * @param g generator
 * @param anchors nodeList of anchors
 */
export const takeReady = (
  callback: Function,
  g: Generator,
  anchors: Element[]
): void => {
  const currentUrl = location.href;
  const callbackArg: Partial<Ready> = {};

  const event = (event: ReadyEvent): void => {
    const isMouseEvent = event.type === "click" || event.type ? true : false;

    callbackArg.currentUrl = currentUrl;
    callbackArg.href = isMouseEvent ? event.target.href : event.href;
    callbackArg.delay = isMouseEvent ? 0 : event.delay;
    callbackArg.timeout = isMouseEvent ? 1000 : event.timeout;
    callbackArg.onProgress = isMouseEvent ? (): void => {} : event.onProgress;

    g.next({
      ready: callback(callbackArg),
      isPushstate: isMouseEvent ? true : false
    });
  };

  handleClick(anchors, event);
  handlePopstate(event);
};
