const oReq = new XMLHttpRequest();

export interface Response {
  document: Document | null;
  state: number;
  statusText: string;
  url: string;
}

/**
 * XMLHttpRequest
 * @param url リクエストをかけるURL、
 * @param timeout タイムアウトを設定
 * @param callback 指定した関数の引数として取得情報を渡す
 */
export const request = (
  url: string,
  timeout: number,
  callback: Function,
  onProgress: Function
): void => {
  oReq.abort();
  oReq.timeout = timeout;

  oReq.open("GET", url, true);
  oReq.responseType = "document";

  oReq.onprogress = (oEvent): void => {
    if (oEvent.lengthComputable) {
      const percentComplete = (oEvent.loaded / oEvent.total) * 100;
      onProgress({ percentComplete });
    } else {
      onProgress({ percentComplete: null });
    }
  };

  oReq.onreadystatechange = (): void => {
    if (oReq.readyState === 4) {
      callback({
        document: oReq.responseXML,
        state: oReq.status,
        statusText: oReq.statusText,
        url
      });
    }
  };

  oReq.send();
};
