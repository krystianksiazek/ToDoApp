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

$(window).resize(function() {
  mobileOnOff();
});

function mobileOnOff() {
  if (checkMobile() == true) {
    $('span').hide();
    $('li').css('padding-left', '10px');
  } else {
    $('span').show();
    $('li').css('padding-left', '0');
  }
}

if (checkMobile() == true) {
  var slipMainList = document.getElementById('mainList');
  slipMainList.addEventListener('slip:swipe', function(e) {
    e.target.parentNode.removeChild(e.target);
    deletingItem(e.target);
  });
  slipMainList.addEventListener('slip:reorder', function(e) {
    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
  });

  new Slip(slipMainList);
}

$('.fa-plus').click(function() {
  $('#typeItem').slideToggle("slow");
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
  $(element).attr('ondblclick', 'markDone(this)');
  itemTable.push(item);
  addingDelButton(element);
  mobileOnOff();
}

function markDone(item) {
  $(item).toggleClass('itemDone');
}

function addingDelButton(appToThis) {
  var delButton = $("<span><i class=\"fas fa-trash\"></i></span>");
  $(delButton).attr('id', 'delButton');
  $(delButton).attr('onclick', 'deletingItem(this.parentElement)');
  $(delButton).prependTo(appToThis);
}

function deletingItem(itemToDelete) {
  var deleter = itemToDelete.textContent;
  deleter = deleter.substr(0, deleter.length);
  itemTable.splice(itemTable.indexOf(deleter), 1);
  $(itemToDelete).remove();
}

function checkMobile() {
  if (window.innerWidth < window.innerHeight) return true;
  else return false;
}
