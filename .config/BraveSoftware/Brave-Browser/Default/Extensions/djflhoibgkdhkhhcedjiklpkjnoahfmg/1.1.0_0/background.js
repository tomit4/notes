// TODO: remove this, just for debugging.
chrome.storage.onChanged.addListener(function(changes, namespace) {
  updateCache(function() {});
	for (key in changes) {
	  var storageChange = changes[key];
	  console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue);
	}
});

// Main control flow.  Directs requests from options page/user script.
// Generally just handles requests that come in from the user action icon.
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "blacklist") {
      // The request is asking for the User-agent.
      getSpoofValues(sender.tab.url, function(values) {
      	sendResponse(values);
      });
    } else if (request.action == "add_ua") {
      // Add a new user-agent string to the options list.
      addCustomUAOption(request.name,
                        request.user_agent,
                        request.append_to_default_ua,
                        request.indicator);
      sendResponse({result:"success"});
    } else if (request.action == "options") {
      // Get all of the known user-agent options.
      _getUserAgentList(function(user_agent_list) {
        sendResponse({options: JSON.stringify(user_agent_list)});
      });
    } else if (request.action == "update") {
      // Refreshes the listeners when some settings update has happened.
      updateListeners();
      sendResponse({});
    } else if (request.action == "clear_presets") {
      clearPresets();
    } else if (request.action == "badge") {
      // Refresh the user action badge.
      updateBadge(sender.tab);
    } else {
      console.log("Got an invalid request:" + request.action);
      sendResponse({}); // Not a valid request.
    }
    return false;
  });

// Add listener to migrate any legacy settings.
// Will also auto-populate a couple of example user-agent strings if none exist.
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "update" && _isUsingLocalStorage()) {
    console.log("On install: Attempting to migrate legacy items");
    _moveLocalStorageToSyncStorage();
  }
  
  _getUserAgentPointerList(function(pointer_list) {
    if (!pointer_list || pointer_list.length == 0) {
      console.log("Didn't find any existing UAs.  Attempting to populate some.");
      getBaseOptionsList(true);
    }
  });
});


// Given a UserAgent object, will replace the "User-Agent" header in the
// map provided as requestHeaders.
function replaceHeader(user_agent, requestHeaders) {
  if (!user_agent || !user_agent.ua_string)
    return requestHeaders;
  var newHeaders = [];
  for (var i = 0; i < requestHeaders.length; i++) {
    if (requestHeaders[i].name != "User-Agent") {
      newHeaders.push(requestHeaders[i]);
    } else {
      var new_value = requestHeaders[i].value;
      if (user_agent.ua_string != "")
        new_value = (user_agent.append_to_default_ua ? new_value + " " + user_agent.ua_string : user_agent.ua_string);
      newHeaders.push({"name"  : "User-Agent",
                       "value" : new_value});
    }
  }
  return newHeaders;
}

// Adds listeners that handle modifying headers on any request that comes through.
// Really only needs to be called once.
// The Listener can *not* be a callback.  It *must* be blocking.
function updateListeners() {
  if (!listener) {
    listener = function(details) {
      // We only want to modify requests that have a URL, and that have headers.
      // Any others are not interesting enough to have their headers modified.
      var header_map = { requestHeaders : details.requestHeaders };
      if (details && details.url && details.requestHeaders && details.requestHeaders.length > 0) {
        header_map = {requestHeaders : replaceHeader(getCacheSpoofValues(details.url, details.tabId), details.requestHeaders)};
      }
      return header_map;
    };
  }
  chrome.webRequest.onBeforeSendHeaders.addListener(listener,
    {"urls": ["http://*/*", "https://*/*"]},
    ["requestHeaders", "blocking"]);
}

var listener = null;
updateListeners();
_reportErrors();

// Method to make the badge update as the user changes tabs.
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    updateBadge(tab);
  });
});

// Method to make the badge update as the user changes tabs.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateBadge(tab);
});
