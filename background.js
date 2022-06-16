// Initializing
let textonly = true;
let grayscaleEmoji = false;
let mediaSize = 100;

chrome.storage.sync.get(['textonly'], function(result) {
    if (result.key != null) {
        textonly = result.key;
    }
});
chrome.storage.sync.get(['grayscaleEmoji'], function(result) {
    if (result.key != null) {
        grayscaleEmoji = result.key;
    }
});
chrome.storage.sync.get(['mediaSize'], function(result) {
    if (result.key != null) {
        mediaSize = result.key;
    }
});