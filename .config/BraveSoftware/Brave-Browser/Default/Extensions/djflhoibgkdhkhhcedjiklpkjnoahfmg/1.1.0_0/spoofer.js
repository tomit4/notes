// String identifiers for use in hashes.
var CUSTOM_OPTIONS_IDENTIFIER = "custom_options_list";
var SPOOF_OPTIONS_IDENTIFIER = "spoofer_list";
var BASE_OPTIONS_IDENTIFIER = "base_options_list";
var USE_PRESETS_IDENTIFIER = "use_presets";
var REPORT_ERRORS_IDENTIFIER = "report_errors";
var USE_SPOOF_PER_TAB = "use_per_tab";
var USE_SPOOF_PER_TAB_CACHE = "use_per_tab_cache";
var PRESET_LIST_IDENTIFIER = "preset_list";
var ERROR_IDENTIFIER = "error_";
var SPOOFER_LIST = "spoofer_list";
var HOTLIST_INDEX = "hotlist_index";
var PERMANENT_OVERRIDE = "permanent_override";
var NO_SPOOF_PER_TAB = "no_spoof";
var USE_SYNC = "use_sync";

var MANAGED_EDIT_RIGHTS = "EditRights";
var MANAGED_GROUP_NAME = "Managed";


// Legacy URL where updates used to exist.
var update_url = "http://spoofer-extension.appspot.com/update";

// URL where error codes are sent for debugging purposes.
var error_url = "http://spoofer-extension.appspot.com/error";

var last_update_time = null;
var storage_location = null;

// Hardcoded list of navigator.platform spoofs.
var PLATFORM_SPOOF = {"Macintosh" : "MacIntel",
                      "Android"   : "Android",
                      "Linux"     : "Linux",
                      "iPhone"    : "iPhone",
                      "iPod"      : "iPod",
                      "iPad"      : "iPad",
                      "Windows"   : "Windows"};


// The sync storage API has throttling limits, this is to minimize the potential
// of throttling on import.
var MAX_IMPORT_COUNT = 450;
var MAX_MEMORY_USAGE = 0.98;

// Object for making XHRs.
var req;

// Hardcoded enumeration of error codes.
var TEST_ERROR_CODE = "0";
var OUT_OF_SPACE = "1";
var MIGRATION_INCOMPLETE = "2";
var MIGRATION_FAILED_THROTTLED_USER_AGENTS = "3";
var MIGRATION_FAILED_THROTTLED_SPOOFS = "4";
var THROTTLED_WRITES = "5";
var ERROR_CODES = [TEST_ERROR_CODE,
                   OUT_OF_SPACE,
                   MIGRATION_INCOMPLETE,
                   MIGRATION_FAILED_THROTTLED_USER_AGENTS,
                   MIGRATION_FAILED_THROTTLED_SPOOFS,
                   THROTTLED_WRITES];

var CUSTOM_OPTIONS_LIST_PREFIX = "c_";
var SPOOF_OPTIONS_LIST_PREFIX = "s_";
var MANAGED_USER_AGENT_LIST_PREFIX = "cm_";
var MANAGED_SPOOF_LIST_PREFIX = "sm_";

// Because http requests coming through the extension API have to be processed
// super fast, we can't rely on using local storage to respond fast enough to
// swap out the user-agent.  Instead, we have to keep the same list in memory so
// the swap will work.  We keep a cache of both user-agents and hardcoded swaps.
var user_agent_cache = [];
var spoof_cache = [];
var permanent_override_cache = false;

function updateCache(callback) {
  _getUserAgentList(function(ua_list) {
    user_agent_cache = ua_list;
    _getSpoofList(function(spoof_list) {
      spoof_cache = spoof_list;
      getPermanentSpoofOverride(function(override) {
        getSpoofPerTab(function (spoof) {
          setSpoofPerTabCache(spoof);
          callback();
        });
      });
    });
  });
}
updateCache(function(){});

// Object that encapsulates a user-agent.  Makes passing around a set of values
// related to a user-agent much easier.
function UserAgent(title,
                   ua_string,
                   vendor_string,
                   badge,
                   is_preset,
                   group) {
  this.title = title;
  this.ua_string = ua_string;
  this.vendor = vendor_string;
  this.badge = badge;
  this.is_preset = is_preset;
  this.append_to_default_ua = false;
  this.group = group;
  this.show_in_list = false;
  this.is_managed = false;
  this.key = "";
  
  this.getUserAgentString = new function(current_user_agent_string) {
    if (this.append_to_default_ua) {
      return current_user_agent_string + ' ' + this.ua_string;
    }
    return this.ua_string;
  }
}

function PresetSpoof(domain, user_agent) {
  this.domain = domain;
  this.user_agent = user_agent;
  this.is_managed = false;
  this.key = "";
}

function ErrorReport(code, message) {
  this.error_code = code;
  this.error_message = message;
}

/*****************************************************************************/
/* Legacy functions for getting localstorage data                            */
/*****************************************************************************/

// Storage used to be done in the extension in localStorage, but that proved
// to be limited in ability and size.  These functions remain to both migrate
// legacy settings to the chrome.storage API, or to set fast n' dirty settings
// that are not meant to be persisted across sessions.

function getItem(identifier_obj) {
  return localStorage[identifier_obj];
} 

// The value needs to be stringified before setting it here. (JSON.stringify)
function storeItem(key, value) {
  localStorage[key] = value;
}

function _isUsingLocalStorage() {
  return (localStorage[CUSTOM_OPTIONS_IDENTIFIER] > 0 ||
          localStorage[SPOOF_OPTIONS_IDENTIFIER] > 0);
}

// Wipes all settings.  Usually useful for catastrophic data corruption.
function resetEverything(callback) {
  getIsOtherSettingsManaged(function(managed) {
    if (!managed) {
      var pointer_values = {};
      pointer_values[("" + CUSTOM_OPTIONS_IDENTIFIER)] = [];
      var spoof_values = {};
      spoof_values[("" + SPOOF_OPTIONS_IDENTIFIER)] = [];
      getStorageLocation().set(pointer_values, function() {
        getStorageLocation().set(spoof_values, function() {
            updateCache(function() {});
        });
      });
      localStorage[CUSTOM_OPTIONS_IDENTIFIER] = "";
      localStorage[SPOOF_OPTIONS_IDENTIFIER] = "";
    }
    callback();
  });
}

function getSpoofPerTabCache() {
  var cache = getItem(USE_SPOOF_PER_TAB_CACHE);
  return (cache && cache == "true");
}

function setSpoofPerTabCache(spoof) {
  storeItem(USE_SPOOF_PER_TAB_CACHE, ""+spoof);  
}


/*****************************************************************************/
/*  Legacy migration methods                                                 */
/*****************************************************************************/

