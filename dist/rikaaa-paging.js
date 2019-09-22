var rikaaapaging = (function () {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};











function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}



function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/**
 * 第一引数に指定したノードにクリックイベントを付与し、クリック時にEventを引数で渡す。
 * @param nodeList イヴェントを追加するNodeList
 * @param callback コールバック
 */
var handleClick = function (nodeList, callback) {
    var onClickEv = function (e) {
        e.preventDefault();
        callback(e);
        return false;
    };
    nodeList.forEach(function (node) {
        node.onclick = onClickEv;
    });
};

var _this = undefined;
var dataStringify = function (data) {
    var e_1, _a;
    var newData = {};
    try {
        for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            var _value = null;
            if (typeof value === "function")
                _value = value.toString();
            else
                _value = value;
            newData[key] = _value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newData;
};
var dataParse = function (data) {
    var e_2, _a;
    var newData = {};
    try {
        for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            var _value = null;
            if (typeof value === "string" && value.match(/(^function|=>)/)) {
                _value = Function.call(_this, "return " + value)();
            }
            else {
                _value = value;
            }
            newData[key] = _value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return newData;
};

if (!self.history || !self.history.pushState)
    throw new Error("rikaaa-paging.js はこのブラウザに対応していません。");
/**
 *  history.pushState
 * @param ready Ready
 * @param title title
 * @param url url
 */
var pushState = function (ready, title, url) {
    history.pushState(dataStringify(ready), title, url);
};
/**
 *  history.replaceState
 * @param ready Ready
 * @param title title
 * @param url url
 */
var replaceState = function (ready, title, url) {
    history.replaceState(dataStringify(ready), title, url);
};
/**
 * popstateイベント発火時にコールバックにstateを引数として渡す。
 * @param callback
 */
var handlePopstate = function (callback) {
    self.onpopstate = function (event) {
        callback(dataParse(__assign({}, event.state)));
    };
};

/**
 * クリック/onpopstate時にReadyを返す
 * @param callback readyCallback
 * @param g generator
 * @param anchors nodeList of anchors
 */
var takeReady = function (callback, g, anchors) {
    var currentUrl = location.href;
    var callbackArg = {};
    var event = function (event) {
        var isMouseEvent = event.type === "click" || event.type ? true : false;
        callbackArg.currentUrl = currentUrl;
        callbackArg.href = isMouseEvent ? event.target.href : event.href;
        callbackArg.afterDelay = isMouseEvent ? 0 : event.afterDelay;
        callbackArg.timeout = isMouseEvent ? 1000 : event.timeout;
        callbackArg.onProgress = isMouseEvent ? function () { } : event.onProgress;
        callbackArg.onDelay = isMouseEvent ? function () { } : event.onDelay;
        g.next({
            ready: callback(callbackArg),
            isPushstate: isMouseEvent ? true : false
        });
    };
    handleClick(anchors, event);
    handlePopstate(event);
};

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === "function" || toStr.call(fn) === "[object Function]";
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };
        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;
            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);
            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }
            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== "undefined") {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError("Array.from: when provided, the second argument must be a function");
                }
                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }
            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);
            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);
            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] =
                        typeof T === "undefined"
                            ? mapFn(kValue, k)
                            : mapFn.call(T, kValue, k);
                }
                else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    })();
}

var oReq = new XMLHttpRequest();
/**
 * XMLHttpRequest
 * @param url リクエストをかけるURL、
 * @param timeout タイムアウトを設定
 * @param callback 指定した関数の引数として取得情報を渡す
 */
var request = function (url, timeout, onProgress, callback) {
    oReq.abort();
    oReq.timeout = timeout;
    oReq.open("GET", url, true);
    oReq.responseType = "document";
    oReq.onprogress = function (oEvent) {
        if (oEvent.lengthComputable) {
            var percentComplete = (oEvent.loaded / oEvent.total) * 100;
            onProgress({ percentComplete: percentComplete });
        }
        else {
            onProgress({ percentComplete: null });
        }
    };
    oReq.onreadystatechange = function () {
        if (oReq.readyState === 4) {
            callback({
                document: oReq.responseXML,
                state: oReq.status,
                statusText: oReq.statusText,
                url: url
            });
        }
    };
    oReq.send();
};

/**
 * getMeta metaタグから指定されたname属性をもつElementを返す
 * @param name metaタグのname属性をしていする。
 * @param document document node
 */
var getMeta = function (name, document) {
    return Array.from(document.querySelectorAll("meta")).filter(function (meta) {
        return meta.getAttribute("name") === name;
    });
};

/**
 * XMLHttprequest通信終了時、データを返す
 * @param callback startCallback
 * @param g generator
 * @param ready takeAnchorsClickの戻り値
 * @param idAttribute 更新対象のnodeのID
 */
var takeStart = function (callback, g, ready, idAttribute) {
    request(ready.href, ready.timeout, ready.onProgress, function (response) {
        var callbackArg = {};
        var isResponseOk = response.statusText === "OK" ? true : false;
        var keywords = function () {
            if (isResponseOk && response.document)
                return getMeta("keywords", response.document)[0]
                    .getAttribute("content")
                    .split(",");
            else
                return null;
        };
        var description = function () {
            if (isResponseOk && response.document)
                return getMeta("description", response.document)[0].getAttribute("content");
            else
                return null;
        };
        callbackArg.ready = ready;
        callbackArg.idAttribute = idAttribute;
        callbackArg.target = isResponseOk
            ? response.document.getElementById(idAttribute)
            : null;
        callbackArg.classList = isResponseOk
            ? Array.from(response.document.getElementById(idAttribute).classList)
            : null;
        callbackArg.description = description();
        callbackArg.keywords = keywords();
        callbackArg.response = response;
        callbackArg.title = isResponseOk ? response.document.title : null;
        callbackArg.afterDelay = 0;
        callbackArg.onDelay = function () { };
        g.next(callback(callbackArg));
    });
};

