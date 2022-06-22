$(function() {
    // Initialize
    let setting = {};
    const $textonlyInput = $('#textonly-input');
    const $grayscaleEmojiInput = $('#grayscale-emoji-input');
    const $mediaSizeSelect = $('#media-size-select');
    const $whitebox = $(".whitebox");

    chrome.storage.sync.get(['textonly', 'grayscaleEmoji', 'mediaSize'], function(result) {
        setting.textonly = result.textonly != null ? result.textonly : true;
        setting.grayscaleEmoji = result.grayscaleEmoji != null ? result.grayscaleEmoji : true;
        setting.mediaSize = result.mediaSize != null ? result.mediaSize : 100;

        setting.textonly ? $whitebox.hide() : $whitebox.show();
        $textonlyInput.prop('checked', setting.textonly);
        $grayscaleEmojiInput.prop('checked', setting.grayscaleEmoji);
        $mediaSizeSelect.val(setting.mediaSize);
    });

    // Setting change listener
    $textonlyInput.on('change', function() {
        setting.textonly = this.checked ? true : false;
        setting.textonly ? $whitebox.hide() : $whitebox.show();
        chrome.storage.sync.set({ textonly: setting.textonly });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'RENDER_TEXTONLY', setting: setting });
        });
    });
    $grayscaleEmojiInput.on('change', function() {
        setting.grayscaleEmoji = this.checked ? true : false;
        chrome.storage.sync.set({ grayscaleEmoji: setting.grayscaleEmoji });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'RENDER_GRAYSCALE_EMOJI', setting: setting });
        });
    });
    $mediaSizeSelect.on('change', function() {
        setting.mediaSize = $(this).val();
        chrome.storage.sync.set({ mediaSize: setting.mediaSize });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'RENDER_MEDIA_SIZE', setting: setting });
        });
    });
});