// Adds a fake user-agent and spoof to local storage, then attempts to move
// those objects to sync storage.
function _testMigration() {
  // Add some stuff to local storage, then call the migration,
  // then see if its in sync storage.
  var test1 = new UserAgent("Opera 10", "Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.00", "Mozilla, Inc.", "O10", true, "Opera");
  var test2 = new PresetSpoof("www.test.com", test1);
  var ary1 = new Array();
  ary1.push(test1);
  var ary2 = new Array();
  ary2.push(test2);
  storeItem(CUSTOM_OPTIONS_IDENTIFIER, JSON.stringify(ary1));
  storeItem(SPOOF_OPTIONS_IDENTIFIER, JSON.stringify(ary2));
  _moveLocalStorageToSyncStorage();
}

// Finds how much of the current storage location is used by our data.
// Useful for showing the user how much space they have left, or giving
// a reason why they can't save anything more.
function getPercentOfStorageUsed(callback) {
  getStorageLocation().getBytesInUse(null, function(bytes) {
    callback(bytes / getStorageLocation().QUOTA_BYTES);
  });
}

function _moveLocalStorageToSyncStorage() {
  // Move all items from localStorage until everything is moved.
  _moveSpoofsToSyncStorage(function() {
    console.log("Migrated spoofs to sync storage.");
  });
  _moveUserAgentsToSyncStorage(function() {
    console.log("Migrated user agents to sync storage.")
  });

  if (_isUsingLocalStorage()) {
    console.log("Migration still incomplete -- waiting for next time to finish up.");
    recordError(MIGRATION_INCOMPLETE, "");
  }
  else
    console.log("Migration complete!");
}

// For migrating legacy configurations from localStorage to chrome.storage.
function _moveUserAgentsToSyncStorage(callback) {
  var ua_list = JSON.parse(getItem(CUSTOM_OPTIONS_IDENTIFIER));
  _addMultipleUserAgents(ua_list, function(pointer_list, unset_ua_list) {
    if (pointer_list && unset_ua_list && unset_ua_list.length > 0) {
      // Not everything got added.  Likely, we hit a throttle.
      // Keep the old stuff around until we can migrate it next time.
      recordError(MIGRATION_FAILED_THROTTLED_USER_AGENTS, "");
      console.log("" + unset_ua_list.length + " user-agents were not able to be ");
      console.log("migrated.  Leaving them in local storage until we can re-try.");      
      storeItem(CUSTOM_OPTIONS_IDENTIFIER, unset_ua_list);
    } else {
      storeItem(CUSTOM_OPTIONS_IDENTIFIER, "");    
    }
    callback();
  });
}

// For migrating legacy configurations from localStorage to chrome.storage.
function _moveSpoofsToSyncStorage(callback) {
  var spoof_list = JSON.parse(getItem(SPOOF_OPTIONS_IDENTIFIER));
  _addMultipleSpoofs(spoof_list, function(pointer_list, unset_spoof_list) {
    if (pointer_list && unset_spoof_list && unset_spoof_list.length > 0) {
      // Not everything got added.  Likely, we hit a throttle.
      // Keep the old stuff around until we can migrate it next time.
      recordError(MIGRATION_FAILED_THROTTLED_SPOOFS, "");
      console.log("" + unset_spoof_list.length + " spoofs were not able to be ");
      console.log("migrated.  Leaving them in local storage until we can re-try.")
      storeItem(SPOOF_OPTIONS_IDENTIFIER, unset_spoof_list);
    } else {
      storeItem(SPOOF_OPTIONS_IDENTIFIER, "");    
    }
    callback();
  });
}

function _syncSpoofsAcrossStorageLocations(from_storage, to_storage, callback) {
  storage_location = from_storage;
  _getSpoofList(function(spoof_list) {
    storage_location = to_storage;
    _addMultipleSpoofs(spoof_list, function(pointer_list, unset_spoof_list) {
      console.log("Migrated spoofs from " + from_storage + " to " + to_storage);
    });
  });
  storage_location = from_storage;
  callback();
}

function _syncUserAgentsAcrossStorageLocations(from_storage, to_storage, callback) {
  storage_location = from_storage;
  _getUserAgentList(function(user_agent_list) {
    storage_location = to_storage;
    _addMultipleUserAgents(user_agent_list, function(pointer_list, unset_ua_list) {
      console.log("Migrated user_agents from " + from_storage + " to " + to_storage);
    });
  });
  storage_location = from_storage;
  callback();
}

function _syncDataAcrossStorageLocations(from_storage, to_storage, callback) {
  to_storage.clear(function() {
    _syncUserAgentsAcrossStorageLocations(from_storage, to_storage, function() {
      _syncSpoofsAcrossStorageLocations(from_storage, to_storage, function () {
        console.log("Data migrated from " + from_storage + " to " + to_storage + ".");
      });
    });
  });
  callback();
}

function getStorageLocation() {
  if (!storage_location) 
    storage_location = (getUseSync() ? chrome.storage.sync : chrome.storage.local);
  return storage_location;
}

/*****************************************************************************/
/* Configuration getter/setter methods                                       */
/*****************************************************************************/

function setUseSync(use_sync) {
  getIsUserAgentManaged(function(managed) {
    if (!managed) {  
      if (use_sync) {
        storeItem(USE_SYNC, "true");
        storage_location = chrome.storage.sync;
      } else {
        storeItem(USE_SYNC, "");
        storage_location = chrome.storage.local;
      }
    }
  });
}

function getUseSync() {
  var use_sync = getItem(USE_SYNC);
  return (use_sync && use_sync == "true"); 
}

// Sets whether errors get reported to the hardcoded error URL.
function setReportErrors(report_errors) {
  getIsOtherSettingsManaged(function(managed) {
    if (!managed) {  
      storeItem(REPORT_ERRORS_IDENTIFIER, "" + report_errors);
  }});
}

function getReportErrors(callback) {
  getSendErrorsManaged(function(managed) {
    if (managed != null) {
      callback(managed);
    }
    var builtin = getItem(REPORT_ERRORS_IDENTIFIER);
    callback(!builtin || builtin == "true");
  });
}

// Sets whether spoofs are across all tabs or only for the current active tab.
function setSpoofPerTab(spoof_per_tab) {
  getSpoofPerTabManaged(function(managed) {
    if (managed == null) {
      storeItem(USE_SPOOF_PER_TAB, "" + spoof_per_tab);
      // Clear out any settings per tab.
      storeItem(HOTLIST_INDEX, JSON.stringify({}));
      updateCache(function(){});
    }
  });
}

function getSpoofPerTab(callback) {
  getSpoofPerTabManaged(function(managed) {
    var spoof_per_tab = false;
    if (managed == null) {
      var builtin = getItem(USE_SPOOF_PER_TAB);
      spoof_per_tab = (builtin && builtin == "true");
    } else
      spoof_per_tab = managed;
    if (callback)
      callback(spoof_per_tab);
  });
}

