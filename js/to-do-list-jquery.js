$(document).ready(function() {
// asdfasd
  // Make table rows sortable
  $( "#itemList tbody" ).sortable();
  $( "#itemList tbody" ).disableSelection();

  // Add onclick events
  $('#addItem').on('click', addInputItem);
  $('#syncItems').on('click', syncTodoList);
  $('#deleteSelected').on('click', removeFunction('#itemList input:checked'));
  $('#deleteAll').on('click', removeFunction('#itemList input'));
  $('#showHighPriority').on('click', showPriority('high'));
  $('#showMediumPriority').on('click', showPriority('medium'));
  $('#showLowPriority').on('click', showPriority('low'));
  $('#showNoPriority').on('click', showPriority('none'));
  $('#showAllItems').on('click', function(){$("#itemList tr").show();});
  $('#itemList').on('click','.icon-remove', function() {removeItem(this)});
  $('#itemList').on('click', 'tr', function() {
    $(this).toggleClass('highlighted');
  });

  // Add keypress event
  $(document).keypress(function(e) {
    if(e.which == 13) {
        addInputItem();
    }
  });

});

function hello() {
  
}

// --------------------------------------- PARSING INPUT TEXT --------------------------------------- //  

function createTodoItem(inputText) {
  var regex = /(.+\s+)?priority:(high|medium|low)(\s+.*)?/im;
  var results = regex.exec(inputText);
  var todoObj = {};
  todoObj.priority= results == null ? 'none' : results[2];
  todoObj.text = inputText.replace(/\s*priority:(high|medium|low)\s*/im, ' ').trim();
  return todoObj;
}


// -------------------------------------- CREATING TO-DO ITEMS -------------------------------------- // 


function addCell (row, el) {
  $('<td>').appendTo(row).append(el);
}


function createPTag(todoObj) {
  return "<p data-priority='" + 
  (todoObj.priority == null ? 'none' : todoObj.priority) + "'>" + todoObj.text + "</p>";
}


// Add *NEW* to-do item (todoItem is an object)
function addTodoItem (todoItem) {

  var tr = $('<tr class="todoItem">').appendTo($('#itemList'));

  if (todoItem.text.length == 0 ) {
    return;
  }

  addCell(tr, "<input type='checkbox'>");
  addCell(tr, createPTag(todoItem));
  addCell(tr, "<img src='images/icon_remove.png' class='pull-right icon-remove'>");

}


// -------------------------------------- ADDING TO-DO ITEMS --------------------------------------- // 


// Add to-do item from text input (UI)
function addInputItem() {
  addTodoItem(createTodoItem($('#itemName').val()));
  $('#itemName').val('');
}


// Add multiple items from an array
function addMultipleItems(todoItems) {
  todoItems.forEach(function(item) {
    addTodoItem(item);
  });
}


// Sync items from JSON file
function syncTodoList() {
  $('#itemList tr').remove();
  $.getJSON("js/to-do-list-sync.json", addMultipleItems).fail(function() {
    alert("To-Do List Sync Failed");
  });
}


// --------------------------------------- DELETING ITEMS ---------------------------------------- // 


// Delete a single item (entire table row)
function removeItem (el) {
  $(el).closest('tr').fadeOut(function() {
    this.remove();
  });
}


// Delete multiple items (using selector)
function removeFunction (inputSelector) {
  return function() {
    $(inputSelector).each(function() {
      removeItem(this);
    });
  }
}


// ------------------------------------ HIDING/SHOWING ITEMS ------------------------------------- //

// Hide all items; Show priority items
function showPriority (priority) {
  return function() {
    $("#itemList tr").hide();
    $('*[data-priority="' + priority +'"]').closest('tr').show();
  }
}


// ---------------------------------- NOTES ---------------------------------- // 

//  var todoTagFunc = null; 
 //  var text = null;
 //  if ((typeof todoItem) === 'object') {
 //      todoTagFunc = function () { return createPTag(todoItem.priority, todoItem.text)};
 //      text = todoItem.text;
 //  } else {
 //    todoTagFunc = function () { return checkPriority(todoItem);};
 //    text = todoItem;
 //  }
 // if (text.length == 0) {
 //    return ;
 //  }


// Highlight entire table row
// $('#itemList').on('click','.todoItem', function() { $(this).addClass('highlighted');});