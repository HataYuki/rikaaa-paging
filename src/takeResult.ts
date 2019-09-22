import { End } from "./takeEnd";
import { pushState } from "./history";

/**
 *
 * @param callback resultCallback
 * @param g Generator
 * @param end End
 */
export const takeResult = (
  callback: Function,
  g: Generator,
  end: End,
  isPushstate: boolean
): void => {
  callback({
    oldUrl: self.location.href,
    newUrl: end.ready.href,
    updatedTarget: end.updatedTarget
  });

  if (isPushstate) pushState(end.ready, end.start.title, end.newUrl);
  Promise.resolve().then(() => g.next());
};
