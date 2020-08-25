$('#typeItem').val('');
const itemTable = [];
$('#typeItem').keyup((event) => {
  if (event.which == '13') {
    if ($('#typeItem').val() == '') {
      validation(0);
    } else if ($('#typeItem').val().startsWith(' ') == true) {
      validation(1);
    } else if (itemTable.indexOf($('#typeItem').val()) >= 0) {
      validation(2);
    } else {
      const itemBody = $('#typeItem').val();
      addingItem($('#typeItem').val());
      $('#typeItem').val('');
    }
  }
});

$(window).resize(() => {
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
  const slipMainList = document.getElementById('mainList');
  slipMainList.addEventListener('slip:swipe', (e) => {
    if (isDone(e.target) == true) {
      e.target.parentNode.removeChild(e.target);
      deletingItem(e.target);
    } else alert('This item is not ready!');
  });
  slipMainList.addEventListener('slip:reorder', (e) => {
    e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
  });

  new Slip(slipMainList);
}

$('#cross').click(() => {
  $('#typeItem').slideToggle('slow');
});

function validation(errCode) {
  $('#typeItem').val('');
  switch (errCode) {
    case 0:
      $('#typeItem').attr('placeholder', 'Value is empty!');
      flashError();
      break;
    case 1:
      $('#typeItem').attr('placeholder', 'Value starts with space!');
      flashError();
      break;
    case 2:
      $('#typeItem').attr('placeholder', 'Value is already in the list!');
      flashError();
      break;
  }
}

function flashError() {
  $('#typeItem').fadeOut(100).fadeIn(100).fadeOut(100)
    .fadeIn(100);
  setTimeout(() => {
    $('#typeItem').attr('placeholder', 'Tape your item here...');
  }, 800);
}

function addingItem(item) {
  const element = $('<li></li>').text(item);
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

function isDone(item) {
  if ($(item).hasClass('itemDone')) return true;
  return false;
}
function addingDelButton(appToThis) {
  const delButton = $('<span>✕</span>');
  $(delButton).attr('id', 'delButton');
  $(delButton).attr('onclick', 'deletingItem(this.parentElement)');
  $(delButton).prependTo(appToThis);
}

function deletingItem(itemToDelete) {
  if ($(itemToDelete).hasClass('itemDone')) {
    let deleter = itemToDelete.textContent;
    deleter = deleter.substr(0, deleter.length);
    itemTable.splice(itemTable.indexOf(deleter), 1);
    $(itemToDelete).remove();
  } else {
    alert('This item is not ready!');
  }
}

function checkMobile() {
  if (window.innerWidth < window.innerHeight) return true;
  return false;
}
