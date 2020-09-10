(function () {
    if (window.hasRun === true)
        return true;  // Will ultimately be passed back to executeScript
    window.hasRun = true;
    //console.log('yt injected');

    var removeShelfsForYou,
        removeShelfsRelated,
        removeShelfsSearchesRelated,
        removeShelfsSearchesLatest,
        removeShelfsWatchAgain,
        removeShelfsPeopleSearch,
        debugConsole,
        qClassHideShelf = "bh-hide",
        qShelfsWithTag = "ytd-search .bh-hide",
        qYtProgressbar = "yt-page-navigation-progress",
        qYtTag = "ytd-app",
        qYtProgressbarAttr = "aria-valuenow",
        consoleTag = "BetterChrome: ";

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.action) {
                case "recoverYoutubeShelfs":
                    recoverShelfs();
                    break;
                case "removeYoutubeShelfs":
                    removeShelfs();
                    break;
            }
        });

    //get some settings
    var p = new Promise(function (resolve, reject) {
        var data = null;
        chrome.storage.sync.get(['ytRemoveShelfs', 'ytRemoveShelfForyou', 'ytRemoveShelfsConsole', 'ytRemoveShelfRelated', 'ytRemoveShelfSearchesRelated', 'ytRemoveShelfLatest', 'ytRemoveShelfWatchAgain', 'ytRemoveShelfPeopleSearch'], function (result) {
            data = result;
            resolve(data);
        });
    }).then(function (data) {
        removeShelfsForYou = data.ytRemoveShelfForyou;
        removeShelfsRelated = data.ytRemoveShelfRelated;
        removeShelfsSearchesRelated = data.ytRemoveShelfSearchesRelated;
        removeShelfsSearchesLatest = data.ytRemoveShelfLatest;
        removeShelfsWatchAgain = data.ytRemoveShelfWatchAgain;
        removeShelfsPeopleSearch = data.ytRemoveShelfPeopleSearch;
        debugConsole = data.ytRemoveShelfsConsole;
        if (data.ytRemoveShelfs) {
            removeShelfs();
        }
    });

    function getElements(selector) {
        var shelfs = document.querySelectorAll(selector);
        if (shelfs.length > 0) {
            return shelfs;
        }
    }

    function removeChilds(query, startsWithText, successConsoleText) {
        var elements = getElements(query);
        if (elements != undefined) {
            elements.forEach(element => {
                element.childNodes.forEach(child => {
                    if (child.innerText != undefined && child.innerText.startsWith(startsWithText)) {
                        //element.remove();
                        element.classList.add(qClassHideShelf);
                        if (debugConsole) {
                            console.log(consoleTag + successConsoleText);
                        }
                    }
                });

            });
        }
    }

    function removeShelfs() {
        if (removeShelfsForYou) {
            removeChilds("ytd-shelf-renderer", "For you", "Removed 'For you' shelfs")
        }
        if (removeShelfsRelated) {
            removeChilds("ytd-shelf-renderer", "Related to your search", "Removed 'Related to your search' shelfs")
        }
        if (removeShelfsSearchesLatest) {
            removeChilds("ytd-shelf-renderer", "Latest from", "Removed 'Latest from...' shelfs")
        }
        if (removeShelfsWatchAgain) {
            removeChilds("ytd-shelf-renderer", "Watch again", "Removed 'Watch again' shelfs")
        }
        if (removeShelfsSearchesRelated) {
            removeChilds("ytd-horizontal-card-list-renderer", "Searches related to ", "Removed 'Searches related to...' shelfs")
        }
        if (removeShelfsPeopleSearch) {
            removeChilds("ytd-horizontal-card-list-renderer", "People also search for", "Removed 'People also search for...' shelfs")
        }
    }

    function recoverShelfs() {
        var shelfs = document.querySelectorAll(qShelfsWithTag);
        shelfs.forEach(element => {
            element.classList.remove(qClassHideShelf);
        });
        console.log(consoleTag + "Recovered YouTube shelfs")
    }

    //listen for page change (not the most efficent way but it works... for now...)
    /*var progressBar = document.querySelector(qYtProgressbar);
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.target.nodeName == qYtProgressbar) {
                progressBar = mutation.target;
                observer.disconnect();
                const observerReload = new MutationObserver(callbackReload);
                observerReload.observe(progressBar, config);
                break;
            }
        }
    };
    const callbackReload = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.target.getAttribute(qYtProgressbarAttr) == 100) {
                removeShelfs();
            }
        }
    };
    const observer = new MutationObserver(callback);
    var content = document.querySelector(qYtTag);
    console.log(content)
    observer.observe(content, config);
    window.addEventListener("beforeunload", function () {
        observer.disconnect();
        observerReload.disconnect();
    });*/
})();