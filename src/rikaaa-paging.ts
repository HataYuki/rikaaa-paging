// import { Entires } from "./entire-interface";
import { takeReady, Ready } from "./takeReady";
import { takeStart, Start } from "./takeStart";
import { takeEnd, End } from "./takeEnd";
import { takeResult } from "./takeResult";
import { replaceState } from "./history";

interface Entires extends Record<string, Function> {
  ready: Function;
  start: Function;
  end: Function;
  result: Function;
}
type entires = Partial<Entires>;
const entires: entires = {};

// type phaseYield = Function | boolean | Ready | Start | End;

// interface Phase extends Generator<> {}
interface Callbacks extends Record<string, Function> {
  ready: Function;
  start: Function;
  end: Function;
  result: Function;
}
const callbacks: Partial<Callbacks> = {};

/**
 * rikaaaPaging constructor
 * @param idAttribute id attribute of target tag
 * @param anchors nodelist of a tag
 */
const rikaaaPaging = (idAttribute: string, anchors: Element[]): entires => {
  function* generatorPhase(): Generator<void, Generator, any> {
    const phase: Generator = yield;
    while (true) {
      const {
        ready,
        isPushstate
      }: { ready: Ready; isPushstate: boolean } = yield takeReady(
        callbacks.ready,
        phase,
        anchors
      );

      const start: Start = yield takeStart(
        callbacks.start,
        phase,
        ready,
        idAttribute
      );
      const end: End = yield takeEnd(callbacks.end, phase, start);
      yield takeResult(callbacks.result, phase, end, isPushstate);
    }
  }

  replaceState(
    {
      currentUrl: location.href,
      href: location.href,
      delay: 0,
      onProgress: () => {},
      timeout: 1000
    },
    document.title,
    self.location.href
  );

  // let phase: Generator;
  let generatorIsReady = true;
  entires.ready = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Ready): Ready => data;
    callbacks.ready = callback;
    return entires;
  };
  entires.start = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Start): Start => data;
    callbacks.start = callback;
    return entires;
  };
  entires.end = (callback: Function): entires => {
    if (typeof callback === "undefined") callback = (data: End): End => data;
    callbacks.end = callback;
    return entires;
  };
  entires.result = (callback: Function): void => {
    if (typeof callback === "undefined") callback = (): void => {};
    callbacks.result = callback;
    if (generatorIsReady) {
      const phase = generatorPhase();
      phase.next();
      phase.next(phase);
      generatorIsReady = false;
    }
  };

  for (const value of Object.entries(entires)) value[1]();

  return entires;
};

export default rikaaaPaging;
