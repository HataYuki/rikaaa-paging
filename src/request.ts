const oReq = new XMLHttpRequest();

export interface Response {
  html: Element | null;
  state: number;
  statusText: string;
  url: string;
}

const HTMLtextToHTMLElement = (text: string): Element => {
  const newHTMLElement = document.createElement("html");
  const innerHTMLText = text.match(/<html[^>]*>([\s\S.]*)<\/html>/i)[1];
  newHTMLElement.innerHTML = innerHTMLText;
  return newHTMLElement;
};

/**
 * XMLHttpRequest
 * @param url リクエストをかけるURL、
 * @param timeout タイムアウトを設定
 * @param callback 指定した関数の引数として取得情報を渡す
 */
export const request = (
  url: string,
  onProgress: Function,
  callback: Function
): void => {
  oReq.abort();
  oReq.open("GET", url, true);
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
        html: HTMLtextToHTMLElement(oReq.response),
        state: oReq.status,
        statusText: oReq.statusText,
        url
      });
    }
  };
  oReq.send();
  // oReq.abort();
  // oReq.timeout = timeout;
  // oReq.open("GET", url, true);
  // oReq.responseType = "document";
  // oReq.onprogress = (oEvent): void => {
  //   if (oEvent.lengthComputable) {
  //     const percentComplete = (oEvent.loaded / oEvent.total) * 100;
  //     onProgress({ percentComplete });
  //   } else {
  //     onProgress({ percentComplete: null });
  //   }
  // };
  // oReq.onreadystatechange = (): void => {
  //   if (oReq.readyState === 4) {
  //     console.log(oReq);
  //     callback({
  //       document: oReq.responseXML,
  //       state: oReq.status,
  //       statusText: oReq.statusText,
  //       url
  //     });
  //   }
  // };
  // oReq.send();
};
