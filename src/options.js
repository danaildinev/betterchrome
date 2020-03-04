var btnClose = document.getElementById('close'),
    ytBtnRemoveShelfs = document.getElementById('yt-removeshelfs'),
    ytBtnRemoveShelfForYou = document.getElementById('yt-removeshelf-foryou'),
    ytBtnRemoveShelfConsole = document.getElementById('yt-removeshelf-console'),
    ytBtnRemoveShelfSearchesRelated = document.getElementById('yt-removeshelf-searchesrelated'),
    ytBtnRemoveShelfRelated = document.getElementById('yt-removeshelf-related'),
    ytBtnRemoveShelfLatest = document.getElementById('yt-removeshelf-latest'),
    ytBtnRemoveShelfWatchAgain = document.getElementById('yt-removeshelf-watchagain');

//get settings
chrome.storage.sync.get(['ytRemoveShelfs', 'ytRemoveShelfForyou', 'ytRemoveShelfsConsole', 'ytRemoveShelfRelated', 'ytRemoveShelfSearchesRelated', 'ytRemoveShelfLatest', 'ytRemoveShelfWatchAgain'], function (result) {
    ytBtnRemoveShelfForYou.checked = result.ytRemoveShelfForyou;
    ytBtnRemoveShelfs.checked = result.ytRemoveShelfs;
    ytBtnRemoveShelfConsole.checked = result.ytRemoveShelfsConsole;
    ytBtnRemoveShelfRelated.checked = result.ytRemoveShelfRelated;
    ytBtnRemoveShelfSearchesRelated.checked = result.ytRemoveShelfSearchesRelated;
    ytBtnRemoveShelfLatest.checked = result.ytRemoveShelfLatest;
    ytBtnRemoveShelfWatchAgain.checked = result.ytRemoveShelfWatchAgain;
    toggleYoutubeShelfsChecks();
});

//toggles
ytBtnRemoveShelfs.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfs': ytBtnRemoveShelfs.checked });
    toggleYoutubeShelfsChecks();
});
ytBtnRemoveShelfForYou.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfForyou': ytBtnRemoveShelfForYou.checked });
});
ytBtnRemoveShelfConsole.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfsConsole': ytBtnRemoveShelfConsole.checked });
});
ytBtnRemoveShelfRelated.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfRelated': ytBtnRemoveShelfRelated.checked });
});
ytBtnRemoveShelfSearchesRelated.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfSearchesRelated': ytBtnRemoveShelfSearchesRelated.checked });
});
ytBtnRemoveShelfLatest.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfLatest': ytBtnRemoveShelfLatest.checked });
});
ytBtnRemoveShelfWatchAgain.addEventListener('click', function () {
    chrome.storage.sync.set({ 'ytRemoveShelfWatchAgain': ytBtnRemoveShelfWatchAgain.checked });
});

function toggleYoutubeShelfsChecks() {
    ytBtnRemoveShelfForYou.disabled = !ytBtnRemoveShelfs.checked;
    ytBtnRemoveShelfConsole.disabled = !ytBtnRemoveShelfs.checked;
    ytBtnRemoveShelfRelated.disabled = !ytBtnRemoveShelfs.checked;
    ytBtnRemoveShelfSearchesRelated.disabled = !ytBtnRemoveShelfs.checked;
    ytBtnRemoveShelfLatest.disabled = !ytBtnRemoveShelfs.checked;
    ytBtnRemoveShelfWatchAgain.disabled = !ytBtnRemoveShelfs.checked;
}

//other buttons
btnClose.addEventListener('click', function () {
    window.close();
});