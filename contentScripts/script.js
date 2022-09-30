const $body = $('body');

// Initialize
let setting = {};

chrome.storage.sync.get(['textonly', 'grayscaleEmoji', 'hideEmoji', 'mediaSize'], function(result) {
    setting.textonly = result.textonly != null ? result.textonly : true;
    setting.grayscaleEmoji = result.grayscaleEmoji != null ? result.grayscaleEmoji : true;
    setting.hideEmoji = result.hideEmoji != null ? result.hideEmoji : true;
    setting.mediaSize = result.mediaSize != null ? result.mediaSize : 100;
    renderAll(setting);
});

// Render
function renderTextonly(textonly) {
    if (textonly) {
        $body.addClass('tt-textonly');
    } else {
        $body.removeClass('tt-textonly');
    }
}

function renderGrayscaleEmoji(grayscaleEmoji) {
    if (grayscaleEmoji) {
        $body.addClass('tt-grayscale-emoji');
    } else {
        $body.removeClass('tt-grayscale-emoji');
    }
}

function renderHideEmoji(hideEmoji) {
    if (hideEmoji) {
        $body.addClass('tt-hide-emoji');
    } else {
        $body.removeClass('tt-hide-emoji');
    }
}

function renderMediaSize(mediaSize) {
    $body.removeClass('tt-media-size-100 tt-media-size-75 tt-media-size-50 tt-media-size-25 tt-media-size-0');
    $body.addClass('tt-media-size-' + mediaSize);
}

function renderAll(setting) {
    renderTextonly(setting.textonly);
    renderGrayscaleEmoji(setting.grayscaleEmoji);
    renderHideEmoji(setting.hideEmoji);
    renderMediaSize(setting.mediaSize);
}

// Listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let message = request.message;
    let setting = request.setting;
    switch (message) {
        case 'RENDER_ALL':
            renderAll(setting);
            break;
        case 'RENDER_TEXTONLY':
            renderTextonly(setting.textonly);
            break;
        case 'RENDER_GRAYSCALE_EMOJI':
            renderGrayscaleEmoji(setting.grayscaleEmoji);
            break;
        case 'RENDER_HIDE_EMOJI':
            renderHideEmoji(setting.hideEmoji);
            break;
        case 'RENDER_MEDIA_SIZE':
            renderMediaSize(setting.mediaSize);
            break;
    }
});