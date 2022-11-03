var preset_options = [];

$(window).load(function() {
  restoreOptions();
  
  $('#menu_ua').click(function() {
    restoreOptions();
    menuItemChange($('#custom_ua_table'), $(this));
  });
	
  $('#menu_spoof').click(function() {
    restoreOptions();
    menuItemChange($('#permanent_spoof_table'), $(this));
  });
	
  $('#menu_other').click(function() {
    menuItemChange($('#other_settings_table'), $(this));
  });
	
  $('#menu_about').click(function() {
    menuItemChange($('#about_table'), $(this));
  });

  getIsOtherSettingsManaged(function(managed){
    if (managed) {
      $('#menu_import').hide();
      $('#menu_other').hide();
    } else {
      $('#menu_import').show();
      $('#menu_other').show();      
    }
  });
  
  $('#menu_import').click(function() {
    menuItemChange($('#import_table'), $(this));
  });

  $('#report_errors').change(function() {
    saveReportErrorsCheckbox();
  });

  $('#sync').change(function() {
    saveUseSyncCheckbox();
  });

  $('#permanent_override').change(function() {
    savePermanentOverrideCheckbox();
  });
  
  $('#resetter').click(function() {
    resetHardcodedUserAgents();
  });

  $('#spoof_per_tab').change(function() {
    saveSpoofPerTabCheckbox();
  });
  
  menuItemChange($('.menu_controlled:first'), $('.menuitem:first'));
});

function saveReportErrorsCheckbox() {
  setReportErrors($("#report_errors").prop("checked"));
  getReportErrors(function(report) {
    if (report)
      setStatus("Now sending anonymous error reports.");
    else
      setStatus("Now no longer sending anonymous error reports.");
  });
}

function saveSpoofPerTabCheckbox() {
  setSpoofPerTab($("#spoof_per_tab").prop("checked"));
  getSpoofPerTab(function(spoof) {
  setStatus((spoof ? "Spoofs set in the menu bar will now only affect the current tab." :
	                "Spoofs set in the menu bar will now affect all tabs."));
  });

}

function saveUseSyncCheckbox() {
  if($("#sync").prop("checked")) {
		// Was not using Sync, but decided to use it now.
	  _syncDataAcrossStorageLocations(chrome.storage.local, chrome.storage.sync, function () {
			setUseSync(true);
			restoreOptions();
		});
	} else {
	  // Was using Sync, but decided to stop.
	  _syncDataAcrossStorageLocations(chrome.storage.sync, chrome.storage.local, function () {
			setUseSync(false);
			restoreOptions();
		});		
	}
}

function refreshSpoofPerTabCheckbox() {
  getSpoofPerTab(function(spoof) {
    $("#spoof_per_tab").prop("checked", spoof);
  });
  getSpoofPerTabManaged(function(managed) {
    if (managed != null) {
      $("#spoof_per_tab").prop("disabled", true);
    }
  });
}

function refreshReportErrorsCheckbox() {
  getReportErrors(function(report) {
    $("#report_errors").prop("checked", report);
  });
  getSendErrorsManaged(function(managed) {
    if (managed != null) {
      $("#report_errors").prop("disabled", true);
    }
  });
}

function refreshUseSyncCheckbox() {
  $("#sync").prop("checked", getUseSync());
}

function savePermanentOverrideCheckbox() {
  setPermanentSpoofOverride($("#permanent_override").prop("checked"));
  getPermanentSpoofOverride(function(override) {
  setStatus((override ? "Permanent spoofs now always override fast-switch." :
	                "Permanent spoofs now do not override the fast-switch."));
  });
}

function refreshPermanentOverrideCheckbox() {
  getPermanentSpoofOverride(function(override) {
    $("#permanent_override").prop("checked", override);
  });
  getSpoofOverrideManaged(function(managed) {
    if (managed != null) {
      $("#permanent_override").prop("disabled", true);
    }
  });
}

function refreshStorageUsed() {
  getPercentOfStorageUsed(function(percent) {
		$("#menu_storage_used").empty();
		$("#menu_storage_used").toggleClass("error", (percent > 0.99));
		var meter = document.createElement("meter");
		meter.setAttribute("value", percent);
		meter.appendChild(document.createTextNode(""+Math.ceil(percent * 100)+"% of storage used"));
		$("#menu_storage_used").append(document.createTextNode("Storage Space"));
		$("#menu_storage_used").append(document.createElement("br"));
		$("#menu_storage_used").append(meter);
	});
}

function resetHardcodedUserAgents() {
  getIsUserAgentManaged(function(managed) {
    if (!managed) {
      setUseSync(false);
      resetEverything(function() {
          getBaseOptionsList(true, function() {restoreOptions();});
          menuItemChange($('.menu_controlled:first'), $('.menuitem:first'));
	});
    }
  });
}

