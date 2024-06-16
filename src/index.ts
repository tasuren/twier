const ORIGIN = "https://x.com";
const SETTING_PATH = "/settings";
const TWIER_ID = "twier-enabled";

let makeUrl = (path: string) => `${ORIGIN}${path}`;

/** mainタグが作成されるまで待機します。 */
function addListenerOnContainerCreated(
  target: (container: HTMLDivElement) => void
) {
  let mainObserver = new MutationObserver(() => {
    for (let element of document.getElementsByTagName("main")) {
      mainObserver.disconnect();
      target(element.parentElement as HTMLDivElement);
    }
  });
  mainObserver.observe(document.getElementsByTagName("html")[0], {
    subtree: true,
    childList: true,
  });
}

/*
function openTweetBox() {
  for (let element of document.getElementsByTagName("a"))
    if (element.getAttribute("data-testid") == "SideNav_NewTweet_Button") {
      console.debug("Open tweet box.");
      element.click();
      return true;
    }
  return false;
}
*/

function removeHomeLink() {
  for (let element of document.getElementsByTagName("a"))
    if (element.getAttribute("aria-label") == "X") {
      console.debug("Remove home link.");
      element.onclick = () => false;
      return true;
    }
  return false;
}

function removeNavigation() {
  for (let element of document.getElementsByTagName("nav"))
    if (element.getAttribute("role") == "navigation") {
      console.debug("Remove navigation");
      element.remove();
      return true;
    }
  return false;
}

/** 設定画面にサードパーティライセンスを表示するボタンを付ける。 */
function addThirdPartyLicensesButton(containerElement: HTMLDivElement) {
  if (!document.getElementById("twier-info"))
    for (let element of containerElement.getElementsByTagName("div"))
      if (element.role == "tablist") {
        let division = document.createElement("div");
        division.className = element.className;
        division.id = "twier-info";

        let anchor = document.createElement("a");
        anchor.href =
          "https://github.com/tasuren/twier/blob/main/README.md#acknowledgment";
        if (element.lastElementChild) {
          anchor.className = element.lastElementChild.className;
          anchor.setAttribute(
            "style",
            element.lastElementChild.getAttribute("style") as string
          );
        }
        anchor.innerText = "Twier Acknowledgements";

        division.appendChild(anchor);
        element.appendChild(division);

        break;
      }
}

/** ページ読み込み時にすべき一通りの改造を済ませます。 */
function setup(containerElement: HTMLDivElement) {
  // アプリ仕様に作り替える。
  removeHomeLink();
  removeNavigation();
  addThirdPartyLicensesButton(containerElement);
}

if (
  !location.pathname.includes("flow/login") &&
  !location.hostname.includes("github.com")
) {
  // ウェブページが変更される度に改ざんを実行する。
  window.addEventListener("load", () => {
    addListenerOnContainerCreated((element) => {
      // Macなら信号とロゴが被らないようにpaddingを配置する。
      setup(element);

      new MutationObserver(() => {
        setup(element);
      }).observe(element, { subtree: true, childList: true });
    });
  });

  // ここでページ遷移ループが起こるように見えるが、動的なページ遷移時はこのスクリプトは呼ばれないため大丈夫。
  if (location.search.search.toString().includes(TWIER_ID)) {
    location.href = makeUrl(`${SETTING_PATH}?${TWIER_ID}`);
  }
}
