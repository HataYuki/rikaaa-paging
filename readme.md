# `rikaaa-paging.js`

rikaaa-paging is plugin in order to impliment asynchronous transition between website's page.  
This plugin is using Ajax,History API and Generator.  
The function of plugin similar to [pjax](https://github.com/falsandtru/pjax-api/tree/master) and [barba.js](https://github.com/barbajs/barba/tree/1.x).  
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

## Constructor

```bash
var entires = rikaaaPaging(ArrayOfIdAttribute,NodeListOfAnchorElement);
```

| argument                 | description                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ArrayOfIdAttribute       | The parameter to set array of html id attribute. The string of id attribute is equivalent with css selector. The HTML tag with this id will be updated. |
| NodeListOfAnchorElements | The parameter to set nodelist of anchor element. The webpage transition and hookReady function will be start when this anchor elements clicked.         |

## Methods

- **entires.hookReady(function)**  
  _The function will be triggerd when the anchor element you seted clicked or browser back / forward._

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

    return config; // <= Required!!
});
```

| parameter         | description |
| ----------------- | ----------- |
| config.currentUrl |             |
| config.href       |             |
| config.afterDelay |             |
| config.onProgress |             |
| config.onDelay    |             |

- **entires.hookStart(function)**  
  _This function will be triggerd when XMLHttpRequest ended._  
  _If you set "config.afterDelay" parameter with "hookReady" function,this function will be delay._

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

    return config; // <= Required!!
});
```

- **entires.hookEnd()**  
  _This function will be triggerd when the dom overwrited._  
  _If you set "config.afterDelay" parameter with "hookStart" function,this function will be delay._

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

    return config; //<= Required!!
});
```

- **entires.hookResult()**  
  _This function will be triggerd when just before history.pushState/history.replaceState._  
  _If you set "config.afterDelay" parameter with "hookEnd" function. this function will be delay._

```bash
var entires = rikaaaPaging(["#header", "#article", "#footer"],document.querySelectorAll("a"));

entires.hookResult(function(config) {
    config.oldUrl;
    config.newUrl;
    config.updatedTarget;
    config.previousTarget;

    return config; //<= Required!!
});
```

## Browser Support

- Google Chrome
- Safari
- Firefox
- Edge
- IE 11

## License

Apache-2.0 © [rikaaa.org](http://rikaaa.org/)
