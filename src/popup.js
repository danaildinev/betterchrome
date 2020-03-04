document.getElementById("options").addEventListener('click', function () {
    chrome.tabs.create({ 'url': "/options.html" })
});

document.getElementById("btnRecoverYoutubeShelfs").addEventListener('click', function () {
    callActionToCurrentTab("recoverYoutubeShelfs");
});

document.getElementById("btnRemoveYoutubeShelfs").addEventListener('click', function () {
    callActionToCurrentTab("removeYoutubeShelfs");
});

chrome.storage.sync.get('ytRemoveShelfs', function (data) {
    var result = data.ytRemoveShelfs;
    document.getElementById("youtube-status").classList.add(result ? "text-success" : "text-muted");
    document.getElementById("youtube-status-icon").classList.add(result ? "fa-check" : "fa-times");
    if (!result) {
        document.getElementById("youtube-actions").classList.add("d-none");
    }
});

function callActionToCurrentTab(actionName) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: actionName });
    });
}