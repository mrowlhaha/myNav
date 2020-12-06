// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
$(".searchForm").focus(function () {
  document.onkeydown = function (event) {
    if (event && event.keyCode == 13) {
      $("input[type=submit]").click();
    }
  };
});
$(".searchButton").click(function () {
  $(".searchForm").submit();
});
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var webSite = localStorage.getItem("webSite");
var webSiteObject = JSON.parse(webSite);
var hashMap = webSiteObject || [{
  url: "https://www.acfun.cn"
}, {
  url: "https://www.bilibili.com"
}, {
  url: "https://www.cctv.com/"
}, {
  url: "http://www.dilidili8.com/"
}, {
  url: "https://theporndude.com/zh/338/e-hentai"
}, {
  url: "https://github.com/"
}, {
  url: "https://pixivic.com/?VNK=ab10d77e"
}];

var findIcon = function findIcon(url) {
  // console.log("https://i.olsh.me/icon?url=github.com&size=32..32..200");
  return "https://www.google.com/s2/favicons?domain=" + url + ""; // return "https://i.olsh.me/icon?url=" + url + "&size=32..32..20";
};

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(".cn", "").replace(".com", "").replace(/\/.*/, "");
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n          <li>            \n            <div class=\"site\">\n              <div class=\"logo\">\n                <img src=\" ".concat(findIcon(node.url), "\" alt=\"\"> \n              </div>\n              <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n              <div class=\"close\">\n                <svg class=\"icon\">\n                  <use xlink:href=\"#icon-delete\"></use>\n                </svg>\n            </div>\n            </div>           \n          </li>\n      ")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入你要添加的网址");

  if (url.indexOf("http" !== 0)) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url
  });
  render();
});
$(".site").on("touchstart", function (e) {
  // startTime = new Date();
  //设置一个长按计时器
  timer = setTimeout(function () {
    // console.log($(this));
    // // $(this).find(".close").style.display = "block";
    // $(e.currentTarget).find(".close").css("display", "block");
    var answer = window.confirm("删除这个网址?");
    console.log(answer);

    if (answer) {
      $(e.currentTarget).find(".close").click();
      clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, 700);
}); // $(".site").on("touchend", (e) => {
//   endTime = new Date();
//   clearTimeout(timer);
//   if (endTime - startTime < 700) {
//     // 处理点击事件
//     label.classList.add("selected");
//   }
// });

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("webSite", string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.55bd3ed8.js.map