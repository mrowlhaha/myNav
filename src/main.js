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

const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const webSite = localStorage.getItem("webSite");
const webSiteObject = JSON.parse(webSite);
const hashMap = webSiteObject || [
  { url: "https://www.acfun.cn" },
  { url: "https://www.bilibili.com" },
  { url: "https://www.cctv.com/" },
  { url: "http://www.dilidili8.com/" },
  { url: "https://theporndude.com/zh/338/e-hentai" },
  { url: "https://github.com/" },
  { url: "https://pixivic.com/?VNK=ab10d77e" },
];

const findIcon = (url) => {
  // console.log("https://i.olsh.me/icon?url=github.com&size=32..32..200");

  return "https://www.google.com/s2/favicons?domain=" + url + "";
  // return "https://i.olsh.me/icon?url=" + url + "&size=32..32..20";
};

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(".cn", "")
    .replace(".com", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
          <li>            
            <div class="site">
              <div class="logo">
                <img src=" ${findIcon(node.url)}" alt=""> 
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
            </div>           
          </li>
      `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入你要添加的网址");
  if (url.indexOf("http" !== 0)) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url,
  });
  render();
});

$(".site").on("touchstart", (e) => {
  // startTime = new Date();
  //设置一个长按计时器
  timer = setTimeout(function () {
    // console.log($(this));
    // // $(this).find(".close").style.display = "block";
    // $(e.currentTarget).find(".close").css("display", "block");
    let answer = window.confirm("删除这个网址?");
    console.log(answer);
    if (answer) {
      $(e.currentTarget).find(".close").click();
      clearTimeout(timer);
    } else {
      window.location.reload();
    }
  }, 700);
});

// $(".site").on("touchend", (e) => {
//   endTime = new Date();

//   clearTimeout(timer);

//   if (endTime - startTime < 700) {
//     // 处理点击事件

//     label.classList.add("selected");
//   }
// });

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("webSite", string);
};
