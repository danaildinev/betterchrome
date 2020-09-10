

(function () {
    if (window.hasRun === true)
        return true;  // Will ultimately be passed back to executeScript
    window.hasRun = true;
    //console.log('yt injected');

    var debugConsole,
        btnToggle,
        btnToggleIcon,
        shelfsRemoved;

    const qClassHideShelf = "bh-hide",
        qShelfsWithTag = "ytd-search .bh-hide",
        qSearchBarSection = "ytd-search-sub-menu-renderer #filter-menu #container",
        consoleTag = "BetterChrome: ";

    //get some settings
    new Promise(function (resolve, reject) {
        var data = null;
        chrome.storage.sync.get(['ytRemoveShelfsConsole'], function (result) {
            data = result;
            resolve(data);
        });
    }).then(function (data) {
        debugConsole = data.ytRemoveShelfsConsole;
    });

    createToggleBtn();

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

    function removeChilds(query, target) {
        document.querySelectorAll(query).forEach(el => {
            el.childNodes.forEach(child => {
                if (child.innerText != undefined && child.innerText.startsWith(target)) {
                    el.classList.add(qClassHideShelf);
                    if (debugConsole) {
                        console.log(consoleTag + `Removed "${target}" shelfs`);
                    }
                }
            });
        });
    }

    function removeShelfs() {
        new Promise(function (resolve, reject) {
            var data = null;
            chrome.storage.sync.get(['ytRemoveShelfs', 'ytRemoveShelfForyou', 'ytRemoveShelfRelated', 'ytRemoveShelfSearchesRelated', 'ytRemoveShelfLatest', 'ytRemoveShelfWatchAgain', 'ytRemoveShelfPeopleSearch'], function (result) {
                data = result;
                resolve(data);
            });
        }).then(function (data) {
            if (data.ytRemoveShelfForyou) {
                removeChilds("ytd-shelf-renderer", "For you")
            }
            if (data.ytRemoveShelfRelated) {
                removeChilds("ytd-shelf-renderer", "Related to your search")
            }
            if (data.ytRemoveShelfLatest) {
                removeChilds("ytd-shelf-renderer", "Latest from")
            }
            if (data.ytRemoveShelfWatchAgain) {
                removeChilds("ytd-shelf-renderer", "Watch again")
            }
            if (data.ytRemoveShelfSearchesRelated) {
                removeChilds("ytd-horizontal-card-list-renderer", "Searches related to ")
            }
            if (data.ytRemoveShelfPeopleSearch) {
                removeChilds("ytd-horizontal-card-list-renderer", "People also search for")
            }
        });
        shelfsRemoved = true;
    }

    function recoverShelfs() {
        document.querySelectorAll(qShelfsWithTag).forEach(el => {
            el.classList.remove(qClassHideShelf);
        });
        shelfsRemoved = false;
        if (debugConsole) {
            console.log(consoleTag + "Recovered YouTube shelfs");
        }
    }

    function createToggleBtn() {
        const namespace = "http://www.w3.org/2000/svg",
            svg = document.createElementNS(namespace, "svg"),
            icon = document.createElementNS(namespace, "path");

        btnToggle = document.createElement("div")
        btnToggleIcon = document.createElement("div");
        btnToggleText = document.createElement("p");

        btnToggle.className = "bh-yt-btn";
        btnToggle.title = "Toggle unneded shelfs and show only results based on search string.";
        btnToggleIcon.className = "style-scope ytd-toggle-button-renderer bh-yt-icon";
        btnToggleText.innerText = "Toggle shelfs";

        svg.setAttribute("viewbox", "0 0 24 2");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("class", "style-scope yt-icon");
        svg.setAttribute("style", "pointer-events: none; display: block; width: 100%; height: 100%;");
        icon.setAttribute("d", "M3.75 18.75h3v-9h-3v9zm16.5-8.25c0-.83-.68-1.5-1.5-1.5h-4.73l.7-3.43.03-.24c0-.3-.13-.6-.33-.8l-.8-.78L8.7 8.7c-.3.26-.45.64-.45 1.05v7.5c0 .82.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.9l2.27-5.3c.06-.18.1-.36.1-.55v-1.5z");
        icon.setAttribute("class", "style-scope yt-icon");
        svg.appendChild(icon);

        btnToggleIcon.appendChild(svg);
        btnToggle.appendChild(btnToggleIcon);
        btnToggle.appendChild(btnToggleText);

        document.querySelector(qSearchBarSection).appendChild(btnToggle);
        btnToggle.addEventListener("click", () => {
            if (shelfsRemoved)
                recoverShelfs();
            else
                removeShelfs();
        })
    }
})();