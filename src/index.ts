const ORIGIN = "https://x.com";
const SETTING_PATH = "/settings";
const TWIER_ID = "twier-enabled";

const makeUrl = (path: string) => `${ORIGIN}${path}`;

/** mainタグが作成されるまで待機します。 */
function addListenerOnContainerCreated(
	target: (container: HTMLDivElement) => void,
) {
	const mainObserver = new MutationObserver(() => {
		for (const element of document.getElementsByTagName("main")) {
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
	for (const element of document.getElementsByTagName("a"))
		if (element.getAttribute("aria-label") === "X") {
			console.debug("Remove home link.");
			element.onclick = () => false;
			return true;
		}
	return false;
}

function removeNavigation() {
	for (const element of document.getElementsByTagName("nav"))
		if (element.getAttribute("role") === "navigation") {
			console.debug("Remove navigation");
			element.remove();
			return true;
		}
	return false;
}

/** 設定画面にリポジトリへのリンクを表示するボタンを付ける。 */
const ACKNOWLEDGEMENTS =
	"https://github.com/tasuren/twier/blob/6fb16eecff20acbf1031d52252b49e42a005532d/README.md#acknowledgments";

function addThirdPartyLicensesButton(containerElement: HTMLDivElement) {
	if (!document.getElementById("twier-info"))
		for (const element of containerElement.getElementsByTagName("div"))
			if (element.role === "tablist") {
				const division = document.createElement("div");
				division.className = element.className;
				division.id = "twier-info";

				const anchor = document.createElement("a");
				anchor.href = ACKNOWLEDGEMENTS;
				if (element.lastElementChild) {
					anchor.className = element.lastElementChild.className;
					anchor.setAttribute(
						"style",
						element.lastElementChild.getAttribute("style") as string,
					);
				}
				anchor.innerText = "See twier repository";

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
