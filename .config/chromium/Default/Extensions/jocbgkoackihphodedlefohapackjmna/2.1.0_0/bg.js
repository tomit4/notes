const isFirefox = typeof browser != 'undefined' ? true : false;
const localStore = {
  get: key => {
    if (isFirefox) {
      return browser.storage.local.get();
    } else {
      return new Promise(resolve => chrome.storage.local.get([key], resolve))
    }
  },
  set: obj => {
    if (isFirefox) {
      return browser.storage.local.set(obj);
    } else {
      return new Promise(resolve => chrome.storage.local.set(obj, resolve))
    }
  }
}

localStore.get('choices')
.then((res = {}) => {
  const {choices = {}} = res;
  choices.background = choices.background || '#000000';
  choices.popup = choices.popup || '#ffff00';
  choices.popupOpacity = choices.popupOpacity || '0.3';
  choices.backgroundOpacity = choices.backgroundOpacity || '0.4';
  localStore.set({choices});
});

const execCs = tabId => {
  localStore.get('choices')
  .then((res = {}) => {
    const {choices} = res;
    chrome.tabs.executeScript(tabId, {code: `measureitChoices = '${JSON.stringify(choices)}';`});
    chrome.tabs.executeScript(tabId, {file: 'cs.js'});
  });
}

chrome.browserAction.onClicked.addListener(tab => {
  execCs(tab.Id);
});

chrome.commands.onCommand.addListener(command => {
  if(command === 'open-measure-it') {
    try{
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }).then(tab => {
        const { id } = tab[0];
        execCs(id);
      })
    } catch(e){}
  }
});
