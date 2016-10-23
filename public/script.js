$(document).ready (function () {
  getMoraldata();
});

function getMoraldata(){
  $.getJSON( "/clientdata", function( data ) {

    data.sort(function (a,b){
      return b.priority - a.priority;
    });

    for (var i = 0; i < data.length; i ++){

      var tablerow = $("<tr class = 'tabledata'></tr>");

      tablerow.append('<td>' + data[i].UserID + '</td>')
      if (data[i].First_Name != "") {
        tablerow.append('<td>' + data[i].First_Name +'</td>');
      }else {
        tablerow.append('<td>' + "unknown" +'</td>');
      }

      if (data[i].Last_Name != ""){
        tablerow.append('<td>' + data[i].Last_Name +'</td>');
      }else {
        tablerow.append('<td>' + "unknown" +'</td>');
      }

      if (data[i].age != null){
        tablerow.append('<td>' + data[i].age + '</td>');
      }else {
        tablerow.append('<td>' + 'N/A' + '</td>');
      }

      tablerow.append('<td>' + data[i].priority + '</td>');
      tablerow.append('<td>' + data[i].military + '</td>');
      $("#homeless_data_table").append(tablerow);
    }
  });
}

function reset() {
  location.reload();
}

function filterList() {
  var searchbar = $("#input-search")
  var tabledata = $(".tabledata");
  tabledata.remove();

  $.getJSON("/clientdata", function (data) {
    for (var i = 0; i < data.length; i ++){
      if (data[i].UserID == searchbar.val()){
        var tablerow = $("<tr class = 'tabledata'></tr>");

        tablerow.append('<td>' + data[i].UserID + '</td>')
        tablerow.append('<td>' + data[i].First_Name +'</td>');
        tablerow.append('<td>' + data[i].Last_Name +'</td>');

        if (data[i].age != null){
          tablerow.append('<td>' + data[i].age + '</td>');
        }else {
          tablerow.append('<td>' + 'N/A' + '</td>');
        }

        tablerow.append('<td>' + data[i].priority + '</td>');
        tablerow.append('<td>' + data[i].military + '</td>');
        $("#homeless_data_table").append(tablerow);
      }
    }
  });
}

function filterListByName() {
  var searchbar = $("#input-search-name")
  var tabledata = $(".tabledata");
  tabledata.remove();

  $.getJSON("/clientdata", function (data) {
    for (var i = 0; i < data.length; i ++){
      if (data[i].Last_Name.toLowerCase() == searchbar.val().toLowerCase()){
        var tablerow = $("<tr class = 'tabledata'></tr>");

        tablerow.append('<td>' + data[i].UserID + '</td>')
        tablerow.append('<td>' + data[i].First_Name +'</td>');
        tablerow.append('<td>' + data[i].Last_Name +'</td>');

        if (data[i].age != null){
          tablerow.append('<td>' + data[i].age + '</td>');
        }else {
          tablerow.append('<td>' + 'N/A' + '</td>');
        }

        tablerow.append('<td>' + data[i].priority + '</td>');
        tablerow.append('<td>' + data[i].military + '</td>');
        $("#homeless_data_table").append(tablerow);
      }
    }
  });
}
