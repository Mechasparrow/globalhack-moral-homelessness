$(document).ready (function () {
  getMoraldata();
});

function getMoraldata(){
  $.getJSON( "/clientdata", function( data ) {

    for (var i = 0; i < data.length; i ++){

      var tablerow = $("<tr></tr>");

      tablerow.append('<td>' + data[i].First_Name +'</td>');
      tablerow.append('<td>' + data[i].Last_Name +'</td>');

      $("#homeless_data_table").append(tablerow);
    }
  });
}
