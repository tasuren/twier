var intervalId: number | null = null;
var isSet = false;
intervalId = setInterval(() => {
  if (isSet && intervalId != null) clearInterval(intervalId)
  else
    for (let element of document.getElementsByTagName("div"))
      if (element.getAttribute("data-testid") == "app-bar-close"
          || element.getAttribute("data-testid") == "app-bar-back") {
        element.style.display = "none";
        isSet = true;
        break;
      };
}, 100);