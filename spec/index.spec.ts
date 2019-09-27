import "./handleClick.spec";
import "./elementWrap.spec";
import "./delay.spec";
import "./getMeta.spec";
import "./dataStringify.spec";
import "./request.spec";
import "./error.spec";

interface karmaWindow extends Window {
  __html__: string;
}
declare var window: karmaWindow;
export default window;
