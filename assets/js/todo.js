$('#typeItem').val("");
$('#typeItem').keyup(function(event) {
  if (event.which == '13') {
    if ($('#typeItem').val() == "") {
      validation(0);
    } else if ($('#typeItem').val().startsWith(" ") == true) {
      validation(1);
    } else {
      var itemBody = $('#typeItem').val();
      if ($('#' + itemBody) >= 1) {
        //testing
        console.log($('#' + itemBody).length);

        validation(2);
      } else {
        //testing
        console.log(('#' + itemBody).length);
        console.log(('#' + itemBody).trim(" "));
        console.log($('#' + itemBody));
        console.log($('#' + itemBody).find('li'));

        addingItem($('#typeItem').val());
        $('#typeItem').val("");
      }
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
  addingDelButton(element);
}

$('li').hover(
  function() {
    $( this ).append( $( "<span> ***</span>" ) );
  }, function() {
    $( this ).find( "span" ).last().remove();
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
  $(itemToDelete).remove();
}
