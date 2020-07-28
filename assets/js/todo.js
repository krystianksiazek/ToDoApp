$('#typeItem').keyup(function(event) {
  if (event.which == '13') {
    if ($('#typeItem').val() == "" || $('#typeItem').val().startsWith(" ") == true) {
      validation();
    } else {
      var itemBody = $('#typeItem').val();
      if($('#'+ itemBody).length >= 1) {
        validation();
      }
      else {
        addingItem($('#typeItem').val());
        $('#typeItem').val("");
      }

    }
  }
});

function addingItem(item) {
  var element = $("<li></li>").text(item);
  $(element).appendTo('#mainList');
  $(element).attr('id', item);
  $(element).addClass('oneItem');
  $(element).attr('onclick', 'markDone(this)');
}

function validation() {
  //tu będzie switch do warunków błędów 
  $('#typeItem').val("");
  $('#typeItem').attr("placeholder", "Incorrectly entered value!");
  $('#typeItem').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(function() {
    $('#typeItem').attr("placeholder", "Tape your item here...");
  }, 600);

}

function markDone(item) {
  $(item).toggleClass('itemDone');
}
