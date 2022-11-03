chrome.browserAction.onClicked.addListener(function (activeTab) {
  let extensionUrl = chrome.extension.getURL('index.html');

  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var url = tabs[i].url;

      if (url == extensionUrl) {
        chrome.tabs.update(tabs[i].id, {highlighted: true});
        return;
      }
    }
    chrome.tabs.create({ 'url': extensionUrl }, function (tab) {
    });
  });
});