$(function () {
  // Initialize
  let setting = {};
  const $textonlyInput = $('#textonly-input');
  const $grayscaleEmojiInput = $('#grayscale-emoji-input');
  const $hideEmojiInput = $('#hide-emoji-input');
  const $mediaSizeSelect = $('#media-size-select');
  const $whitebox = $(".whitebox");

  chrome.storage.sync.get(['textonly', 'grayscaleEmoji', 'hideEmoji', 'mediaSize'], function (result) {
    setting.textonly = result.textonly != null ? result.textonly : true;
    setting.grayscaleEmoji = result.grayscaleEmoji != null ? result.grayscaleEmoji : true;
    setting.hideEmoji = result.hideEmoji != null ? result.hideEmoji : true;
    setting.mediaSize = result.mediaSize != null ? result.mediaSize : 100;

    setting.textonly ? $whitebox.hide() : $whitebox.show();
    $textonlyInput.prop('checked', setting.textonly);
    $grayscaleEmojiInput.prop('checked', setting.grayscaleEmoji);
    $hideEmojiInput.prop('checked', setting.hideEmoji);
    $mediaSizeSelect.val(setting.mediaSize);
  });

  // Setting change listener
  $textonlyInput.on('change', function () {
    setting.textonly = this.checked ? true : false;
    setting.textonly ? $whitebox.hide() : $whitebox.show();
    chrome.storage.sync.set({ textonly: setting.textonly });
  });
  $grayscaleEmojiInput.on('change', function () {
    setting.grayscaleEmoji = this.checked ? true : false;
    chrome.storage.sync.set({ grayscaleEmoji: setting.grayscaleEmoji });
  });
  $hideEmojiInput.on('change', function () {
    setting.hideEmoji = this.checked ? true : false;
    chrome.storage.sync.set({ hideEmoji: setting.hideEmoji });
  });
  $mediaSizeSelect.on('change', function () {
    setting.mediaSize = $(this).val();
    chrome.storage.sync.set({ mediaSize: setting.mediaSize });
  });
});