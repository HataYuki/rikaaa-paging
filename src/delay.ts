/**
 * 指定時間分次のyieldの発火を遅らせる。
 * @param duraiton 遅らせる時間
 * @param generator Generatorのインスタンス
 * @param callback delayが発動するあいだ、発火し続ける関数。引数に0.-1.のパラメーターを返す
 */
const delay = (duraiton: number, g: Generator, callback: Function): void => {
  let startTIme = null,
    req = null;
  const step = (timestamp): void => {
    if (!startTIme) startTIme = timestamp;
    const progressTime = timestamp - startTIme;
    if (progressTime <= duraiton)
      (req = requestAnimationFrame(step)), callback(progressTime / duraiton);
    else cancelAnimationFrame(req), g.next();
  };
  req = requestAnimationFrame(step);
};

export default delay;
