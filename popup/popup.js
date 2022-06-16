// Rendering
function renderTextonly() {

}

function renderGrayscaleEmoji() {

}

function renderMediaSize() {

}

$(function() {

    var $textonlyInput = $('#textonly-input');
    var $grayscaleEmojiInput = $('#grayscale-emoji-input');
    var $mediaSizeInput = $('#media-size-input');

    $textonlyInput.prop('checked', textonly);
    $grayscaleEmojiInput.prop('checked', grayscaleEmoji);
    $mediaSizeInput.val(mediaSize);

    // Event listener
    $textonlyInput.on('change', function() {
        if (this.checked) {
            textonly = true;
        } else {
            textonly = false;
        }
        renderTextonly();
        chrome.storage.sync.set({ 'textonly': textonly }, function() {});
    });
    $grayscaleEmojiInput.on('change', function() {
        if (this.checked) {
            grayscaleEmoji = true;
        } else {
            grayscaleEmoji = false;
        }
        renderGrayscaleEmoji();
        chrome.storage.sync.set({ 'grayscaleEmoji': grayscaleEmoji }, function() {});
    });
    $mediaSizeInput.on('change', function() {
        mediaSize = $(this).val();
        renderMediaSize();
        chrome.storage.sync.set({ 'mediaSize': mediaSize }, function() {});
    });
});