import "./polyfill/Array.from";
/**
 * getMeta metaタグから指定されたname属性をもつElementを返す
 * @param name metaタグのname属性をしていする。
 * @param document document node
 */
const getMeta = (name: string, document: Document): Element[] => {
  return Array.from(document.querySelectorAll("meta")).filter(meta => {
    return meta.getAttribute("name") === name;
  });
};

export default getMeta;
