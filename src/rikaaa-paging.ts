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

// type phaseYield = Function | boolean | Ready | Start | End;

// interface Phase extends Generator<> {}

/**
 * rikaaaPaging constructor
 * @param idAttribute id attribute of target tag
 * @param anchors nodelist of a tag
 */
const rikaaaPaging = (idAttribute: string, anchors: Element[]): entires => {
  const phase = (function*(): Generator<void, Generator, any> {
    const readyCallback: Function = yield;
    const startCallback: Function = yield;
    const endCallback: Function = yield;
    const resultCallback: Function = yield;

    while (true) {
      const {
        ready,
        isPushstate
      }: { ready: Ready; isPushstate: boolean } = yield takeReady(
        readyCallback,
        phase,
        anchors
      );

      const start: Start = yield takeStart(
        startCallback,
        phase,
        ready,
        idAttribute
      );
      const end: End = yield takeEnd(endCallback, phase, start);
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
