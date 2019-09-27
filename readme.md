# `rikaaa-paging.js`

rikaaa-paging is plugin in order to impliment asynchronous transition between website's page.  
This plugin is using Ajax,History API and Generator.  
The function of this plugin similar to [pjax](https://github.com/falsandtru/pjax-api/tree/master) and [barba.js](https://github.com/barbajs/barba/tree/1.x).  
Please see [example](https://github.com/HataYuki/rikaaa-paging/tree/develop/example).

## Installation & Usage

```bash
import rikaaaPaging from "rikaaa-paging";

var entires = rikaaaPaging(
    ["#header", "#article", "#footer"],
    document.querySelectorAll("a")
);
```

```bash
<script src="rikaaa-paging/dist/rikaaa-paging.iife.js"></script>

var entires = self.rikaaaPaging(
    ["#header", "#article", "#footer"],
    document.querySelectorAll("a")
);
```

## Progress

1. **The ahchor element was clicked. browser back | forward.**
1. **The hookReady() method of this plugin will be triggerd.**
1. **delay**
1. **XMLHttpRequest**
1. **The hookStart() method of this plugin will be triggerd.**
1. **delay**
1. **The website will be transformed.**
1. **The hookEnd() method of this plugin will be triggerd.**
1. **delay**
1. **The hookResult() method of this plugin will be triggerd.**
1. **history.pushState() method will be triggerd. The url was changed.**
1. **back to list 1.**

## Constructor

---

```bash
var entires = rikaaaPaging(ArrayOfIdAttribute,NodeListOfAnchorElement);
```

| argument                 | description                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ArrayOfIdAttribute       | The parameter to set array of html id attribute. The string of id attribute is equivalent with css selector. The HTML tag with this id will be updated. |
| NodeListOfAnchorElements | The parameter to set nodelist of anchor element. The webpage transition and hookReady function will be start when this anchor elements clicked.         |

## Methods

### **・entires.hookReady(function)**

---

_The method will be triggerd when the anchor element you seted clicked or browser back / forward._  
_The argument of this method is must be function with return own argument or function with return "false"._
_If the return value is own argument,The process of this plugin will be continu._
_If the return value is false, The process of this plugin will be cancel._

```bash
var entires = rikaaaPaging(["#header", "#article", "#footer"],document.querySelectorAll("a"));

entires.hookReady(function(config) {
    config.currentUrl;
    config.href;
    config.afterDelay = 1000;
    config.onProgress = function(progressByPercent){
        console.log(progressByPercent);
    };
    config.onDelay = function(progress){
        console.log(progress);
    };

    return config;
});
```

| parameter         | type     | description                                                                                                                                                                                                                    |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| config.currentUrl | string   | The parameter is current url.                                                                                                                                                                                                  |
| config.href       | string   | The parameter is new url. The XMLHttpRequest use this parameter with XMLHttpRequest.open method.                                                                                                                               |
| config.afterDelay | number   | The parameter is delay time. This parameter delay entires.hookStart() method. The default value is 0.                                                                                                                          |
| config.onProgress | Function | The parameter is function. This function will be running while XMLHttpRequest.onprogress event triggring. The progress value of XMLHttpRequest will be assigned to argument of this function. This range of value is 0 to 100. |
| config.onDelay    | Function | The parameter is function. This function will be running while Delaying entires.hookStart() method. The progress value of delay will be assigned to argument of this function.                                                 |

### **・entires.hookStart(function)**

---

_This method will be triggerd when XMLHttpRequest ended._  
 _If you set "config.afterDelay" parameter with "hookReady" function,this function will be delay._
_The argument of this method is must be function with return own argument or function with return "false"._
_If the return value is own argument,The process of this plugin will be continu._
_If the return value is false, The process of this plugin will be cancel._

```bash
var entires = rikaaaPaging(["#header", "#article", "#footer"],document.querySelectorAll("a"));



entires.hookStart(function(config) {
    config.ready;
    config.idAttributes;
    config.currentTargets;
    config.nextTargets;
    config.title;
    config.keywords;
    config.description;
    config.response;
    config.afterDelay;
    config.onDelay;

    return config;
});
```

| parameter            | type                   | description                                                                                                                                                                  |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config.ready         | Record<string,any>     | The parameter is same as own argument of function assigned entires.hookReady() method's argument.                                                                            |
| config.idAttributes  | Array of string        | The parameter is same as first argument of contructor.                                                                                                                       |
| onfig.currentTargets | Record<string,Element> | The parameter is Record. The key is string of id attribute. The value is Element. This Element will be overwrited by value of config.nextTargets.                            |
| config.nextTargets   | Record<string,Element> | The parameter is Recorde. The key is string of id attribute. The value is Element. The Element will be added to curent DOM tree.                                             |
| config.title         | string                 | The parameter is new content of title tag.                                                                                                                                   |
| config.keywords      | Array of string        | The parameter is new content of keywords.                                                                                                                                    |
| config.description   | string                 | The parameter is new content of description.                                                                                                                                 |
| config.response      | Recode<string,any>     | The parameter is return value of XMLHttpRequest. However, this value is not parfect return value.                                                                            |
| config.afterDelay    | number                 | The parameter is delay time. This parameter delay entires.hookEnd() method. The default value is 0.                                                                          |
| config.onDelay       | Function               | The parameter is function. This function will be running while Delaying entires.hookEnd() method. The progress value of delay will be assigned to argument of this function. |

### **・entires.hookEnd()**

---

_This method will be triggerd when the dom overwrited._  
 _If you set "config.afterDelay" parameter with "hookStart" function,this function will be delay._
_The argument of this method is must be function with return own argument or function with return "false"._
_If the return value is own argument,The process of this plugin will be continu._
_If the return value is false, The process of this plugin will be cancel._

```bash
var entires = rikaaaPaging(["#header", "#article", "#footer"],document.querySelectorAll("a"));

entires.hookEnd(function(config) {
    config.idAttributes;
    config.previousTargets;
    config.updatedTargets;
    config.newUrl;
    config.ready;
    config.start;
    config.afterDelay;
    config.onDelay;

    return config;
});
```

| parameter              | type                   | description                                                                                                                                                                     |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config.idAttributes    | Array of string        | The parameter is same as first argument of contructor.                                                                                                                          |
| config.previousTargets | Record<string,Element> | The parameter is Record. The key is string of id attribute. The value is Element. This Element was already overwrited by config.updatedTargets value.                           |
| config.updatedTargets  | Record<string,Element> | The parameter is Record. The key is string of id attribute. The value is Element. This Element was already added to DOM tree.                                                   |
| config.newUrl          | string                 | The parameter is new url. This parameter is third argument history.pushstate() method.                                                                                          |
| config.ready           | Record<string,any>     | The parameter is same as own argument of function assigned entires.hookReady() method's argument.                                                                               |
| config.start           | Record<string,any>     | The parameter is same as own argument of function assigned entires.hookStart() method's argument.                                                                               |
| config.afterDelay      | number                 | The parameter is delay time. This parameter delay entires.hookResult() method. The default value is 0.                                                                          |
| config.onDelay         | Function               | The parameter is function. This function will be running while Delaying entires.hookResult() method. The progress value of delay will be assigned to argument of this function. |

- **・entires.hookResult()**  
  _This method will be triggerd when just before history.pushState/history.replaceState._  
  _If you set "config.afterDelay" parameter with "hookEnd" function. this function will be delay._  
  _The argument of this method is function without return value._

```bash
var entires = rikaaaPaging(["#header", "#article", "#footer"],document.querySelectorAll("a"));

entires.hookResult(function(config) {
    config.oldUrl;
    config.newUrl;
    config.updatedTarget;
    config.previousTarget;

    return config;
});
```

| parameter             | type                   | description                                                                                                                                           |
| --------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| config.oldUrl         | string                 | The parameter is old url. This url will be overwrite by new url.                                                                                      |
| config.newUrl         | string                 | The parameter is new url.                                                                                                                             |
| config.updatedTarget  | Record<string,Element> | The parameter is Record. The key is string of id attribute. The value is Element. This Element was already added to DOM tree.                         |
| config.previousTarget | Record<string,Element> | The parameter is Record. The key is string of id attribute. The value is Element. This Element was already overwrited by config.updatedTargets value. |

### **・entires.curve(type,value)**

---

_The function of method will be easing value._

| argument | type   | description                                                                                                    |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| type     | string | The parameter to set easing type. The variety of this parameter is "LINER","EASE_IN","EASE_OUT","EASE_IN_OUT". |
| value    | number | The parameter to set value. This value will be easing. The range of parameter is 0 to 1.                       |

### **・entires.map(value,istart,istop,ostart,ostop)**

---

_The function of method is equivalent with map function of Processing._  
 Prease see [https://processing.org/reference/map\_.html](https://processing.org/reference/map_.html)

## Browser Support

- Google Chrome
- Safari
- Firefox
- Edge
- IE 11

## License

Apache-2.0 © [rikaaa.org](http://rikaaa.org/)