// Sets whether permanent spoofs override the hot-switch.
function setPermanentSpoofOverride(permanent_override) {
  getSpoofOverrideManaged(function(managed) {
    if (managed == null) {
      storeItem(PERMANENT_OVERRIDE, "" + permanent_override);
      updateCache(function(){}); // we store this setting in the cache
    }
  });
}

function getPermanentSpoofOverride(callback) {
  getSpoofOverrideManaged(function(managed) {
    if (managed == null) {  
      var permanent_override = getItem(PERMANENT_OVERRIDE);
      permanent_override_cache = (permanent_override && permanent_override == "true");
    } else
      permanent_override_cache = managed;
    callback(permanent_override_cache);
  });
}


/*****************************************************************************/
/* Enterprise configuration getter methods                                   */
/*****************************************************************************/

function getIsUserAgentManaged(callback) {
  chrome.storage.managed.get(MANAGED_EDIT_RIGHTS, function(edit_rights) {
    callback(edit_rights && MANAGED_EDIT_RIGHTS in edit_rights &&
        "user_agents" in edit_rights[MANAGED_EDIT_RIGHTS]);
  });
}

function getIsSpoofManaged(callback) {
  chrome.storage.managed.get(MANAGED_EDIT_RIGHTS, function(edit_rights) {
    callback((edit_rights && MANAGED_EDIT_RIGHTS in edit_rights &&
        "permanent_spoofs" in edit_rights[MANAGED_EDIT_RIGHTS]));
  });
}

function getIsOtherSettingsManaged(callback) {
  chrome.storage.managed.get(MANAGED_EDIT_RIGHTS, function(edit_rights) {
    callback(edit_rights && MANAGED_EDIT_RIGHTS in edit_rights &&
            "other_settings" in edit_rights[MANAGED_EDIT_RIGHTS]);
  });
}


function getSpoofOverrideManaged(callback) {
  chrome.storage.managed.get("OtherSettings", function(other_settings) {
    if(other_settings && other_settings["OtherSettings"] &&
       "spoof_override" in other_settings["OtherSettings"]) {
      callback(other_settings["OtherSettings"]["spoof_override"]);
    } else
      callback(null);
  });  
}

function getHotlistEnabledManaged(callback) {
  chrome.storage.managed.get("OtherSettings", function(other_settings) {
    if(other_settings && other_settings["OtherSettings"] &&
       "hotlist_enabled" in other_settings["OtherSettings"]) {
      callback(other_settings["OtherSettings"]["hotlist_enabled"]);
    } else
      callback(null);
  });
}

function getSpoofPerTabManaged(callback) {
  chrome.storage.managed.get("OtherSettings", function(other_settings) {
    if(other_settings && other_settings["OtherSettings"] &&
       "spoof_per_tab" in other_settings["OtherSettings"]) {
      callback(other_settings["OtherSettings"]["spoof_per_tab"]);
    } else
      callback(null);
  });  
}

function getSendErrorsManaged(callback) {
  chrome.storage.managed.get("OtherSettings", function(other_settings) {
    if(other_settings && other_settings["OtherSettings"] &&
       "send_errors" in other_settings["OtherSettings"]) {
      callback(other_settings["OtherSettings"]["send_errors"]);
    } else
      callback(null);
  });  
}

function getErrors() {
  var errors = getItem(ERROR_IDENTIFIER);
  if (!errors)
    errors = {};
  else
    errors = JSON.parse(errors);
  return errors;
}

function recordError(code, message) {
  var errors = getErrors();
  if (errors[code]) {
    errors[code] = parseInt(errors[code]) + 1;
  } else
    errors[code] = 1;
  storeItem(ERROR_IDENTIFIER, JSON.stringify(errors));
}

function clearErrors() {
  storeItem(ERROR_IDENTIFIER, JSON.stringify({}));  
}

function generateTestError() {
  recordError(TEST_ERROR_CODE, "");
}

/*****************************************************************************/
/* Functions for accessing data from sync storage                            */
/*****************************************************************************/

// Data is stored in chrome.storage as a list of pointers, and those pointers
// point at the data itself.  The size of a single object is capped with
// chrome.storage, so it could not be all saved as one list.

// The two major lists of things to be saved and retrieved are:
// 1. a list of all user-agents
// 2. a list of all hard coded spoofs
// Both of these has its own pointer list.
// Each of the objects stored this way has a "key" field where it saves its
// own pointer, in case you need to access it.

// Most of these functions require callback methods because they rely on
// chrome.storage APIs, which all require callbacks.  This makes them all
// asynchronous, and blocking has to be done at a higher scope than this UI.

function _getUserAgentPointerList(callback) {
  getStorageLocation().get(CUSTOM_OPTIONS_IDENTIFIER, function(pointer_list) {
    if (callback)
      return callback(pointer_list ? pointer_list[("" + CUSTOM_OPTIONS_IDENTIFIER)] : []);
    return null;
  });
}

// Access a User Agent object by its pointer.
function _getUserAgentByKey(key, callback) {
  getStorageLocation().get(key, function(user_agent) {
    return callback(user_agent[key]);
  });
}

function _getUserAgentList(callback) {
  _getManagedUserAgentList(function(managed_list) {
    if (!managed_list)
      managed_list = new Array();
    _getUserAgentPointerList(function(pointer_list) {
      if (!pointer_list || pointer_list.length == 0)
        return callback(managed_list);
      getStorageLocation().get(pointer_list, function(user_agent_map) {
        for (var key in user_agent_map)
          managed_list.push(user_agent_map[key]);
        return callback(managed_list);
      })
      return callback(managed_list);
    });
  });
}

function _getManagedUserAgentList(callback) {
  var managed_list = [];
  chrome.storage.managed.get("UserAgents", function(obj) {
    if (obj && obj["UserAgents"]) {
      var list = obj["UserAgents"];
      for (var i = 0; i < list.length; i++) {
        var ua = new UserAgent();
        ua.is_managed = true;
        ua.title = list[i].title;
        ua.ua_string = list[i].ua_string;
        ua.vendor = list[i].vendor;
        ua.badge = list[i].badge;
        ua.append_to_default_ua = list[i].append;
        ua.group = MANAGED_GROUP_NAME;
        ua.key = MANAGED_USER_AGENT_LIST_PREFIX + i;
        managed_list.push(ua);
      }
    }
  });
  callback(managed_list);
}