function guessGroup() {
  if ($("#add_ua_group").val() == "") {
    var guess = guessUserAgentGroup($("#add_ua_user_agent").val());
    if (guess != "")
      $("#add_ua_group").attr("value", guess);
    else {
      guess = guessUserAgentGroup($("#add_ua_name").val())
      if (guess != "")
        $("#add_ua_group").attr("value", guess);
    }
  }
}

function setStatus(status) {
  $("#status").text(status);
}

function addOption() {
  if ($("#add_domain").val() == "") {
    setStatus("All fields are required.");
    $("#add_domain").toggleClass("error", true);
    $("#add_ua").toggleClass("error", true);
    return;
  }

  _addOption(document.getElementById("add_domain").value,
		     $("#options").val(),
		     function() {
	       restoreOptions();
		setStatus("Blacklist entry added.");
		$("#add_domain").attr("value", "");
		$("#add_ua").attr("value", "");
	     });
}


// Adds the option currently entered into the input fields to the list of
// custom user-agents.
function addUAOption() {

  if ($("#add_ua_name").val() == "" ||
      $("#add_ua_user_agent").val()  == "" ||
      $("#add_ua_indicator").val()  == "") {

    setStatus("All fields are required.");

    $("#add_ua_name").toggleClass("error", true);
    $("#add_ua_user_agent").toggleClass("error", true);
    $("#add_ua_indicator").toggleClass("error", true);
    return;
  }
  addCustomUAOption($("#add_ua_name").val(),
                    $("#add_ua_user_agent").val(),
                    ($("#add_ua_is_append").val() == "true"),
                    $("#add_ua_indicator").val(),
                    $("#add_ua_group").val(), 
                    function() {
	                  restoreOptions();
	                });
}

function populateTextFromDropdown() {
  $("#add_ua").attr("value", $('#options option:selected').val());
}

function refreshUserAgentDropDown() {
  _getUserAgentList(function(preset_options) {
    var select = $("#options");
    if (select) {
      while (select.children().length > 1) {
        select.removeChild(select.lastChild);
      }
      for (var i = 0; i < preset_options.length; i++) {
        if (preset_options[i].ua_string != "") {
          var option = document.createElement("option");
          option.setAttribute("value", preset_options[i].key);
          option.appendChild(document.createTextNode(preset_options[i].title));
          select.append(option);
        }
      }
    }
  });
}

function refreshUserAgentOptions(managed) {
  getOptionsByGroup(function(options_map) {
    var table = $("#ua_list_table");
    table.empty();
    var group_index = 0;
    for (group in options_map) {
      group_index = group_index + 1;
      table.append(getUATitleRow( (group == "" ? "[No group]" : group) ));
      var list = options_map[group];
      var sub_table = document.createElement("table");
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(sub_table);
      tr.appendChild(td);
      table.append(tr);
      sub_table.setAttribute("id", "ua_list_sub_table_" + group);
      sub_table.setAttribute("class", "ua_list_sub_table");
      for (var i = 0; i < list.length; i++) {
	var deletebutton = document.createElement("div");
	// If the user cannot modify this row, do not give any editable elements.
	if (managed || list[i].is_managed || !isRemovable(list[i])) {
	  sub_table.appendChild(_newRow([document.createTextNode(list[i].title),
		 document.createTextNode(getDisplayUserAgentString(list[i])),
		 document.createTextNode(getDisplayAppendOrReplaceString(list[i])),
		 document.createTextNode(list[i].badge),
		 ( isRemovable(list[i]) ? deletebutton : document.createTextNode(""))]));
	} else {
	  sub_table.appendChild(_newRow([_getHidingTextBox(list[i].title, "text_ua_title_" + list[i].key, list[i].key),
		 _getHidingTextBox(getDisplayUserAgentString(list[i]), "text_ua_string_" + list[i].key, list[i].key),
		 document.createTextNode(getDisplayAppendOrReplaceString(list[i])),
		 document.createTextNode(list[i].badge),
		 ( isRemovable(list[i]) ? deletebutton : document.createTextNode(""))]));
	  $('#' + "text_ua_title_" + list[i].key).blur( (function(key, field) { return function() { _editUserAgentTitle(key, field); }})(list[i].key, "text_ua_title_" + list[i].key));
	  $('#' + "text_ua_string_" + list[i].key).blur( (function(key, field) { return function() { _editUserAgentString(key, field); }})(list[i].key, "text_ua_string_" + list[i].key));
	}
	if (!list[i].is_managed && !managed) { 
	  deletebutton.setAttribute("class", "deletebutton");
	  deletebutton.setAttribute("border", "0");
	  deletebutton.setAttribute("alt", "delete");
	  deletebutton.setAttribute("id", "delete_preset_" + group_index + "_" + i);
	  $('#delete_preset_' + group_index + '_' + i).click((function(index, is_preset) {
	    return function() {
	      deleteUAOption(index);
	    }
	  })(list[i].title, list[i].is_preset));
	}
      }
    }
  });
}

