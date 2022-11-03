/**
 * Main Options Page
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2016-08-09
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Options
 */

var options = {};

/**
 * Private Methods
 */

options._renderContents = function () {

    document.body.setAttribute('dir', options._scriptDirection);
    helpers.insertI18nContentIntoDocument(document);

    options._determineOptionValues()
        .then(options._renderOptionsPanel);
};

options._renderOptionsPanel = function () {

    let whitelistedDomains, domainWhitelist, elements;

    whitelistedDomains = options._optionValues.whitelistedDomains;
    domainWhitelist = options._serializeWhitelistedDomains(whitelistedDomains);

    elements = options._optionElements;

    elements.showIconBadge.checked = options._optionValues.showIconBadge;
    elements.blockMissing.checked = options._optionValues.blockMissing;
    elements.disablePrefetch.checked = options._optionValues.disablePrefetch;
    elements.stripMetadata.checked = options._optionValues.stripMetadata;
    elements.whitelistedDomains.value = domainWhitelist;

    options._registerOptionChangedEventListeners(elements);
    options._registerMiscellaneousEventListeners();

    if (options._optionValues.blockMissing === true) {
        options._renderBlockMissingNotice();
    }

    if (options._languageSupported === false) {
        options._renderLocaleNotice();
    }
};

options._renderBlockMissingNotice = function () {

    let blockMissingNoticeElement = document.getElementById('notice-block-missing');
    blockMissingNoticeElement.setAttribute('class', 'notice notice-warning');
};

options._hideBlockMissingNotice = function () {

    let blockMissingNoticeElement = document.getElementById('notice-block-missing');
    blockMissingNoticeElement.setAttribute('class', 'notice notice-warning hidden');
};

options._renderLocaleNotice = function () {

    let localeNoticeElement = document.getElementById('notice-locale');
    localeNoticeElement.setAttribute('class', 'notice notice-default notice-secondary');
};

options._registerOptionChangedEventListeners = function (elements) {

    elements.showIconBadge.addEventListener('change', options._onOptionChanged);
    elements.blockMissing.addEventListener('change', options._onOptionChanged);
    elements.disablePrefetch.addEventListener('change', options._onOptionChanged);
    elements.stripMetadata.addEventListener('change', options._onOptionChanged);
    elements.whitelistedDomains.addEventListener('keyup', options._onOptionChanged);
};

options._registerMiscellaneousEventListeners = function () {

    let blockMissingButtonElement, helpTranslateButtonElement;

    blockMissingButtonElement = document.getElementById('button-block-missing');
    helpTranslateButtonElement = document.getElementById('button-help-translate');

    blockMissingButtonElement.addEventListener('click', options._onDisableBlockMissing);
    helpTranslateButtonElement.addEventListener('click', options._onHelpTranslate);

    blockMissingButtonElement.addEventListener('keydown', function (event) {

        let enterOrSpaceKeyPressed = helpers.enterOrSpaceKeyPressed(event);

        if (enterOrSpaceKeyPressed) {
            options._onDisableBlockMissing();
        }
    });

    helpTranslateButtonElement.addEventListener('keydown', function (event) {

        let enterOrSpaceKeyPressed = helpers.enterOrSpaceKeyPressed(event);

        if (enterOrSpaceKeyPressed) {
            options._onHelpTranslate();
        }
    });
};

options._determineOptionValues = function () {

    return new Promise((resolve) => {

        let optionKeys = Object.keys(options._optionElements);

        helpers.getStoredSettings(optionKeys, function (items) {

            options._optionValues = items;
            resolve();
        });
    });
};

options._getOptionElement = function (optionKey) {
    return document.querySelector(`[data-option=${optionKey}]`);
};

options._getOptionElements = function () {

    return {
        [Setting.SHOW_ICON_BADGE]: options._getOptionElement(Setting.SHOW_ICON_BADGE),
        [Setting.BLOCK_MISSING]: options._getOptionElement(Setting.BLOCK_MISSING),
        [Setting.DISABLE_PREFETCH]: options._getOptionElement(Setting.DISABLE_PREFETCH),
        [Setting.STRIP_METADATA]: options._getOptionElement(Setting.STRIP_METADATA),
        [Setting.WHITELISTED_DOMAINS]: options._getOptionElement(Setting.WHITELISTED_DOMAINS)
    };
};

options._configureLinkPrefetching = function (value) {

    if (value === false) {

        // Restore default values of related preference values.
        chrome.privacy.network.networkPredictionEnabled.clear({});

    } else {

        chrome.privacy.network.networkPredictionEnabled.set({
            'value': false
        });
    }
};

options._serializeWhitelistedDomains = function (whitelistedDomains) {

    let domainWhitelist, whitelistedDomainKeys;

    whitelistedDomainKeys = Object.keys(whitelistedDomains);
    domainWhitelist = '';

    whitelistedDomainKeys.forEach(function (domain) {
        domainWhitelist = `${domainWhitelist}${domain};`;
    });

    domainWhitelist = domainWhitelist.slice(0, -1);
    domainWhitelist = domainWhitelist.replace(Whitelist.TRIM_EXPRESSION, '');

    return domainWhitelist;
};

options._parseDomainWhitelist = function (domainWhitelist) {

    let whitelistedDomains = {};

    domainWhitelist.split(Whitelist.VALUE_SEPARATOR).forEach(function (domain) {
        whitelistedDomains[helpers.normalizeDomain(domain)] = true;
    });

    return whitelistedDomains;
};

/**
 * Event Handlers
 */

options._onDocumentLoaded = function () {

    let language = navigator.language;

    options._optionElements = options._getOptionElements();
    options._languageSupported = helpers.languageIsFullySupported(language);
    options._scriptDirection = helpers.determineScriptDirection(language);

    options._renderContents();
};

options._onOptionChanged = function ({target}) {

    let optionKey, optionType, optionValue;

    optionKey = target.getAttribute('data-option');
    optionType = target.getAttribute('type');

    switch (optionType) {
    case 'checkbox':
        optionValue = target.checked;
        break;
    default:
        optionValue = target.value;
    }

    if (optionKey === Setting.BLOCK_MISSING) {

        if (optionValue === true) {
            options._renderBlockMissingNotice();
        } else {
            options._hideBlockMissingNotice();
        }
    }

    if (optionKey === Setting.DISABLE_PREFETCH) {
        options._configureLinkPrefetching(optionValue);
    }

    if (optionKey === Setting.WHITELISTED_DOMAINS) {
        optionValue = options._parseDomainWhitelist(optionValue);
    }

    chrome.storage.local.set({
        [optionKey]: optionValue
    });
};

options._onDisableBlockMissing = function () {

    let changeEvent = new Event('change');

    options._optionElements.blockMissing.checked = false;
    options._optionElements.blockMissing.dispatchEvent(changeEvent);
};

options._onHelpTranslate = function () {

    chrome.tabs.create({
        'url': 'https://crowdin.com/project/decentraleyes'
    });
};

/**
 * Initializations
 */

document.addEventListener('DOMContentLoaded', options._onDocumentLoaded);