// Add a signle user-agent object to storage.
function _addUserAgent(user_agent, callback) {
  getIsUserAgentManaged(function(managed) {
    if (!managed) {
      _getUserAgentPointerList(function(pointer_list) {
        if (!pointer_list)
          pointer_list = [];
        if (!user_agent.key || user_agent.key == "") {
          var max = 0;
          if (pointer_list && pointer_list.length > 0) {
            for (var i = 0; i < pointer_list.length; i++) {
              var index = parseInt(pointer_list[i].substring(CUSTOM_OPTIONS_LIST_PREFIX.length));
              if (index >= max)
                max = index;
            }
          }
          user_agent.key = CUSTOM_OPTIONS_LIST_PREFIX + (max + 1);
        }
        // Can't just store the user-agent by itself, we have to
        // create a dict and point one key value to our user-agent object,
        // then save the dict.
        var foo = user_agent.key;
        var values = {};
        values[(""+foo)] = user_agent;
        getStorageLocation().set(values, function() {
          pointer_list.push(user_agent.key);
          var pointer_values = {};
          pointer_values[("" + CUSTOM_OPTIONS_IDENTIFIER)] = pointer_list;
          callback = (callback ? callback : function() {});
          getStorageLocation().set(pointer_values, function() {
            updateCache(callback);
          });
        });
      });
    }
  });
}

function _editUserAgent(user_agent, callback) {
  getIsUserAgentManaged(function(managed) {
    if (!managed && user_agent && user_agent.key) {
      var foo = user_agent.key;
      var values = {};
      values[(""+foo)] = user_agent;
      getStorageLocation().set(values, function() {
        updateCache(callback(user_agent));
      });
      // no need to update the pointer list, since we're keeping
      // all of our pointers the same.
    }
  });
}

// Adds multiple user agent objects at once.
// Calls back with a list of the pointers to the user-agent objects added.
// If it hit a throttling error, calls back with a list of succesfully added
// pointers *and* a list of user-agents not added.
function _addMultipleUserAgents(user_agent_list, callback) {
  if (!user_agent_list || user_agent_list.length == 0)
    return callback();
  getIsUserAgentManaged(function(managed) {
    if (!managed) {  
      _getUserAgentPointerList(function(pointer_list) {
        pointer_list = (pointer_list ? pointer_list : []);
        var max = 0;
        if (pointer_list && pointer_list.length > 0) {
          for (var i = 0; i < pointer_list.length; i++) {
            var index = parseInt(pointer_list[i].substring(CUSTOM_OPTIONS_LIST_PREFIX.length));
            if (index >= max)
              max = index;
          }
        }
        for (var j = 0; j < user_agent_list.length; j++) {
          user_agent_list[j].key = CUSTOM_OPTIONS_LIST_PREFIX + (max + 1 + j);
          // pointer_list.push(user_agent_list[j].key);
        }
        var set_user_agent = function(list, pointer_list, callback) {
          if (!list || list.length == 0)
            return callback(pointer_list);
          getPercentOfStorageUsed(function(pct) {
            if (pct > MAX_MEMORY_USAGE) {
              recordError(OUT_OF_SPACE, "");
              console.log("Error in adding user-agents: ran out of space.");
              //updateCache(callback(pointer_list, list));
            }        
          });
          var user_agent = list.pop();
          if (!user_agent)
            return callback(pointer_list);
          var foo = user_agent.key;
          if (!foo) {
            console.log("User agent does not have a key -- bailing out.");
            return callback(pointer_list);
          }
          var values = {};
          values[(""+foo)] = user_agent;
          getStorageLocation().set(values, function() {
            if(chrome.runtime.lastError) {
              // We likely exceeded our quota.  Back off from recursively
              // hitting this over and over.
              // TODO(gwilson): Show an error to the user somewhere.
              recordError(OUT_OF_SPACE, "");          
              console.log("Error in adding user-agent: " + user_agent.title);
              console.log("We likely hit the maximum writes per hour.");
              updateCache(callback(pointer_list));
            } else {
              pointer_list.push(""+foo);  // user_agent.key
              set_user_agent(list, pointer_list, callback); // maybe wrap callback in updateCache.
            }
          });
        }
        set_user_agent(user_agent_list, pointer_list, function(pointers) {
          // Some horrible error (likely a write maximum hit).  Bail.
          if (pointers == null) {
            recordError(THROTTLED_WRITES, "");          
            return;
          }
          var pointer_values = {};
          pointer_values[("" + CUSTOM_OPTIONS_IDENTIFIER)] = pointers;
          callback = (callback ? callback : function() {});
          getStorageLocation().set(pointer_values, function() {
          updateCache(callback);
          });
        });
      });
    }
  });
  callback();
}

// Managed user agents don't need to be protected because they are stored in
// a different data space that cannot be manipulated.  It will simply fail.
function _deleteUserAgentByKey(key, callback) {
  getIsUserAgentManaged(function(managed) {
    if (!managed) {  
      _getUserAgentPointerList(function(pointer_list) {
        for (var i = 0; i < pointer_list.length; i++)
          if (pointer_list[i] == key) {
            pointer_list.splice(i, 1);
            break;
          }
        getStorageLocation().set({CUSTOM_OPTIONS_IDENTIFIER: pointer_list}, function() {
          getStorageLocation().remove(key, function() {
            updateCache(callback);
          });
        });
      });
    }
  });
}

// TODO (gwilson): refactor these functions with the ones above
function _getSpoofPointerList(callback) {
  getStorageLocation().get(SPOOF_OPTIONS_IDENTIFIER, function(pointer_list) {
    if (callback)
      callback( (pointer_list ? pointer_list[("" + SPOOF_OPTIONS_IDENTIFIER)] : []) );
  });
}

function _getSpoofList(callback) {
  _getManagedSpoofList(function(managed_list) {
    if (!managed_list)
      managed_list = new Array();
    _getSpoofPointerList(function(pointer_list) {
      if (!pointer_list || pointer_list.length == 0)
        return callback(managed_list);
      return getStorageLocation().get(pointer_list, function(spoof_map) {
        for (var key in spoof_map)
          managed_list.push(spoof_map[key]);
        return callback(managed_list);
      })
    });
  });
}

function _getManagedSpoofList(callback) {
  var managed_list = [];
  chrome.storage.managed.get("PermanentSpoofs", function(obj) {
    if (obj && obj["PermanentSpoofs"]) {
      var list = obj["PermanentSpoofs"];
      for (var i = 0; i < list.length; i++) {
        var spoof = new PresetSpoof();
        spoof.domain = list[i].domain;
        spoof.is_managed = true;
        spoof.key = MANAGED_SPOOF_LIST_PREFIX + i;
        var ua = new UserAgent();
        ua.is_managed = true;
        ua.title = list[i].user_agent.title;
        ua.ua_string = list[i].user_agent.ua_string;
        ua.vendor = list[i].user_agent.vendor;
        ua.badge = list[i].user_agent.badge;
        ua.append_to_default_ua = list[i].user_agent.append;
        ua.group = MANAGED_GROUP_NAME;
        spoof.user_agent = ua;
        managed_list.push(spoof);
      }
    }
  });
  callback(managed_list);
}



