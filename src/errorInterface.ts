export default interface IsError extends Record<string, string | boolean> {
  isError: boolean;
  errorTxt: string;
}