function _getHidingTextBox(text, id, key, on_edit_function) {
  var box = document.createElement("input");
  box.setAttribute("class", "hidingbox");
  box.setAttribute("id", id);
  box.setAttribute("value", text);
  box.setAttribute("key", key);
  return box;
}

function _editUserAgentTitle(key, field) {
  console.log("editing field " + field);
  _getUserAgentByKey(key, function(user_agent) {
    if (user_agent) {
      user_agent.title = $('#' + field).attr("value");
    }
    _editUserAgent(user_agent, function() { setStatus("User-agent edited.");});
  });
}

function _editUserAgentString(key, field) {
  console.log("editing field " + field);  
  _getUserAgentByKey(key, function(user_agent) {
    if (user_agent) {
      user_agent.ua_string = $('#' + field).attr("value");
    }
    _editUserAgent(user_agent, function() { setStatus("User-agent edited.");});
  });
}

function getUATitleRow(group_name) {
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  td.setAttribute("class", "ua_title_row");
  td.appendChild(document.createTextNode(group_name));
  tr.appendChild(td);
  return tr;
}

function _getOptionsDropdown() {
  var select = document.createElement("select");
  select.setAttribute("id", "options");
  var option = document.createElement("option");
  option.setAttribute("value", "");
  option.appendChild(document.createTextNode("[Default]"));
  select.appendChild(option);
  return select;
}

function _newRow(nodes) {
  var tr = document.createElement("tr");
  for (var i = 0; i < nodes.length; i++) {
    if (!nodes[i])
      continue;
    var td = document.createElement("td");
    td.appendChild(nodes[i]);
    tr.appendChild(td);
  }
  return tr;
}

function addTitleRow() {
  var row = _newRow([document.createTextNode("Domain"), 
                    document.createTextNode("User-Agent String"),  
                    document.createTextNode(""),
                    document.createTextNode("")]);
  row.setAttribute("class", "title");
  return row;
}

function addUATitleRow() {
  var row = _newRow([document.createTextNode("New User-agent name"), 
                    document.createTextNode("New User-Agent String"),  
                    document.createTextNode("Group"),
                    document.createTextNode("Append?"),
                    document.createTextNode("Indicator Flag"),
                    document.createTextNode("")]);
  row.setAttribute("class", "title");
  return row;
}

function addNewEntryRow() {
  var add_ua = document.createElement("input");
  var add_vendor = document.createTextNode("");
  var add_domain = document.createElement("input")
  add_ua.setAttribute("id", "add_ua");
  add_ua.setAttribute("type", "hidden"); // This is here for testing.
  add_domain.setAttribute("id", "add_domain");

  var addbutton = document.createElement("input");
  addbutton.type = "button";
  addbutton.setAttribute("id", "add_entry_button");
  addbutton.value = "Add";

  var span = document.createElement("span");
  span.appendChild(add_ua);
  span.appendChild(_getOptionsDropdown());

  return _newRow([add_domain, span, add_vendor, addbutton]);
}

function addNewUAEntryRow() {
  var add_ua_name = document.createElement("input");
  var add_ua_indicator = document.createElement("input");
  var add_ua_is_append = document.createElement("select");
  var add_ua_user_agent = document.createElement("input");
  var add_ua_group = document.createElement("input");
  add_ua_name.setAttribute("id", "add_ua_name");
  add_ua_indicator.setAttribute("id", "add_ua_indicator");
  add_ua_user_agent.setAttribute("id", "add_ua_user_agent");
  add_ua_indicator.setAttribute("maxlength", "3");
  add_ua_indicator.setAttribute("size", "3");
  add_ua_is_append.setAttribute("id", "add_ua_is_append");
  add_ua_group.setAttribute("id", "add_ua_group");
  var add_ua_is_append_replace_option = document.createElement("option");
  add_ua_is_append_replace_option.setAttribute("value", "false");
  add_ua_is_append_replace_option.appendChild(document.createTextNode("Replace"));
  add_ua_is_append.appendChild(add_ua_is_append_replace_option);
  var add_ua_is_append_append_option = document.createElement("option");
  add_ua_is_append_append_option.setAttribute("value", "true");
  add_ua_is_append_append_option.appendChild(document.createTextNode("Append"));
  add_ua_is_append.appendChild(add_ua_is_append_append_option);
  
  var addbutton = document.createElement("input");
  addbutton.type = "button";
  addbutton.setAttribute("id", "add_ua_button");
  addbutton.value = "Add";

  return _newRow([add_ua_name,
                 add_ua_user_agent,
                 add_ua_group,
                 add_ua_is_append,
                 add_ua_indicator,
                 addbutton]);
}

