/**
 * Internal API Wrapper Module
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2017-12-03
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Wrappers
 */

var wrappers = {};

/**
 * Public Methods
 */

wrappers.browserAction = {

    setBadgeBackgroundColor (details) {

        if (chrome.browserAction.setBadgeBackgroundColor !== undefined) {
            chrome.browserAction.setBadgeBackgroundColor(details);
        }
    },

    setBadgeText (details) {

        if (chrome.browserAction.setBadgeText !== undefined) {
            chrome.browserAction.setBadgeText(details);
        }
    },

    setBadgeTextColor (details) {

        if (chrome.browserAction.setBadgeTextColor !== undefined) {
            chrome.browserAction.setBadgeTextColor(details);
        }
    },

    setIcon (details) {

        if (chrome.browserAction.setIcon !== undefined) {
            chrome.browserAction.setIcon(details);
        }
    }
};

wrappers.storage = {

    'managed': {

        get (defaults, callback) {

            if (chrome.storage.managed === undefined) {
                callback(defaults);
            } else {
                chrome.storage.managed.get(defaults, callback);
            }
        }
    }
};
