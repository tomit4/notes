/**
 * State Manager
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2017-03-10
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * State Manager
 */

var stateManager = {};

/**
 * Public Methods
 */

stateManager.registerInjection = function (tabIdentifier, injection) {

    let injectionIdentifier, registeredTab, injectionCount;

    injectionIdentifier = injection.source + injection.path + injection.version;
    registeredTab = stateManager.tabs[tabIdentifier];

    registeredTab.injections[injectionIdentifier] = injection;
    injectionCount = Object.keys(registeredTab.injections).length || 0;

    if (injectionCount > 0) {

        helpers.updateBrowserActionTitle({
            'tabId': tabIdentifier,
            'title': `Decentraleyes (${injectionCount})`
        });

        if (stateManager.showIconBadge === true) {

            wrappers.browserAction.setBadgeText({
                'tabId': tabIdentifier,
                'text': injectionCount.toString()
            });
        }
    }

    if (isNaN(interceptor.amountInjected)) {

        helpers.getStoredSettings(Setting.AMOUNT_INJECTED, function (items) {

            interceptor.amountInjected = items.amountInjected;

            chrome.storage.local.set({
                [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
            });
        });

    } else {

        chrome.storage.local.set({
            [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
        });
    }
};

stateManager.setEnvironment = function (environment) {

    if (environment === Environment.STABLE) {

        // Strike a balance between coverage and website stability.
        files.active = files.stable;

    } else if (environment === Environment.STAGING) {

        // Improve coverage at the expense of website stability.
        files.active = Object.assign({}, files.stable, files.staging);
    }
};

stateManager.updateEnvironment = function (preferredEnvironment) {

    return new Promise((resolve) => {

        if (preferredEnvironment === Environment.STABLE) {

            let requiredItems = [Setting.BLOCK_MISSING, Setting.ENFORCE_STAGING];

            helpers.getStoredSettings(requiredItems, function (items) {

                if (items.blockMissing === true || items.enforceStaging === true) {
                    stateManager.setEnvironment(Environment.STAGING);
                } else {
                    stateManager.setEnvironment(Environment.STABLE);
                }

                resolve();
            });

        } else if (preferredEnvironment === Environment.STAGING) {

            stateManager.setEnvironment(Environment.STAGING);
            resolve();
        }
    });
};

stateManager.addDomainToWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        whitelistedDomains[domain] = true;

        chrome.storage.local.set({whitelistedDomains}, resolve);
    });
};

stateManager.removeDomainFromWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        delete whitelistedDomains[domain];

        chrome.storage.local.set({whitelistedDomains}, resolve);
    });
};

/**
 * Private Methods
 */

stateManager._createTab = function (tab) {

    let tabIdentifier = tab.id;

    stateManager.tabs[tabIdentifier] = {
        'injections': {}
    };
};

stateManager._removeTab = function (tabIdentifier) {
    delete stateManager.tabs[tabIdentifier];
};

stateManager._updateTab = function (details) {

    let tabDomain, domainIsWhitelisted, frameIdentifier, tabIdentifier;

    tabDomain = helpers.extractDomainFromUrl(details.url, true);
    domainIsWhitelisted = stateManager._domainIsWhitelisted(tabDomain);

    frameIdentifier = details.frameId;
    tabIdentifier = details.tabId;

    if (frameIdentifier !== 0 || tabIdentifier === -1) {
        return;
    }

    helpers.updateBrowserActionTitle({
        'tabId': tabIdentifier,
        'title': 'Decentraleyes (0)'
    });

    if (domainIsWhitelisted) {

        stateManager._setIconDisabled(tabIdentifier);

        helpers.updateBrowserActionTitle({
            'tabId': tabIdentifier,
            'title': 'Decentraleyes (–)'
        });

    } else {
        stateManager._setIconDefault(tabIdentifier);
    }

    if (stateManager.showIconBadge === true) {
        stateManager._clearBadgeText(tabIdentifier);
    }

    if (stateManager.tabs[tabIdentifier]) {
        stateManager.tabs[tabIdentifier].injections = {};
    }
};

stateManager._handleStorageChanged = function (changes) {

    if (Setting.BLOCK_MISSING in changes) {

        if (changes.blockMissing.newValue === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }
    }

    if (Setting.ENFORCE_STAGING in changes) {

        if (changes.enforceStaging.newValue === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }
    }

    if (Setting.SHOW_ICON_BADGE in changes) {

        stateManager.showIconBadge = changes.showIconBadge.newValue;

        if (changes.showIconBadge.newValue !== true) {

            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(stateManager._removeIconBadgeFromTab);
            });
        }
    }

    if (Setting.STRIP_METADATA in changes) {

        requestSanitizer.disable();

        if (changes.stripMetadata.newValue !== false) {
            requestSanitizer.enable();
        }
    }
};

