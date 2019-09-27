import handleClick from "./handleClick";
import { handlePopstate } from "./history";

export interface Ready {
  currentUrl: string;
  href: string;
  afterDelay: number;
  onProgress: Function;
  onDelay: Function;
}

interface ReadyEvent extends Ready, MouseEvent {
  target: HTMLAnchorElement;
}

/**
 * クリック/onpopstate時にReadyを返す
 * @param callback readyCallback
 * @param g generator
 * @param anchors nodeList of anchors
 *  @param initializer Generatorを初期化する関数。
 */
export const takeReady = (
  callback: Function,
  g: Generator,
  anchors: NodeListOf<HTMLAnchorElement>,
  initalizer: Function
): void => {
  const currentUrl = location.href;
  const callbackArg: Partial<Ready> = {};

  const event = (event: ReadyEvent): void => {
    const isMouseEvent = event.type === "click" || event.type ? true : false;
    const href = isMouseEvent ? event.target.href : event.href;
    const different = location.href !== href ? true : false;

    callbackArg.currentUrl = currentUrl;
    callbackArg.href = href;
    callbackArg.afterDelay = isMouseEvent ? 0 : event.afterDelay;
    callbackArg.onProgress = isMouseEvent ? (): void => {} : event.onProgress;
    callbackArg.onDelay = isMouseEvent ? (): void => {} : event.onDelay;

    const config = callback(callbackArg);

    if (config)
      g.next({
        ready: config,
        isPushstate: isMouseEvent && different ? true : false
      });
    else initalizer();
  };

  handleClick(anchors, event);
  handlePopstate(event);
};