function _addSpoof(preset_spoof, callback) {
  getIsSpoofManaged(function(managed) {  
    if (!managed) {
      // preset_spoof.user_agent will be empty if they want to spoof with the default UA always.
      if (!preset_spoof) {
        console.log("Preset spoof to add doesn't exist, bailing.");
        return;
      }
      _getSpoofPointerList(function(pointer_list) {
        pointer_list = (pointer_list ? pointer_list : []);
        if (!preset_spoof.key || preset_spoof.key == "") {
          var max = 0;
          if (pointer_list && pointer_list.length > 0) {
            for (var i = 0; i < pointer_list.length; i++) {
              var index = parseInt(pointer_list[i].substring(SPOOF_OPTIONS_LIST_PREFIX.length));
              if (index >= max)
                max = index;
            }
          }
          preset_spoof.key = SPOOF_OPTIONS_LIST_PREFIX + (max + 1);
        }
        var values = {};
        values[("" + preset_spoof.key)] = preset_spoof;
        getStorageLocation().set(values, function() {
          pointer_list.push(preset_spoof.key);
          var pointer_values = {};
          pointer_values[(""+SPOOF_OPTIONS_IDENTIFIER)] = pointer_list;
          callback = (callback ? callback : function() {});
          getStorageLocation().set(pointer_values, function() {
            updateCache(callback);
          });
        });
      });
    } else callback(false);
  });
}

// TODO(gwilson): Refactor this with _addMultipleUserAgents.  They're almost
// exactly the same.
// To add a long set of spoofs at once, we can't do a bulk pointer commit, then
// a bulk value commit.  We don't know when the API will run out of space, so
// we have to do one at a time.
function _addMultipleSpoofs(spoof_list, callback) {
  getIsSpoofManaged(function(managed) {  
    if (!managed) {
      if (!spoof_list || spoof_list.length == 0)
        return callback();
      _getSpoofPointerList(function(pointer_list) {
        pointer_list = (pointer_list ? pointer_list : []);
        var max = 0;
        if (pointer_list && pointer_list.length > 0) {
          for (var i = 0; i < pointer_list.length; i++) {
            var index = parseInt(pointer_list[i].substring(SPOOF_OPTIONS_LIST_PREFIX.length));
            if (index >= max)
              max = index;
          }
        }
        for (var j = 0; j < spoof_list.length; j++) {
          spoof_list[j].key = SPOOF_OPTIONS_LIST_PREFIX + (max + 1 + j);
        }
        var set_spoof = function(list, pointer_list, callback) {
          if (!list || list.length == 0)
            callback(pointer_list);
          getPercentOfStorageUsed(function(pct) {
            if (pct > MAX_MEMORY_USAGE) {
              console.log("Error in adding spoofs: Ran out of space");
              //updateCache(callback(pointer_list, list));
            }        
          });
          var spoof = list.pop();
          if (!spoof)
            return callback(pointer_list);
          var foo = spoof.key;
          if (!foo) {
            console.log("Spoof does not have a key.  Bailing out.");
            return callback(pointer_list);
          }
          var values = {};
          values[(""+foo)] = spoof;
          getStorageLocation().set(values, function() {
            if(chrome.runtime.lastError) {
              // We likely exceeded our quota.  Back off from recursively
              // hitting this over and over.
              // TODO(gwilson): Show an error to the user somewhere.
              console.log("Error in adding user-agents: " + chrome.runtime.lastError);
              console.log("We likely hit the maximum writes per hour.");
              recordError(THROTTLED_WRITES, "");
              // TODO(gwilson): should we not call back if we're already at write
              // maximums?
              updateCache(callback(pointer_list, list));
            } else {
              pointer_list.push(""+foo); //spoof.key
              set_spoof(list, pointer_list, callback);
            }
          });
        }
        set_spoof(spoof_list, pointer_list, function(pointers) {
          // Some horrible error (likely a write maximum hit).  Bail.
          if (pointers == null) {
            recordError(MIGRATION_FAILED_THROTTLED_SPOOFS, "");
            return;
          }
          var pointer_values = {};
          pointer_values[("" + SPOOF_OPTIONS_IDENTIFIER)] = pointers;
          callback = (callback ? callback : function() {});
          getStorageLocation().set(pointer_values, function() {
            updateCache(callback);
          });
        });
      });
    } else callback(false);
  });
}

function _deleteSpoofByKey(key, callback) {
  getIsSpoofManaged(function(managed) {  
    if (!managed) {  
      _getSpoofPointerList(function(pointer_list) {
        for (var i = 0; i < pointer_list.length; i++)
          if (pointer_list[i] == key) {
            pointer_list.splice(i, 1);
          break;
        }
        getStorageLocation().set({SPOOF_OPTIONS_IDENTIFIER: pointer_list}, function() {
          getStorageLocation().remove(key, function() {
            updateCache(callback);
          });
        });
      });
    } else callback(false);
  });
}

// Returns the full spoof list grouped by the string title of each UA's group.
// This is useful for the UI, so we can do something like show 'Title' - 'list of UAs'.
function getOptionsByGroup(callback) {
  _getUserAgentList(function(user_agent_list) {
    var groups = {};
    for (var i = 0; i < user_agent_list.length; i++) {
      if (!user_agent_list[i])
        continue;
      var group = getUserAgentGroup(user_agent_list[i]);
      if (!groups[group]) {
        groups[group] = new Array();
      }
      groups[group].push(user_agent_list[i]);
    }
    callback(groups);
  });
}

/*****************************************************************************/
/* "Hotlist" functions                                                       */
/*****************************************************************************/

// Functions for getting and setting the "hotlist" or the on-the-fly spoof that
// the user chooses from the icon in the upper right of Chrome.

function getHotlistMap() {
  var index_map = getItem(HOTLIST_INDEX);
  if (index_map) {
    index_map = JSON.parse(index_map);
    if (!index_map)
      index_map = {};
  } else
    index_map = {};
  return index_map;  
}

function getHotlistIndex(tab, callback) {
  getHotlistIndexById(tab.id, callback);
}

function getHotlistIndexById(tabId, callback) {
  if (!tabId) {
    console.log("no tab provided, returning nothing");
    if (callback)
      callback(null);
    return null;
  }
  var index_map = getHotlistMap();
  if(!getSpoofPerTabCache())
    tabId = NO_SPOOF_PER_TAB;
  var index = (index_map[tabId] ? index_map[tabId] : null);
  if (callback)
    callback(index);
  return index;
}

