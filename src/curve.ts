export const LINER = "LINEAR";
export const EASE_IN = "EASE_IN";
export const EASE_OUT = "EASE_OUT";
export const EASE_IN_OUT = "EASE_IN_OUT";

const curve = (type, value) => {
  switch (type) {
    case LINER:
      return value;
    case EASE_IN:
      return value * value;
    case EASE_OUT:
      return value * (2 - value);
    case EASE_IN_OUT:
      return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
    default:
      return value;
  }
};
export default curve;
