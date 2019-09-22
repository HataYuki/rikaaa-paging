import { Ready } from "./takeReady";
export const dataStringify = (data: Ready): Record<string, string | number> => {
  const newData = {};

  for (const [key, value] of Object.entries(data)) {
    let _value = null;
    if (typeof value === "function") _value = value.toString();
    else _value = value;
    newData[key] = _value;
  }

  return newData;
};

export const dataParse = (
  data: Record<string, number | string>
): Partial<Ready> => {
  const newData = {};
  for (const [key, value] of Object.entries(data)) {
    let _value = null;
    if (typeof value === "string" && value.match(/(^function|=>)/)) {
      _value = Function.call(this, `return ${value}`)();
    } else {
      _value = value;
    }
    newData[key] = _value;
  }
  return newData;
};
