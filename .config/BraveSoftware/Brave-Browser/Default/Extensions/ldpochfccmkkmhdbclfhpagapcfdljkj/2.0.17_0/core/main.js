/**
 * Entry Point
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2016-04-04
 * @license     MPL-2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Main
 */

var main = {};

/**
 * Private Methods
 */

main._initializeSettings = function () {

    let settings = [
        Setting.XHR_TEST_DOMAIN,
        Setting.SHOW_ICON_BADGE,
        Setting.BLOCK_MISSING,
        Setting.DISABLE_PREFETCH,
        Setting.ENFORCE_STAGING,
        Setting.STRIP_METADATA,
        Setting.WHITELISTED_DOMAINS
    ];

    helpers.getStoredSettings(settings, function (items) {

        if (items.blockMissing === true || items.enforceStaging === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }

        if (items.disablePrefetch !== false) {

            chrome.privacy.network.networkPredictionEnabled.set({
                'value': false
            });
        }
    });
};

main._showReleaseNotes = function (details) {

    let location, previousVersion, setting;

    location = chrome.runtime.getURL('pages/welcome/welcome.html');

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL ||
        details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

        previousVersion = details.previousVersion;
        setting = Setting.SHOW_RELEASE_NOTES;

        if (previousVersion && previousVersion.charAt(0) === '2') {
            return; // Do not show release notes after minor updates.
        }

        if (details.temporary === true) {
            return; // Only show release notes on full installations.
        }

        helpers.getStoredSettings(setting, function (items) {

            if (items.showReleaseNotes === true) {

                chrome.tabs.create({
                    'url': location,
                    'active': false
                });
            }
        });
    }
};

/**
 * Initializations
 */

chrome.runtime.onInstalled.addListener(main._showReleaseNotes);
main._initializeSettings();

wrappers.browserAction.setBadgeBackgroundColor({
    'color': [74, 130, 108, 255]
});

wrappers.browserAction.setBadgeTextColor({
    'color': [255, 255, 255, 255]
});