function deleteOption(domain) {
  _getSpoofList(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].domain == domain) {
	_deleteSpoofByKey(list[i].key, function() {restoreOptions();});
	setStatus("Spooflist entry deleted.");
	//chrome.extension.sendRequest({action: "update"}, function(response) {});  
      }
    }
  });
}

function deleteUAOption(name, is_base_option) {
  deleteCustomUAOption(name, function() {restoreOptions()});
}


// Regenerates the current view from the saved state.
function restoreOptions() {
  _getSpoofList(function(list) {

    var table = $("#list_table");
    table.replaceWith(document.createElement("table"));

    table = $("#tablecontainer table");
    table.prop("id", "list_table");
    table.append(addTitleRow());
    getIsSpoofManaged(function(managed) {
      if (!managed) {
	table.append(addNewEntryRow());
	$('#add_entry_button').click(function() {
	  addOption();
	});
    
	$('#options').change(function() {
	  populateTextFromDropdown();
	});
      }

      for (var i = 0; i < list.length; i++) {
	var entry = list[i];
	var deletebutton = document.createElement("div");
	var testbox = $("<div id='spoof_" + entry.key + "'>" + entry.domain + "</div>");
	$(testbox).hover(function(event) {
	    $(testbox).toggleClass("invisible");
	  
	  }, function(event) {
	    $(testbox).toggleClass("invisible");
	    
	  });
	
	var tr = _newRow([document.createTextNode(entry.domain),
		       document.createTextNode(( (!entry.user_agent || !entry.user_agent.ua_string) ? "[Default]" : entry.user_agent.ua_string)),
		       document.createTextNode(""),
		       null,
		       deletebutton]);
	table.append(tr);
	if (list[i] && !list[i].is_managed && !managed) {
	  deletebutton.setAttribute("alt", "delete");
	  deletebutton.setAttribute("id", "delete_" + i);
	  deletebutton.setAttribute("border", "0");
	  deletebutton.setAttribute("class", "deletebutton");
	  $('#delete_' + i).click((function(index){
	    return function() {
	     deleteOption(index); 
	    }
	  })(entry.domain)
	  );
	}
      }
      getIsUserAgentManaged(function(managed) {

	table = $("#ua_add_table");
	table.empty();
	var extra_row = addUATitleRow();
	extra_row.setAttribute("class", "ua_list_sub_table");
	table.append(extra_row);
	if (!managed) {
	  extra_row = addNewUAEntryRow();
	  extra_row.setAttribute("class", "ua_list_sub_table");
	  table.append(extra_row);
	  $('#add_ua_button').click(function() {
	    addUAOption();
	  });
	  $('#add_ua_user_agent').change(function() {
	    guessGroup();
	  });
	  $('#add_ua_name').change(function() {
	    guessGroup();
	  });
	}
	refreshUserAgentOptions(managed);
	refreshUserAgentDropDown();
	refreshReportErrorsCheckbox();
	refreshSpoofPerTabCheckbox();
	refreshUseSyncCheckbox();
	refreshPermanentOverrideCheckbox();
	refreshStorageUsed();
	$("#local_file_import").change(handleFileSelect);
        exportJson(function(text) {
          $("#export_button").prop("href", 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
        });
      });
    });
  });
}

function _makeTable(id) {
  var table = document.createElement("table");
  table.setAttribute("id", id);
  return table;
}

function menuItemChange(item_to_show, item_to_highlight) {
  $('.menu_controlled').addClass("invisible");  
  item_to_show.removeClass("invisible");
  
  $('.menuitem').removeClass("selected");
  item_to_highlight.addClass("selected")
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
	// Guess file format based on file name.
	if(theFile.name.endsWith("json")) {
  	  importJson(e.target.result, function() {
	    $("#import_result").empty();
	    $("#import_result").append(document.createTextNode("JSON configuration file loaded."));
	    setStatus("JSON file import complete.");
	    restoreOptions();
	  });
	} else if (theFile.name.endsWith("xml") ) {
	  // Not valid JSON.  try the XML import instead.
	  importUserAgentData(e.target.result, function(result) {
	    $("#import_result").empty();
	    if (result["import_count"] == 0 && result["duplicates"] == 0)
	      $("#import_result").append("No user-agent strings found.  Please be sure this is the correct XML format mentioned above.");
	    else
	      $("#import_result").append(document.createTextNode("Result: " + result["import_count"] + " imported successfully, " + result["duplicates"] + " duplicates removed."));
	    restoreOptions();
	  });	  
	} else {
          $("#import_result").empty();
	  $("#import_result").append("The file provided does not end in '.xml' or '.json'.  Please rename the file and try again.");
	  setStatus("Did not import.");
	}
      };
    })(f);
    reader.readAsText(f);
  }
}