stateManager._clearBadgeText = function (tabIdentifier) {

    wrappers.browserAction.setBadgeText({
        'tabId': tabIdentifier,
        'text': ''
    });
};

stateManager._removeIconBadgeFromTab = function (tab) {
    stateManager._clearBadgeText(tab.id);
};

stateManager._domainIsWhitelisted = function (domain) {

    if (domain !== null) {

        let whitelistRecord, isWhitelisted;

        whitelistRecord = requestAnalyzer.whitelistedDomains[domain];
        isWhitelisted = Boolean(whitelistRecord);

        return isWhitelisted;
    }

    return false;
};

stateManager._setIconDefault = function (tabIdentifier) {

    wrappers.browserAction.setIcon({
        'path': stateManager.defaultIconPath,
        'tabId': tabIdentifier
    });
};

stateManager._setIconDisabled = function (tabIdentifier) {

    wrappers.browserAction.setIcon({
        'path': stateManager.disabledIconPath,
        'tabId': tabIdentifier
    });
};

/**
 * Initializations
 */

stateManager.requests = {};
stateManager.tabs = {};

stateManager.defaultIconPath = {
    '16': chrome.runtime.getURL('icons/action/icon16-default.png'),
    '18': chrome.runtime.getURL('icons/action/icon18-default.png'),
    '19': chrome.runtime.getURL('icons/action/icon19-default.png'),
    '32': chrome.runtime.getURL('icons/action/icon32-default.png'),
    '36': chrome.runtime.getURL('icons/action/icon36-default.png'),
    '38': chrome.runtime.getURL('icons/action/icon38-default.png'),
    '64': chrome.runtime.getURL('icons/action/icon64-default.png')
};

stateManager.disabledIconPath = {
    '16': chrome.runtime.getURL('icons/action/icon16-disabled.png'),
    '18': chrome.runtime.getURL('icons/action/icon18-disabled.png'),
    '19': chrome.runtime.getURL('icons/action/icon19-disabled.png'),
    '32': chrome.runtime.getURL('icons/action/icon32-disabled.png'),
    '36': chrome.runtime.getURL('icons/action/icon36-disabled.png'),
    '38': chrome.runtime.getURL('icons/action/icon38-disabled.png'),
    '64': chrome.runtime.getURL('icons/action/icon64-disabled.png')
};

stateManager.validHosts = [];

for (let mapping in mappings) {

    let supportedHost = Address.ANY_PROTOCOL + mapping + Address.ANY_PATH;
    stateManager.validHosts.push(supportedHost);
}

stateManager.requestFilters = {
    'urls': stateManager.validHosts
};

chrome.webRequest.onBeforeRequest.addListener(function (requestDetails) {

    let tab = stateManager.tabs[requestDetails.tabId].details || {};
    return interceptor.handleRequest(requestDetails, requestDetails.tabId, tab);

}, stateManager.requestFilters, [WebRequest.BLOCKING]);

chrome.tabs.query({}, function (tabs) {
    tabs.forEach(stateManager._createTab);
});

helpers.getStoredSettings(Setting.SHOW_ICON_BADGE, function (items) {

    if (items.showIconBadge === undefined) {
        items.showIconBadge = true;
    }

    stateManager.showIconBadge = items.showIconBadge;
});

/**
 * Event Handlers
 */

chrome.tabs.onCreated.addListener(stateManager._createTab);
chrome.tabs.onRemoved.addListener(stateManager._removeTab);

chrome.webRequest.onBeforeRequest.addListener(function (requestDetails) {

    if (requestDetails.tabId !== -1 && stateManager.tabs[requestDetails.tabId]) {

        stateManager.tabs[requestDetails.tabId].details = {
            'url': requestDetails.url
        };
    }

}, {'types': [WebRequestType.MAIN_FRAME], 'urls': [Address.ANY]});

chrome.webNavigation.onCommitted.addListener(stateManager._updateTab, {
    'url': [{'urlContains': ':'}]
});

chrome.webRequest.onErrorOccurred.addListener(function (requestDetails) {

    if (stateManager.requests[requestDetails.requestId]) {
        delete stateManager.requests[requestDetails.requestId];
    }

}, {'urls': [Address.ANY]});

chrome.webRequest.onBeforeRedirect.addListener(function (requestDetails) {

    let knownRequest = stateManager.requests[requestDetails.requestId];

    if (knownRequest) {

        stateManager.registerInjection(knownRequest.tabIdentifier, knownRequest.targetDetails);
        delete stateManager.requests[requestDetails.requestId];
    }

}, {'urls': [Address.ANY]});

chrome.storage.onChanged.addListener(stateManager._handleStorageChanged);
