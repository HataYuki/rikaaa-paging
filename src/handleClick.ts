import onebang from "./onebang";
/**
 * 第一引数に指定したノードにクリックイベントを付与し、クリック時にEventを引数で渡す。
 * @param nodeList イヴェントを追加するNodeList
 * @param callback コールバック
 */
const handleClick = (
  nodeList: NodeListOf<HTMLAnchorElement>,
  callback: Function
): void => {
  const c = onebang(callback);
  const onClickEv = (e: MouseEvent): boolean => {
    e.preventDefault();
    c(e);

    return false;
  };

  for (let i = 0; i < nodeList.length; i++) nodeList[i].onclick = onClickEv;
};

export default handleClick;