/**
 * 引数に指定したelementをdivで囲って、囲ったElementを返す。
 * @param element 囲う対象
 */
var elementWrap = function (element) {
    var wrapElement = document.createElement("div");
    element.parentNode.insertBefore(wrapElement, element);
    wrapElement.appendChild(element);
    return wrapElement;
};
/**
 * 引数に指定したelementが囲う要素を外に出す。
 * @param element 囲っている対象
 */
var elementUnwrap = function (element) {
    var wrapElement = element;
    var childElement = Array.from(element.childNodes)[0];
    wrapElement.parentNode.insertBefore(childElement, wrapElement);
    wrapElement.parentNode.removeChild(wrapElement);
    return childElement;
};

/**
 * HTMLを更新後、その結果を返す
 * @param callback endCallback
 * @param g generator
 * @param start takeGetHTMLの戻り値
 */
var takeEnd = function (callback, g, start) {
    var callbackArg = {};
    var previousTarget = document.getElementById(start.idAttribute);
    var wraped = elementWrap(previousTarget);
    wraped.removeChild(previousTarget);
    wraped.append(start.target);
    // change title
    document.title = start.title;
    // change meta
    getMeta("keywords", document)[0].setAttribute("content", start.keywords.join(","));
    getMeta("description", document)[0].setAttribute("content", start.description);
    callbackArg.previousTarget = previousTarget;
    callbackArg.updatedTarget = elementUnwrap(wraped);
    callbackArg.afterDelay = 0;
    callbackArg.newUrl = start.response.url;
    callbackArg.ready = start.ready;
    callbackArg.start = start;
    callbackArg.afterDelay = 0;
    callbackArg.onDelay = function () { };
    Promise.resolve().then(function () { return g.next(callback(callbackArg)); });
};

/**
 *
 * @param callback resultCallback
 * @param g Generator
 * @param end End
 */
var takeResult = function (callback, g, end, isPushstate) {
    callback({
        oldUrl: end.ready.currentUrl,
        newUrl: end.ready.href,
        updatedTarget: end.updatedTarget,
        previousTarget: end.previousTarget
    });
    if (isPushstate)
        pushState(end.ready, end.start.title, end.newUrl);
    Promise.resolve().then(function () { return g.next(); });
};

/**
 * 指定時間分次のyieldの発火を遅らせる。
 * @param duraiton 遅らせる時間
 * @param generator Generatorのインスタンス
 * @param callback delayが発動するあいだ、発火し続ける関数。引数に0.-1.のパラメーターを返す
 */
var delay = function (duraiton, g, callback) {
    var startTIme = null, req = null;
    var step = function (timestamp) {
        if (!startTIme)
            startTIme = timestamp;
        var progressTime = timestamp - startTIme;
        if (progressTime <= duraiton)
            req = requestAnimationFrame(step), callback(progressTime / duraiton);
        else
            cancelAnimationFrame(req), g.next();
    };
    req = requestAnimationFrame(step);
};

var entires = {};
var callbacks = {};
/**
 * rikaaaPaging constructor
 * @param idAttribute id attribute of target tag
 * @param anchors nodelist of a tag
 */
var rikaaaPaging = function (idAttribute, anchors) {
    var e_1, _a;
    function generatorPhase() {
        var phase, _a, ready, isPushstate, start, end;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/];
                case 1:
                    phase = _b.sent();
                    _b.label = 2;
                case 2:
                    
                    return [4 /*yield*/, takeReady(callbacks.ready, phase, anchors)];
                case 3:
                    _a = _b.sent(), ready = _a.ready, isPushstate = _a.isPushstate;
                    return [4 /*yield*/, delay(ready.afterDelay, phase, ready.onDelay)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, takeStart(callbacks.start, phase, ready, idAttribute)];
                case 5:
                    start = _b.sent();
                    return [4 /*yield*/, delay(start.afterDelay, phase, start.onDelay)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, takeEnd(callbacks.end, phase, start)];
                case 7:
                    end = _b.sent();
                    return [4 /*yield*/, delay(end.afterDelay, phase, end.onDelay)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, takeResult(callbacks.result, phase, end, isPushstate)];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 2];
                case 10: return [2 /*return*/];
            }
        });
    }
    replaceState({
        currentUrl: location.href,
        href: location.href,
        afterDelay: 0,
        onProgress: function () { },
        timeout: 1000,
        onDelay: function () { }
    }, document.title, self.location.href);
    // let phase: Generator;
    var generatorInitialize = function () {
        var phase = generatorPhase();
        phase.next();
        phase.next(phase);
    };
    entires.ready = function (callback) {
        if (typeof callback === "undefined")
            callback = function (data) { return data; };
        callbacks.ready = callback;
        generatorInitialize();
        return entires;
    };
    entires.start = function (callback) {
        if (typeof callback === "undefined")
            callback = function (data) { return data; };
        callbacks.start = callback;
        generatorInitialize();
        return entires;
    };
    entires.end = function (callback) {
        if (typeof callback === "undefined")
            callback = function (data) { return data; };
        callbacks.end = callback;
        generatorInitialize();
        return entires;
    };
    entires.result = function (callback) {
        if (typeof callback === "undefined")
            callback = function () { };
        callbacks.result = callback;
        generatorInitialize();
    };
    try {
        for (var _b = __values(Object.entries(entires)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var value = _c.value;
            value[1]();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return entires;
};

return rikaaaPaging;

}());
