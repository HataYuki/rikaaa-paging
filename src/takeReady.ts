import handleClick from "./handleClick";
import { handlePopstate } from "./history";

export interface Ready extends Record<string, string | number | Function> {
  href: string;
  delay: number;
  timeout: number;
  onProgress: Function;
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
  const clickEv = (event: { target: HTMLAnchorElement }): void => {
    const modifiedData = callback({
      href: event.target.href,
      deley: 0,
      timeout: 1000,
      onProgress: () => {}
    });

    g.next({
      ready: modifiedData,
      isPushstate: true
    });
  };

  handleClick(anchors, clickEv);

  const popstateEv = (ready: Ready): void => {
    const modifiedData = callback({
      ...ready
    });
    g.next({
      ready: modifiedData,
      isPushstate: false
    });
  };

  handlePopstate(popstateEv);
};
