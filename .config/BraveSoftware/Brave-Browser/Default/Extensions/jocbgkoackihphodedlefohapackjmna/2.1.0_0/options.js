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

const saveData = (key, val) => {
	localStore.get('choices')
		.then((res = {}) => {
			const { choices } = res;
			choices[key] = val;
			localStore.set({ choices })
		});
}

const setVal = (key, val, saveToo = true) => {
	switch (key) {
		case 'background': {
			if(saveToo) saveData('background', val);
			document.getElementById('backgroundLabel').textContent = val;
			if(!saveToo) document.getElementById('background').value = val;
			break;
		}
		case 'popup': {
			if(saveToo) saveData('popup', val)
			document.getElementById('popupLabel').textContent = val;
			if(!saveToo) document.getElementById('popup').value = val;
			break;
		}
		case 'popupOpacity': {
			if(saveToo) saveData('popupOpacity', val);
			document.getElementById('popupOpacityLabel').textContent = val;
			if(!saveToo) document.getElementById('popupOpacity').value = val;
			break;
		}
		case 'backgroundOpacity': {
			if(saveToo) saveData('backgroundOpacity', val);
			document.getElementById('backgroundOpacityLabel').textContent = val;
			if(!saveToo) document.getElementById('backgroundOpacity').value = val;
			break;
		}
	}
}

localStore.get('choices')
	.then((res = {}) => {
		const { choices = {} } = res;
		setVal('background', choices.background, false);
		setVal('popup', choices.popup, false);
		setVal('popupOpacity', choices.popupOpacity, false);
		setVal('backgroundOpacity', choices.backgroundOpacity, false);
	});

document.getElementById('optionTable').addEventListener('change', e => {
	const ele = e.target;
	setVal(ele.getAttribute('id'), ele.value);
})
