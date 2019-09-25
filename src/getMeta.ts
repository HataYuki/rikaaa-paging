import "./polyfill/Array.from";
/**
 * getMeta metaタグから指定されたname属性をもつElementを返す
 * @param name metaタグのname属性を指定する。
 * @param document document
 */
const getMeta = (name: string, document: Element | Document): Element[] => {
  return Array.from(document.querySelectorAll("meta")).filter(meta => {
    return meta.getAttribute("name") === name;
  });
};

export default getMeta;
