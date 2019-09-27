/**
 * 特定の範囲で変化する値を特定の範囲の値に変更する。
 * @param value 変更したい値
 * @param istart 変更したい値の最小値
 * @param istop 変更したい値の最大値
 * @param ostart 変更後の最小値
 * @param ostop 変更後の最大値
 */
const map = (
  value: number,
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
): number => ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
