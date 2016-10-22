$(document).ready (function () {
  getMoraldata();
});

function getMoraldata(){
  $.getJSON( "/clientdata", function( data ) {

    data.sort(function (a,b){
      return b.priority - a.priority;
    });

    for (var i = 0; i < data.length; i ++){

      var tablerow = $("<tr></tr>");

      tablerow.append('<td>' + data[i].UserID + '</td>')
      tablerow.append('<td>' + data[i].First_Name +'</td>');
      tablerow.append('<td>' + data[i].Last_Name +'</td>');

      if (data[i].age != null){
        tablerow.append('<td>' + data[i].age + '</td>');
      }else {
        tablerow.append('<td>' + 'N/A' + '</td>');
      }

      tablerow.append('<td>' + data[i].priority + '</td>');

      $("#homeless_data_table").append(tablerow);
    }
  });
}
