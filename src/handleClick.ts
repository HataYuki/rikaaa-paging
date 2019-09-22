/**
 * 第一引数に指定したノードにクリックイベントを付与し、クリック時にEventを引数で渡す。
 * @param nodeList イヴェントを追加するNodeList
 * @param callback コールバック
 */
const handleClick = (nodeList: Element[] | any[], callback: Function): void => {
  const onClickEv = (e: MouseEvent): boolean => {
    e.preventDefault();
    callback(e);
    return false;
  };

  for (let i = 0; i < nodeList.length; i++) nodeList[i].onclick = onClickEv;
};

export default handleClick;
