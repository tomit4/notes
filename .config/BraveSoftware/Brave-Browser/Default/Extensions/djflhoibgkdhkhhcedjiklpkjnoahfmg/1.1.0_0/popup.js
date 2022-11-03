// Get the list of standard options.
function refreshView() {
  getOptionsByGroup(buildTables);
}

$(window).load(refreshView);

function refreshSelected() {
  chrome.tabs.getSelected(function(tab) {
    var ua_index = getHotlistIndexById(tab.id);
    $('td').removeClass("popup_selected");
    if (ua_index) {
      $('td#ua_row_' + ua_index).addClass("popup_selected");
      _getUserAgentByKey(ua_index, function(user_agent) {
        $('td#ua_row_' + getUserAgentGroup(user_agent)).addClass("popup_selected");
      });
    }
  });
}

function setCurrent(ua_index)  {
  chrome.tabs.getSelected(function(tab) {
    setHotlist(tab, ua_index);
    updateBadge(tab);
    if (tab) {
      chrome.tabs.reload(tab.id, {"bypassCache":true}, function() {})
      chrome.tabs.update(tab.id, {selected:true});
    }
    refreshSelected();
  });
}

function addPermanentSpoof()  {
  chrome.extension.sendRequest({action: "add_preset"}, function(response) {});
  refreshSelected();
}


function _newRow(title, value, right_icon, index) {
  var td = document.createElement("td");
  var a = document.createElement("a");
  td.setAttribute("class", "popup_item");
  a.appendChild(document.createTextNode(title));
  td.setAttribute("id", "ua_row_" + index);
  td.appendChild(a);
  var tr = document.createElement("tr");
  tr.appendChild(td);
  if (right_icon) {
    td = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute("src", right_icon);
    td.appendChild(img);
    tr.appendChild(td);
  }  
  return tr;
}

function showSubTable(sub_table_index) {
  var sub_table = $("#sub_table_" + sub_table_index);
  sub_table.addClass("visible");
  sub_table.removeClass("invisible");
  var group_table = $("#group_table");
  group_table.addClass("invisible");
  group_table.removeClass("visible");
}

function buildTables(options_map) {
  var outer_table = $("#options_table");
  outer_table.empty();
  // Build master table of groups.
  var group_table = document.createElement("table");
  group_table.setAttribute("id", "group_table");
  outer_table.append(group_table);
  group_table = $("#group_table");
  group_table.addClass("popup_group_table");
  var index = 0;
  for (var group in options_map) {
    // For each group, build a subtable of all options
    group_table.append(_newRow( (group == "" ? "Default" : group), group, "Chevron-right.png", index));
    var group_sub_table = document.createElement("table");
    group_sub_table.setAttribute("id", "sub_table_" + index);
    outer_table.append(group_sub_table);
    $("#ua_row_" + index).click((function(index) {
                                    return function () {
                                      showSubTable(index);
                                    }
                                    })(index));
    group_sub_table = $("#sub_table_" + index);
    group_sub_table.addClass("popup_sub_table");
    var options = options_map[group];
    for (var i = 0; i < options.length; i++) {
      group_sub_table.append(_newRow(options[i].title, options[i].key, null, "" + options[i].key));
      group_sub_table.addClass("invisible");
      $("#ua_row_" + options[i].key).click((function(key) {
                                    return function () {
                                      setCurrent(key);
                                    }
                                    })(options[i].key));
    }
    index++;
  }
  // if there is only one group, automatically show it.
  if (index == 1)
    showSubTable(0);
    
  /*
  chrome.extension.sendRequest({action: "show_permanent_option"},
                               function(response) {
                                if (response && response.show && response.show == "true") {
                                  $("#group_table").append(getAddOptionRow());
                                  $('#add_spoof').click(
                                    function() {
                                      addPermanentSpoof();
                                      refreshSelected();
                                    }
                                  );
                                }
                                $("#group_table").append(getShowOptionsRow());
                                });
  */
  refreshSelected();
}

function getAddOptionRow() {
  var td = document.createElement("td");
  td.setAttribute("class", "popup_item");
  var a = document.createElement("a");
  a.appendChild(document.createTextNode("Add Permanent Spoof"));
  a.setAttribute("id", "add_spoof");
  a.setAttribute("href", "#");
  td.appendChild(a);
  var tr = document.createElement("tr");
  tr.appendChild(td);
  return tr;
}

function getShowOptionsRow() {
  var td = document.createElement("td");
  td.setAttribute("class", "popup_item");
  var a = document.createElement("a");
  a.appendChild(document.createTextNode("Settings"));
  a.setAttribute("href", "options.html");
  a.setAttribute("target", "_new");
  td.appendChild(a);
  var tr = document.createElement("tr");
  tr.appendChild(td);
  return tr;
}

