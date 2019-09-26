import { takeReady, Ready } from "./takeReady";
import { takeStart, Start } from "./takeStart";
import { takeEnd, End } from "./takeEnd";
import { takeResult } from "./takeResult";
import { replaceState } from "./history";
import delay from "./delay";
import curve from "./curve";

import "./polyfill/Object.entries";

interface Entires extends Record<string, Function> {
  ready: Function;
  start: Function;
  end: Function;
  result: Function;
  curve: Function;
}
type entires = Partial<Entires>;
const entires: entires = {};

interface Callbacks extends Record<string, Function> {
  ready: Function;
  start: Function;
  end: Function;
  result: Function;
}
const callbacks: Partial<Callbacks> = {};

/**
 * rikaaaPaging constructor
 * @param idAttributes array of id attribute. The id attribute is update target.
 * @param anchors nodelist of HTML anchor elements.
 */
const rikaaaPaging = (
  idAttributes: Array<string>,
  anchors: NodeListOf<HTMLAnchorElement>
): entires => {
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

      yield delay(ready.afterDelay, phase, ready.onDelay);

      const start: Start = yield takeStart(
        callbacks.start,
        phase,
        ready,
        idAttributes
      );

      yield delay(start.afterDelay, phase, start.onDelay);

      const end: End = yield takeEnd(callbacks.end, phase, start);

      yield delay(end.afterDelay, phase, end.onDelay);

      yield takeResult(callbacks.result, phase, end, isPushstate);
    }
  }

  replaceState(
    {
      currentUrl: location.href,
      href: location.href,
      afterDelay: 0,
      onProgress: () => {},
      onDelay: () => {}
    },
    document.title,
    self.location.href
  );

  // let phase: Generator;
  const generatorInitialize = (): void => {
    const phase = generatorPhase();
    phase.next();
    phase.next(phase);
  };

  entires.ready = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Ready): Ready => data;
    callbacks.ready = callback;
    generatorInitialize();
    return entires;
  };
  entires.start = (callback: Function): entires => {
    if (typeof callback === "undefined")
      callback = (data: Start): Start => data;
    callbacks.start = callback;
    generatorInitialize();
    return entires;
  };
  entires.end = (callback: Function): entires => {
    if (typeof callback === "undefined") callback = (data: End): End => data;
    callbacks.end = callback;
    generatorInitialize();
    return entires;
  };
  entires.result = (callback: Function): void => {
    if (typeof callback === "undefined") callback = (): void => {};
    callbacks.result = callback;
    generatorInitialize();
  };
  entires.curve = curve;

  for (const value of Object.entries(entires)) value[1]();

  return entires;
};

export default rikaaaPaging;
