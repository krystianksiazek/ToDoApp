$('#typeItem').val("");
var itemTable = [];
$('#typeItem').keyup(function(event) {
  if (event.which == '13') {
    if ($('#typeItem').val() == "") {
      validation(0);
    } else if ($('#typeItem').val().startsWith(" ") == true) {
      validation(1);
    } else if (itemTable.indexOf($('#typeItem').val()) >= 0) {
      validation(2);
    } else {
      var itemBody = $('#typeItem').val();
      addingItem($('#typeItem').val());
      $('#typeItem').val("");
    }
  }
});

function validation(errCode) {
  $('#typeItem').val("");
  switch (errCode) {
    case 0:
      $('#typeItem').attr("placeholder", "Value is empty!");
      flashError();
      break;
    case 1:
      $('#typeItem').attr("placeholder", "Value starts with space!");
      flashError();
      break;
    case 2:
      $('#typeItem').attr("placeholder", "Value is already in the list!");
      flashError();
      break;
  }
}

function flashError() {
  $('#typeItem').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(function() {
    $('#typeItem').attr("placeholder", "Tape your item here...");
  }, 800);
}

function addingItem(item) {
  var element = $("<li></li>").text(item);
  $(element).appendTo('#mainList');
  $(element).attr('id', item);
  $(element).addClass('oneItem');
  $(element).attr('onclick', 'markDone(this)');
  itemTable.push(item);
  addingDelButton(element);
}

$('li').hover(
  function() {
    $(this).append($("<span> ***</span>"));
  },
  function() {
    $(this).find("span").last().remove();
  }
);

function markDone(item) {
  $(item).toggleClass('itemDone');
}

function addingDelButton(appToThis) {
  var delButton = $("<span></span>").text("x");
  $(delButton).attr('id', 'delButton');
  $(delButton).attr('onclick', 'deletingItem(this.parentElement)');
  $(delButton).appendTo(appToThis);
}

function deletingItem(itemToDelete) {
  var deleter = itemToDelete.textContent;
  deleter = deleter.substr(0, deleter.length-1);
  itemTable.splice(itemTable.indexOf(deleter), 1);
  $(itemToDelete).remove();
}
