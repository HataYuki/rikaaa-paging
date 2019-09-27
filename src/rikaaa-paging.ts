import { takeReady, Ready } from "./takeReady";
import { takeStart, Start } from "./takeStart";
import { takeEnd, End } from "./takeEnd";
import { takeResult } from "./takeResult";
import { replaceState } from "./history";
import delay from "./delay";
import curve from "./curve";
import map from "./map";
import Error from "./errorInterface";
import {
  checkingIdAttribute,
  checkingAnchors,
  checkingEntiresFucArg
} from "./error.constructor";

import "./polyfill/Object.entries";
import "./polyfill/Array.from";

interface Entires extends Record<string, Function> {
  hookReay: Function;
  hookStart: Function;
  hookEnd: Function;
  hookResult: Function;
  curve: Function;
  map: Function;
}
type entires = Partial<Entires>;
const entires: entires = {};

interface Callbacks extends Record<string, Function> {
  hookReady: Function;
  hookStart: Function;
  hookEnd: Function;
  hookResult: Function;
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
  self.onpageshow = (event): void => {
    if (event.persisted) self.location.reload();
  };

  replaceState(
    {
      currentUrl: null,
      href: location.href,
      afterDelay: 0,
      onProgress: () => {},
      onDelay: () => {}
    },
    document.title,
    self.location.href
  );

  const resultArg1: Error = checkingIdAttribute(idAttributes);
  const resultArg2: Error = checkingAnchors(anchors);

  if (resultArg1.isError) throw new Error(resultArg1.errorTxt);
  if (resultArg2.isError) throw new Error(resultArg2.errorTxt);

  function* generatorPhase(): Generator<void, Generator, any> {
    const {
      phase,
      generatorInitialize
    }: { phase: Generator; generatorInitialize: Function } = yield;

    while (true) {
      const {
        ready,
        isPushstate
      }: { ready: Ready; isPushstate: boolean } = yield takeReady(
        callbacks.hookReady,
        phase,
        anchors,
        generatorInitialize
      );

      yield delay(ready.afterDelay, phase, ready.onDelay);

      const start: Start = yield takeStart(
        callbacks.hookStart,
        phase,
        ready,
        idAttributes,
        generatorInitialize
      );

      yield delay(start.afterDelay, phase, start.onDelay);

      const end: End = yield takeEnd(
        callbacks.hookEnd,
        phase,
        start,
        generatorInitialize
      );

      yield delay(end.afterDelay, phase, end.onDelay);

      yield takeResult(callbacks.hookResult, phase, end, isPushstate);
    }
  }

  // let phase: Generator;
  const generatorInitialize = (): void => {
    const phase = generatorPhase();
    phase.next();
    phase.next({ phase, generatorInitialize });
  };

  /**
   * entiresの関数を初期化する
   * @param key hookReady | hookStart | hookEnd | hookResult
   * @param callback
   */
  const entiresInitialize = (
    key: string,
    callback: Function
  ): Partial<Entires> => {
    if (typeof callback === "undefined")
      callback = (
        data: Ready | Start | End | void
      ): Ready | Start | End | void => data;

    const result: Error = checkingEntiresFucArg(key, callback);
    if (result.isError) throw new Error(result.errorTxt);

    callbacks[key] = callback;
    generatorInitialize();
    if (key !== "hookResult") return entires;
  };

  ["hookReady", "hookStart", "hookEnd", "hookResult"].forEach(key => {
    entires[key] = (callback: Function): entires =>
      entiresInitialize(key, callback);
  });

  // ready start end resultをそれぞれ一回実行する。
  for (const value of Object.entries(entires)) value[1]();

  entires.curve = curve;
  entires.map = map;

  return entires;
};

export default rikaaaPaging;