function setHotlistIndex(tab, index) {
  // Makes sure the items we want to use as a hotlist are in the cache.
  if (!tab || !tab.id) {
    console.log("no tab passed, not saving anything.")
    return;
  }
  getHotlistEnabledManaged(function(managed) {
    if (managed == false) {
      console.log("Hotlist enabled is managed.  ignoring input.");
      return;
    }
    var tabId = (getSpoofPerTabCache() ? tab.id : NO_SPOOF_PER_TAB);
    var map = getHotlistMap();
    map[tabId] = index;
    console.log("Storing " + index + " under tab " + tabId);
    storeItem(HOTLIST_INDEX, JSON.stringify(map));
    updateCache(function(){ });
  });
}

function getHotlist(tab, callback) {
  getHotlistEnabledManaged(function(managed) {
    if (managed != null && managed == false) {
      callback(null);
      return;
    }
  });  
  getHotlistIndex(tab, function(hotlist_ua_index) {
    if (!hotlist_ua_index || hotlist_ua_index == "")
      callback(null);
    else  {
      _getUserAgentByKey(hotlist_ua_index, callback);
    }
  });
}

function setHotlist(tab, user_agent_index) {
  setHotlistIndex(tab, user_agent_index);
}

/*****************************************************************************/
/* Helper / utility functions                                                */
/*****************************************************************************/

// Parses the hostname/domain out of the given URL.
// Probably a better way to do this, but this way was consistent
// with how the browser interprets hosts.
function findHostname(url) {
  var a = document.createElement("a");
  a.href = url;
  return a.host;
}

function isDomainName(str) {
  var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*$','i');
  return pattern.test(str);
}

