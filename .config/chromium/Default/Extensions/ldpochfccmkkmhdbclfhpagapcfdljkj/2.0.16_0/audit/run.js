/**
 * Resource Audit Script
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2014-07-24
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * Imports
 */

var fileSystem, crypto, https, sourceMappingURL;

fileSystem = require('fs');
crypto = require('crypto');
https = require('https');

sourceMappingURL = require('source-map-url');

/**
 * Variables
 */

var localResourceLocation = '../resources';
var localResourceLocationLength = localResourceLocation.length;
var localResourcePaths = [];
var comparedResourceAmount = 0;
var resourceAmount = 0;

/**
 * Functions
 */

function _fetchLocalResourcePaths (folderPath) {

    fileSystem.readdirSync(folderPath).forEach(function (resourceName) {

        var resourcePath = `${folderPath}/${resourceName}`;
        var resourceStatistics = fileSystem.statSync(resourcePath);

        if (resourceStatistics && resourceStatistics.isDirectory()) {
            _fetchLocalResourcePaths(resourcePath);
        } else {
            localResourcePaths.push(resourcePath);
        }

    });

    return localResourcePaths;
}

function _getLocalResourceContents (fileLocation, callback) {

    fileSystem.exists(fileLocation, function (exists) {

        if (exists) {

            fileSystem.stat(fileLocation, function (error, statistics) {

                fileSystem.open(fileLocation, 'r', function (error, fileDescriptor) {

                    var buffer = Buffer.alloc(statistics.size);

                    fileSystem.read(fileDescriptor, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {

                        var localFileContents = buffer.toString('utf8', 0, buffer.length);

                        fileSystem.close(fileDescriptor, function () {});
                        callback(localFileContents);
                    });
                });
            });
        }

    });
}

function _getRemoteResourceContents (remoteResourceRoute, callback) {

    var resourceURL = `https://ajax.googleapis.com/ajax/libs/${remoteResourceRoute}`;

    https.get(resourceURL, function (response) {

        var resourceContents = '';

        response.on('data', function (chunk) {
            resourceContents += chunk;
        });

        response.on('end', function () {

            if (response.statusCode === 200) {

                callback(resourceContents, resourceURL);

            } else {

                resourceURL = `https://cdnjs.cloudflare.com/ajax/libs/${remoteResourceRoute}`;

                https.get(resourceURL, function (response) {

                    resourceContents = '';

                    response.on('data', function (chunk) {
                        resourceContents += chunk;
                    });

                    response.on('end', function () {

                        if (response.statusCode !== 200) {
                            throw `Error: Resource ${remoteResourceRoute} could not be fetched.`;
                        }

                        callback(resourceContents, resourceURL);
                    });

                });

            }

        });

    });
}

function _hashFileContents (fileContents) {

    var hash;

    hash = crypto.createHash('sha512');

    hash.setEncoding('hex');
    hash.write(fileContents);
    hash.end();

    return hash.read();
}

function _showCompletedMessage () {

    console.log();
    console.log('       *** FILE INTEGRITY CHECKS COMPLETED');
    console.log(`       *** ${resourceAmount}/${resourceAmount} RESOURCES WERE ANALYZED`);
    console.log();
}

function _incrementComparedResourceAmount () {

    comparedResourceAmount++;

    if (comparedResourceAmount === resourceAmount) {

        setTimeout(function () {
            _showCompletedMessage();
        }, 500);
    }
}

function _compareResources (localResourceContents, remoteResourceContents, URL) {

    var hasSourceMappingURL = sourceMappingURL.existsIn(remoteResourceContents);
    var sourceMappingNotice = '[ ] REMOTE RESOURCE HAD SOURCE MAPPING URL';

    if (hasSourceMappingURL) {
        remoteResourceContents = sourceMappingURL.removeFrom(remoteResourceContents);
        sourceMappingNotice = '[X] REMOTE RESOURCE HAD SOURCE MAPPING URL';
    }

    var localResourceHash = _hashFileContents(localResourceContents);
    var remoteResourceHash = _hashFileContents(remoteResourceContents);

    console.log(`RESOURCE HASH (SHA512): ${localResourceHash}`);
    console.log(`RESOURCE HASH (SHA512): ${remoteResourceHash}`);

    var fileHashesMatch = (localResourceHash === remoteResourceHash);

    if (!fileHashesMatch) {
        console.log(URL);
        console.log(remoteResourceContents);
        throw 'Error: Decentraleyes resource hash mismatch.';
    }

    console.log();
    console.log('[X] LOCAL AND REMOTE RESOURCE HASHES MATCH');
    console.log(sourceMappingNotice);

    _incrementComparedResourceAmount();
}

/**
 * Initializations
 */

_fetchLocalResourcePaths(localResourceLocation);
resourceAmount = localResourcePaths.length;

/**
 * Script
 */

localResourcePaths.forEach(function (resourcePath) {

    var resourceRoute = resourcePath.substr(localResourceLocationLength + 1);
    resourceRoute = resourceRoute.substring(0, resourceRoute.length - 1);

    _getLocalResourceContents(resourcePath, function (localResourceContents) {

        _getRemoteResourceContents(resourceRoute, function (remoteResourceContents, URL) {

            console.log();
            console.log(resourceRoute.toUpperCase());
            console.log();

            // Compare resource content hashes.
            _compareResources(localResourceContents, remoteResourceContents, URL);

            console.log();
            console.log('------------------------------------------');
        });
    });

});
