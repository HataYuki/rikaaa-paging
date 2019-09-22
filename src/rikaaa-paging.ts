// import { Entires } from "./entire-interface";
import { takeReady, Ready } from "./takeReady";
import { takeStart, Start } from "./takeStart";
import { takeEnd, End } from "./takeEnd";
import { takeResult } from "./takeResult";
import { replaceState } from "./history";

interface Entires {
  ready: Function;
  start: Function;
  end: Function;
  result: Function;
}
type entires = Partial<Entires>;
const entires: entires = {};

// interface Phase extends Generator<> {}

/**
 * rikaaaPaging constructor
 * @param idAttribute id attribute of target tag
 * @param anchors nodelist of a tag
 */
const rikaaaPaging = (idAttribute: string, anchors: Element[]): entires => {
  const phase = (function*(): Generator<any, any, any> {
    const readyCallback = yield;
    const startCallback = yield;
    const endCallback = yield;
    const resultCallback = yield;

    while (true) {
      const { ready, isPushstate } = yield takeReady(
        readyCallback,
        phase,
        anchors
      );

      const start = yield takeStart(startCallback, phase, ready, idAttribute);
      const end = yield takeEnd(endCallback, phase, start);
      yield takeResult(resultCallback, phase, end, isPushstate);
    }
  })();

  replaceState(
    {
      href: self.location.href,
      delay: 0,
      onProgress: () => {},
      timeout: 1000
    },
    document.title,
    self.location.href
  );

  entires.ready = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Ready): Ready => data;
    phase.next(callback);
    return entires;
  };
  entires.start = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Start): Start => data;
    phase.next(callback);
    return entires;
  };
  entires.end = (callback: Function): entires => {
    if (typeof callback === "undefined") callback = (data: End): End => data;
    phase.next(callback);
    return entires;
  };
  entires.result = (callback: Function): void => {
    if (typeof callback === "undefined") callback = (): void => {};
    phase.next(callback);
  };

  phase.next();

  return entires;
};

export default rikaaaPaging;