// Returns a "base" set of user-agent strings, while
// saving them to storage.
function getBaseOptionsList(hard_reset, callback) {
  var base_options_list = new Array();
  callback = (callback ? callback : function() {});
  base_options_list.push(new UserAgent("Default", "", "", "", true, "Chrome"));
  base_options_list.push(new UserAgent("Windows Firefox 33", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:33.0) Gecko/20120101 Firefox/33.0", "Mozilla, Inc.", "FFW", true, "Firefox"));
  base_options_list.push(new UserAgent("Mac Firefox 33", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0", "Mozilla, Inc.", "FFM", true, "Firefox"));
  base_options_list.push(new UserAgent("Opera 12.14", "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14", "Mozilla, Inc.", "O12", true, "Opera"));
  base_options_list.push(new UserAgent("Mac Safari 7", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A", "Apple, Inc.", "S7", true, "Safari"));
  base_options_list.push(new UserAgent("Internet Explorer 6", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; WOW64; Trident/4.0; SLCC1)", "Microsoft", "IE6", true, "Internet Explorer"));
  base_options_list.push(new UserAgent("Internet Explorer 7", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)", "Microsoft", "IE7", true, "Internet Explorer"));
  base_options_list.push(new UserAgent("Internet Explorer 8", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)", "Microsoft", "IE8", true, "Internet Explorer"));
  base_options_list.push(new UserAgent("Internet Explorer 9", "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)", "Microsoft", "IE9", true, "Internet Explorer"));  
  base_options_list.push(new UserAgent("Internet Explorer 10", "Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)", "Microsoft", "IE10", true, "Internet Explorer"));  
  base_options_list.push(new UserAgent("iPhone 6", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25", "Apple, Inc.", "IP6", true, "iOS"));
  base_options_list.push(new UserAgent("iPad", "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25", "Apple, Inc.", "iPad", true, "iOS"));
  base_options_list.push(new UserAgent("Android KitKat", "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36", "", "AND", true, "Android"));
  base_options_list.push(new UserAgent("Windows Phone 8", "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)", "", "WP7", true, "Windows Phone"));
  if (hard_reset) {
    _getUserAgentList(function(list) {
      var key_list = [];
      for (var i = 0; i < list.length; i++) {
        key_list.push(list[i].key);
      }
      if (key_list && key_list.length > 0)
        getStorageLocation().remove(key_list, function() {
          getStorageLocation().remove(CUSTOM_OPTIONS_IDENTIFIER, function() {
            _addMultipleUserAgents(base_options_list, callback);
          });
        });
      else
        _addMultipleUserAgents(base_options_list, callback);
    });
  }
  callback(base_options_list);
}

function __addBaseOption(option_list) {
  if (!option_list || option_list.length == 0)
    return;
  _addUserAgent(option_list.pop(), function() { 
    __addBaseOption(option_list);  
  });
}

function addCustomUAOption(name, user_agent, append_to_default_ua, indicator, group, callback) {
  var new_user_agent = new UserAgent(name, user_agent, "", indicator, false, group);
  new_user_agent.append_to_default_ua = append_to_default_ua;
  _addUserAgent(new_user_agent, callback);
}

function deleteCustomUAOption(name, callback) {
  _getUserAgentList(function(options_list) {
    for (var i = 0; i < options_list.length; i++) {
      if (options_list[i].title == name) {
      _deleteUserAgentByKey(options_list[i].key, callback);
      break;
      }
    }
  });
}

// For legacy support.  Probably no longer needed.
function isRemovable(user_agent) {
  return (!isDefault(user_agent));  
}

function getDisplayUserAgentString(user_agent) {
  return (user_agent.ua_string == "" ? "[Use default User-agent string]" : user_agent.ua_string);
}
  
function getDisplayAppendOrReplaceString(user_agent) {
  return (user_agent.ua_string == "" ? "N/A" : (user_agent.append_to_default_ua ? "Append" : "Replace"));
}

function guessUserAgentGroup(str) {
  if (!str)
    return "";
  // If there is no group defined, guess one.
  var guesses = [["Chrome", "Chrome"],
                 ["Firefox", "Firefox"],
                 ["Opera", "Opera"],
                 ["Safari", "Safari"],
                 ["IE", "Internet Explorer"],
                 ["Internet Explorer", "Internet Explorer"],
                 ["iPhone", "iPhone"],
                 ["iPad", "iPad"],
                 ["iOS", "iOS"]];
  for (var i = 0; i < guesses.length; i++) {
    if (str.toUpperCase().indexOf(guesses[i][0].toUpperCase()) > -1)
      return guesses[i][1];
  }
  return "";
}

function getUserAgentGroup(user_agent) {
  if (!user_agent)
    return "";
  if (user_agent.group)
    return user_agent.group;
  return "";
}

// Given a string of JSON, if it is well formed as determined by
// schema.json, import the settings.
// Does not overwrite local settings.
function importJson(raw_data, callback) {
  try {
    var result = JSON.parse(raw_data);
    // Read in UserAgents
    var user_agents = result["UserAgents"];
    var hash = {};
    if (user_agents && user_agents.length > 0) {
      _getUserAgentList(function(options) {
        // Make sure we don't keep importing the same object repeatedly.
        // Make a hash of all existing options and if there is a collision with
        // items to import, don't import it.
        for (var i = 0; i < options.length; i++)
          hash[options[i].ua_string] = "1";
        var list_to_add = [];
        for (var j = 0; j < user_agents.length; j++) {
          // Don't test for user_agent.append, because it's boolean and
          // could be false.
          if (user_agents[j].title &&
              user_agents[j].ua_string &&
              user_agents[j].badge) {
            var ua = new UserAgent(user_agents[j].title,
                                   user_agents[j].ua_string,
                                   user_agents[j].vendor,
                                   user_agents[j].badge,
                                   false,                   
                                   user_agents[j].group);
            ua.append_to_default_ua = user_agents[j].append_to_default_ua;
            ua.is_managed = false;
            if (!hash[ua.ua_string]) {
              hash[ua.ua_string] = "1";
              list_to_add.push(ua);
            }
          } else {
            console.log("Ignoring incomplete user agent entry " + user_agents[j].title);
          }
        }
       _addMultipleUserAgents(list_to_add, callback());
      });
    }

    var permanent_spoofs = result["PermanentSpoofs"];
    hash = new Array();
    if (permanent_spoofs && permanent_spoofs.length > 0) {
      _getSpoofList(function(spoofs) {
        // Make sure we don't keep importing the same object repeatedly.
        // Make a hash of all existing options and if there is a collision with
        // items to import, don't import it.
        for (var i = 0; i < spoofs.length; i++)
          hash[spoofs[i].domain + " " + spoofs[i].user_agent.ua_string] = "1";
        var list_to_add = [];
        for (var j = 0; j < permanent_spoofs.length; j++) {
          // Don't test for user_agent.append, because it's boolean and
          // could be false.
          if (permanent_spoofs[j].domain &&
              permanent_spoofs[j].user_agent &&
              permanent_spoofs[j].user_agent.title &&
              permanent_spoofs[j].user_agent.ua_string &&
              permanent_spoofs[j].user_agent.vendor &&
              permanent_spoofs[j].user_agent.badge) {
            var ua = new UserAgent(permanent_spoofs[j].user_agent.title,
                                   permanent_spoofs[j].user_agent.ua_string,
                                   permanent_spoofs[j].user_agent.vendor,
                                   permanent_spoofs[j].user_agent.badge,
                                   false,                   
                                   permanent_spoofs[j].group);
            ua.append_to_default_ua = permanent_spoofs[j].user_agent.append_to_default_ua;
            ua.is_managed = false;
            var spoof = new PresetSpoof(permanent_spoofs[j].domain, ua);
            spoof.is_managed = false;
            if (!hash[spoof.domain + " " + spoof.user_agent.ua_string]) {
              hash[spoof.domain + " " + spoof.user_agent.ua_string] = "1";
              list_to_add.push(spoof);
            }
          } else {
            console.log("Ignoring incomplete spoof entry " + permanent_spoofs[j]);
          }
        }
       _addMultipleSpoofs(list_to_add, callback());
      });
    }

  } catch(err) {
    console.log("The given text was not valid JSON. Import aborted: " + err);
  }
}

// Returns a string of JSON that encapsulates all of the settings data.
// Structure will look like this, returned as a string:
// {
//  "UserAgents": [
//    {"title": "1", "ua_string": "ua_1", "vendor": "v_1", "badge": "A1", "append_to_default_ua" : false},
//    {"title": "2", "ua_string": "ua_2", "vendor": "v_2", "badge": "A2", "append_to_default_ua" : false}
//  ], 
//  "PermanentSpoofs": [
//    {"domain" : "foo.com", "user_agent": {"title": "4", "ua_string": "ua_4", "vendor": "v_4", "badge": "A4", "append_to_default_ua" : false}},
//    {"domain" : "bar.com", "user_agent": {"title": "5", "ua_string": "ua_5", "vendor": "v_5", "badge": "A5", "append_to_default_ua" : true}}
//  ]
// }
function exportJson(callback) {
  var export_obj = {};
  _getUserAgentList(function(ua_list) {
    export_obj["UserAgents"] = ua_list;
    _getSpoofList(function(spoof_list) {
      export_obj["PermanentSpoofs"] = spoof_list;
      callback(JSON.stringify(export_obj));  
    });
  });
}


// Method for pulling a long list of structured user-agent data into memory.
function importUserAgentData(raw_data, callback) {
  // Credit goes to jeffd at http://techpatterns.com/forums/about304.html for
  // posting a whole bunch of ua strings.  Thanks!
  //
  // Assume that the input consists of XML that takes the form of:
  // <useragentswitcher>
  //   <folder description="foo">
  //     <folder description="bar">
  //       <useragent description="[Name]" useragent="[UA Value]" appcodename="" appname="" appversion="" platform="" vendor="" vendorsub=""/>
  //     </folder>
  //   </folder>
  //   <separator />
  // </useragentswitcher>
  _getUserAgentList(function(options) {
    var import_count = 0;
    var duplicates = 0;
    var hash = {};
    for (var i = 0; i < options.length; i++)
      hash[options[i].ua_string] = "1";
    var list_to_add = [];
    $('useragent', raw_data).each(function() {
      var ua = new UserAgent($(this).attr("description"),  // title
                             $(this).attr("useragent"),    // ua string
                             "",                           // Vendor string
                             "X",                          // badge
                             false,                        // is preset
                             _getParentFolderName($(this).parent()));
      // Ignore the "about" group.
      if (ua.group != "UA List :: About") {
        if (hash[ua.ua_string]) {
          duplicates++;
        } else if (import_count < MAX_IMPORT_COUNT) {
          hash[ua.ua_string] = "1";
          list_to_add.push(ua);
          import_count++;
        }
      }
    });
    _addMultipleUserAgents(list_to_add, 
                           callback({"import_count": import_count,
                                     "duplicates"  : duplicates}));
  });
}

function _getParentFolderName(obj) {
  var parent_folder_name = ($(obj) && $(obj).parent().length > 0) ? _getParentFolderName($(obj).parent()) : null;
  var my_folder_name = $(obj).attr("description");
  return (parent_folder_name ? parent_folder_name + " - " + my_folder_name : (my_folder_name ? my_folder_name : null));
}

// Method for reporting errors to the hardcoded error URL.
function _reportErrors() {
  // Do an async XHR to the error reporting URL, and clear out the errors
  // from local storage.
  req = new XMLHttpRequest();
  req.open("POST", error_url, true);
  
  req.setRequestHeader("Accept", "text/plain");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200 || req.responseText) {
        try {
          var result = JSON.parse(req.responseText);
          console.log("Error reporting succeeded");
          clearErrors();
        } catch(err) {
          console.log("Update failed: " + err);
          console.log("response text:" + req.responseText);
        }
      } else {
        console.log("Update failed.  Will re-attempt later.");
      }
    }
  };
  var error_string = "cv=" + _getChromeVersion() +
                     "&ev=" + chrome.app.getDetails().version + "&";
  var errors = getErrors();
  var count = 0;
  for (var error_code in ERROR_CODES) {
    if (errors[error_code]) {
      error_string = error_string + error_code + "=" + errors[error_code] + "&";
      count++;
    }
  }
  if (!count)
    return;
  console.log("error string is" + error_string);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send(error_string);  
}

function _getChromeVersion() {
  // Look for the regular expression of "Chrome/....." in the user-agent.
  var pattern = new RegExp("Chrome/[0-9\\.]*");
  return pattern.exec(window.navigator.userAgent);
}

// TODO(gwilson): remove this, deprecated.
function getPresets() {
  // Check if we should look for updates.
  if (shouldUsePresets()) {
    // Update if our last attempt was at least a day ago.
    var my_date = new Date();
    my_date.setDate(my_date.getDate() - 1);
    if (!last_update_time || my_date > last_update_time) {
      last_update_time = new Date();
      // Update the preset list here
    }
  }
  // Return the preset list here?
}

// Given a user-agent string, returns what badge should appear.
function getBadge(user_agent, callback) {
  if (!user_agent || user_agent == "")
    callback("");
  _getUserAgentList(function(user_agent_list) {
    for (var i = 0; i < user_agent_list.length; i++) {
      if (user_agent_list[i].ua_string == user_agent) {
        callback(user_agent_list[i].badge);
        return;
      }
    }
    callback("");
    return;
  });
}

function _addOption(domain, user_agent_key, callback) {
  console.log("Adding new preset spoof with key of " + user_agent_key );
  _getUserAgentList(function(list) {
    var user_agent = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].key == user_agent_key) {
        user_agent = list[i];
      }
    }
    if (!user_agent || user_agent == "") {
      user_agent = new UserAgent("", "", "", "", true, "");
    }
    console.log("Adding new preset spoof with " + user_agent );
    _addSpoof(new PresetSpoof(domain, user_agent), callback);
  });
}

// Determines if the given match pattern fits with the given URL.
function _isApplicableMatch(match_pattern, url) {
  if (!url)
    return false;
  var domain = findHostname(url);
  var pattern_is_domain = isDomainName(match_pattern);
  var pattern = new RegExp(match_pattern);
  return ((!pattern_is_domain && pattern.test(url)) ||  // If the pattern is not a hostname, match it anywhere.
          pattern.test(domain) ||
          match_pattern == domain ||
          match_pattern == url ||
          (pattern_is_domain && domain.indexOf(match_pattern) > -1)); // If the pattern is a hostname, match it anywhere only in the url's hostname.
}

// Returns only the FIRST permanent spoof match for a given URL.
// This means if the user adds 10 spoofs for a given URL,
// this will return the first one it finds, and the other 9 will
// be ignored.
function getSpoofValuesForUrl(url, callback) {
  if (!url) {
    callback(null);
    return;
  }
  _getSpoofList(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (url && list[i] && list[i].domain && list[i].user_agent &&
          _isApplicableMatch(list[i].domain, url)) {
        callback(list[i].user_agent);
        return;
      }
    }
    callback(null);
  });
}

// Is the user agent the "default" user agent (i.e. the normal browser UA)
function isDefault(user_agent) {
  return (!user_agent || (user_agent.ua_string == ""));
}

// Returns the configuration values for the given url given a tab.
// Returns a UserAgent object.
function getSpoofValues(url, callback) {
  getPermanentSpoofOverride(function (permanent_override) {
    chrome.tabs.getSelected(function(tab) {
      getHotlist(tab, function(hotlist) {
        getSpoofValuesForUrl(url, function(spoof) {
          var selected = (permanent_override ? (spoof ? spoof : hotlist) : (!isDefault(hotlist) ? hotlist : spoof));
          if (!selected) {
            callback({});
            return;
          }
          selected.platform = getPlatformSpoofValues(selected);
          selected.appname = getAppnameSpoofValues(selected);
          callback(selected);
        });
      });
    });
  });
}

// Returns the configuration values for the given url from our cache.
// Input is the URL, output is a user-agent object, which is null if
// no spoof is needed.
function getCacheSpoofValuesForUrl(url) {
  if (!url) {
    return null;
  }
  var list = spoof_cache;
  for (var i = 0; i < list.length; i++) {
    if (url && list[i] && list[i].domain && _isApplicableMatch(list[i].domain, url)) {
      if (list[i].user_agent && list[i].user_agent.ua_string) {
        return list[i].user_agent;
      } else if ((typeof list[i].user_agent) == "string") {
        return new UserAgent("", list[i].user_agent, "", "", false, "");
      } else {
        return new UserAgent("", "", "", "", false, "");
      }
    }
  }
  return null;
}

// Returns the configuration values for the given url from our cache.
// Input is the URL and tab, output is a user-agent object, which is null if
// no spoof is needed.
function getCacheSpoofValues(url, tabId) {
  var list = user_agent_cache;
  var hotlist_index = getHotlistIndexById(tabId);
  var hotlist = null;
  for (var i = 0; (i < user_agent_cache.length && !hotlist); i++) {
    if (user_agent_cache[i].key == hotlist_index)
      hotlist = user_agent_cache[i];
  }
  if (isDefault(hotlist)) {
    hotlist = null;
  }
  var spoof = getCacheSpoofValuesForUrl(url);
  var selected = (permanent_override_cache ? (spoof ? spoof : hotlist) : (hotlist ? hotlist : spoof));
  if (selected) {
    selected.platform = getPlatformSpoofValues(selected);
    selected.appname = getAppnameSpoofValues(selected);
  }
  return selected;
}

// Given a UserAgent object, try to infer the platform spoof needed.
function getPlatformSpoofValues(user_agent) {
  // Loop through all platforms and attempt to deduce which one to spoof.
  for (var key in PLATFORM_SPOOF) {
    if (user_agent && user_agent.ua_string &&
        user_agent.ua_string.indexOf(key) > -1)
      return PLATFORM_SPOOF[key];
  }  
  return null;
}

// Given a UserAgent object, try to infer the navigator.appname spoof needed.
// Firefox and Chrome typically return 'Netscape' and
// IE returns 'Microsoft Internet Explorer'.
function getAppnameSpoofValues(user_agent) {
  if (user_agent && user_agent.ua_string &&
      user_agent.ua_string.indexOf("MSIE") > -1)  // TODO: make this smarter.
    return "Microsoft Internet Explorer";
  return "Netscape";  
}

// Updates the badge on the browserAction given the current active tab.
function updateBadge(tab) {
  if (tab)
    getSpoofValues(tab.url, function(values) {
      var badge = "";
      if (values && values.badge && values.badge != "") {
        badge = values.badge;
      }
      chrome.browserAction.setBadgeText({tabId:tab.id, text:badge});
    });
}
