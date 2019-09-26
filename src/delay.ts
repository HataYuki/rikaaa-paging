/**
 * 指定時間ディレイする
 * @param duration ディレイする時間(ms)
 * @param callback ディレイ中に発火させる関数。コールバックの引数に0.ー1.の値を代入
 * @param End ディレイ終了後に発火させる関数。callbackの引数が1になった時と同時。
 */
export const delayMain = (
  duration: number,
  onDelay: Function,
  End: Function
): void => {
  const startTime = performance.now();
  let req = null,
    progress,
    _progress;
  const step = (timestamp): void => {
    req = requestAnimationFrame(step);

    if (duration !== 0) {
      progress = (timestamp - startTime) / duration;
      _progress = progress >= 1 ? 1 : progress;
    } else {
      progress = 1;
      _progress = 1;
    }

    onDelay(_progress);
    if (_progress >= 1) cancelAnimationFrame(req), End();
  };
  req = requestAnimationFrame(step);
};

/**
 * 指定時間分次のyieldの発火を遅らせる。
 * @param duration 遅らせる時間
 * @param generator Generatorのインスタンス
 * @param callback delayが発動するあいだ、発火し続ける関数。引数に0.-1.のパラメーターを返す
 */
const delay = (duration: number, g: Generator, callback: Function): void => {
  delayMain(duration, callback, () => {
    g.next();
  });
};

export default delay;
