const componentYoutube = {
    js: "youtube",
    css: "shared/betterchrome.css",
    allowedUrls: [
        "https://www.youtube.com/results"
    ]
}

chrome.tabs.onActiveChanged.addListener(function (tabId, changeInfo, tab) {
    loadComponent(componentYoutube, tabId);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        loadComponent(componentYoutube, tabId);
    }
});

function loadComponent(component, tabId) {
    chrome.tabs.get(tabId, function (tab) {
        if (checkAllowedUrls(tab, component.allowedUrls)) {
            chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                if (changeInfo.status == 'complete' && tab.active) {
                    chrome.tabs.executeScript(tabId, {
                        file: `components/${component.js}.js`, runAt: "document_idle"
                    }/*, function (results) {
                        if (results[0] !== true) {
                            console.log(`BetterChrome: ${component.js} script injected!`)
                        }
                    }*/);
                    chrome.tabs.insertCSS(tabId, {
                        file: `components/${component.css}`, runAt: "document_idle"
                    });
                }
            })
        }
    });
}

function checkAllowedUrls(targetTab, allowedUrls) {
    if (allowedUrls.length > 1) {
        for (var i = 0; i < allowedUrls.length; i++) {
            if (targetTab.url.startsWith(allowedUrls[i])) {
                return true;
            }
        }
    } else {
        if (targetTab.url.startsWith(allowedUrls)) {
            return true;
        }
    }
}