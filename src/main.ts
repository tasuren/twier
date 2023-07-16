const ORIGIN = "https://twitter.com";
const SETTING_PATH = "/settings";
let makeUrl = (path: string) => `${ORIGIN}${path}`;


/** mainタグが作成されるまで待機します。 */
function addListenerOnContainerCreated(
  target: (container: HTMLDivElement) => void
) {
  let mainObserver = new MutationObserver(() => {
    for (let element of document.getElementsByTagName("main")) {
      mainObserver.disconnect();
      target(element.parentElement as HTMLDivElement);
    };
  });
  mainObserver.observe(
    document.getElementsByTagName("html")[0],
    {subtree: true, childList: true}
  );
};


function openTweetBox() {
  for (let element of document.getElementsByTagName("a"))
    if (element.getAttribute("data-testid") == "SideNav_NewTweet_Button") {
      console.debug("Open tweet box.");
      element.click();
      return true;
    };
  return false;
};

function removeHomeLink() {
  for (let element of document.getElementsByTagName("a"))
    if (element.getAttribute("aria-label") == "Twitter") {
      console.debug("Remove home link.")
      element.remove();
      return true;
    };
  return false;
};

function removeNavigation() {
  for (let element of document.getElementsByTagName("nav"))
    if (element.getAttribute("role") == "navigation") {
      console.debug("Remove navigation");
      element.remove();
      return true;
    };
  return false;
};


/** ページ読み込み時にすべき一通りの改造を済ませます。 */
function setup() {
  removeHomeLink(); removeNavigation();
};


if (!location.pathname.includes("flow/login")) {
  // 初回起動時はツイート画面を表示させる。
  window.addEventListener("load", () => {
    addListenerOnContainerCreated((element) => {
      setup();
      new MutationObserver(() => {
        setup();
      }).observe(element, {subtree: true, childList: true});
    });
  });

  // ここでページ遷移ループが起こるように見えるが、動的なページ遷移時はこのスクリプトは呼ばれないため大丈夫。
  if (location.pathname != SETTING_PATH)
    location.href = makeUrl(SETTING_PATH);
};