import "./polyfill/Array.from";

/**
 * 引数に指定したelementをdivで囲って、囲ったElementを返す。
 * @param element 囲う対象
 */
const elementWrap = (element: Element): Element => {
  const wrapElement = document.createElement("div");

  element.parentNode.insertBefore(wrapElement, element);
  wrapElement.appendChild(element);
  return wrapElement;
};

/**
 * 引数に指定したelementが囲う要素を外に出す。
 * @param element 囲っている対象
 */
const elementUnwrap = (element: Element): Element => {
  const wrapElement = element;
  const childElement = Array.from(element.childNodes)[0];

  wrapElement.parentNode.insertBefore(childElement, wrapElement);

  wrapElement.parentNode.removeChild(wrapElement);
  return childElement;
};

export { elementWrap, elementUnwrap };
