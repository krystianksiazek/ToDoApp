$('#item').keyup(function(event) {
  if (event.which == '13') {
    if ($('#item').val() == "" || $('#item').val().startsWith(" ") == true) {
      validation();
    } else {
      addingItem($('#item').val());
      $('#item').val("");
    }
  }
});

function addingItem(item) {

}

function validation() {
  $('#item').val("");
  $('#item').attr("placeholder", "Incorrectly entered value!");
  $('#item').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(function() {
    $('#item').attr("placeholder", "Tape your item here...");
  }, 600);

}
