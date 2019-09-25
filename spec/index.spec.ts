import "./handleClick.spec";

interface karmaWindow extends Window {
  __html__: string;
}
declare var window: karmaWindow;

export default window;
