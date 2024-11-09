function gopage(nama){
    pages = 'page|'+nama;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        $('#main-content').html(this.responseText);
        tampil('page');
      }
    };
    xhttp.open("GET", "./pages/"+nama+".html", true);
    xhttp.send();
}

function tampil(hal,id){
    if (hal === 'page'){
        $('.table-cont').hide();
        $('.page-cont').show();
    }
    if (hal === 'tabel'){
        $('.page-cont').hide();
        $('.table-cont').show();
    } 
}

var pages = '';
var columns = [];
var columnNames = [];
var datatable;
var globadata = [];
var datasingle = [];
var dataedit = [];
var namatable = "";
function gotable(nama) {
    pages = 'tabel|'+nama;
    namatable = nama;
    $('#judul').html('Data '+nama);
    $.ajax({
      url: "https://img.adhi-info.com/api/api.php/records/"+nama,
      success: function (data) {
        if (data.records.length>0){
            data.data = data.records;
            data.recordsTotal = data.records.length; 
            delete(data.records);
            columnNames = Object.keys(data.data[0]);
            columns = [];
            columns.push({data: 'detil',title: 'Detil'});
            for (var i in columnNames) {
                columns.push({data: columnNames[i],title: capitalizeFirstLetter(columnNames[i])});
            }
            for (i=0;i<data.data.length;i++) {
                data.data[i].detil='<button type="button" class="btn btn-primary btn-sm btdetil">Detil</button>';
            }
            if (datatable) {
                datatable.clear();
                datatable.destroy();
            }
            datatable = $('#tabelku').DataTable( {
                data: data.data,
                responsive: true,
                columns: columns,
            } );
            tampil('tabel');
        }
      }
    });
}

$('#tabelku').on( 'click', '.btdetil', function () {
    datasingle = datatable.row( $(this).parents('tr') ).data();
    
    var teks = '';
    var isi = "";
    for (var i in columnNames) {
        if (datasingle[columnNames[i]] !== null ) isi=datasingle[columnNames[i]]; 
        else { 
            isi="";
            datasingle[columnNames[i]]="";
        }
        teks = teks + '<tr><td class="detlabel">'+capitalizeFirstLetter(columnNames[i])+"</td>";
        teks = teks + '<td>'+isi+"</td></tr>";
    }
    teks ='<table style="width:80%">' +teks +'</table>';
    $('.modal-title').html('Detil Data '+capitalizeFirstLetter(namatable));
    $('#detil-body').html(teks);
    $('#modal-detil').modal('show');
    $('#modal-btg-edit').hide();
    $('#modal-btg-delete').hide();
    $('#modal-btg-view').show();
} );

$('#modal-detil').on( 'click','#modal-save',  function (event) {
    dataedit = {};
    $('#dynamic_form').find('input[type="text"], input[type="number"], select, textarea').each(function() {
        dataedit[$(this)[0].name]=$(this).val();
    })
    if(dataedit['id']) {
        for (var i in columnNames)  {
            if (datasingle[columnNames[i]] === dataedit[columnNames[i]] && columnNames[i]!=="id") delete (dataedit[columnNames[i]]);
        
        }    
    } else {
        for (var i in columnNames)  {
            if (dataedit[columnNames[i]]=="" || dataedit[columnNames[i]]== null ) delete (dataedit[columnNames[i]]);
        }   
    }
    console.log(dataedit);
    if(dataedit['id']) {
        $.ajax({
            url:  "https://img.adhi-info.com/api/api.php/records/"+namatable+"/"+dataedit['id'],
            type: "put",
            data: dataedit,
            success:function(response){
                if(response == 1){
                    console.log('Save successfully'); 
                }else{
                    console.log("Not saved.");
                }
                gotable(namatable);
                $('#modal-detil').modal('hide');
            }
        });
    } else {
        $.ajax({
            url:  "https://img.adhi-info.com/api/api.php/records/"+namatable,
            type: "post",
            data: dataedit,
            success:function(response){
                if(response == 1){
                    console.log('Save successfully'); 
                }else{
                    console.log("Not saved.");
                }
                gotable(namatable);
                $('#modal-detil').modal('hide');
            }
        });

    }
   
})

$('#modal-detil').on( 'click','#modal-delete',  function (event) {
    $('.modal-title-detil').html('Hapus Data Berikut?');
    $('#modal-btg-edit').hide();
    $('#modal-btg-view').hide();
    $('#modal-btg-delete').show();
})

$('#modal-detil').on( 'click','#modal-delete-ok',  function (event) {
    if(datasingle['id']) {
        $.ajax({
            url:  "https://img.adhi-info.com/api/api.php/records/"+namatable+"/"+datasingle['id'],
            type: "delete",
            success:function(response){
                if(response == 1){
                    console.log('Save successfully'); 
                }else{
                    console.log("Not saved.");
                }
                gotable(namatable);
                $('#modal-detil').modal('hide');
            }
        });
    }
    
})



$('#modal-detil').on( 'click', '#modal-edit', function () {
    var teks = '';
    var isi = "";
    for (var i in columnNames)  {
        if (datasingle[columnNames[i]] !== null ) isi=datasingle[columnNames[i]]; else isi="";
        teks = teks + '<tr><td class="detlabel">'+capitalizeFirstLetter(columnNames[i])+"</td>";
        if(columnNames[i]!='id') teks = teks + '<td><input type="text"  name="'+columnNames[i]+'" value="'+isi+'"></td></tr>';
            else teks = teks + '<td><input type="text" name="'+columnNames[i]+'" value="'+isi+'" readonly></td></tr>';
        
    }
    teks ='<table style="width:80%">' +teks +'</table>';
    $('#detil-body').html(teks);
    $('.modal-title-detil').html('Edit Data '+capitalizeFirstLetter(namatable));
    $('#modal-btg-edit').show();
    $('#modal-btg-view').hide();
    $('#modal-btg-delete').hide();
} );

$('#btn-add').on( 'click', function () {
    var teks = '';
    for (var i in columnNames) if(columnNames[i]!='id') {
        teks = teks + '<tr><td class="detlabel">'+capitalizeFirstLetter(columnNames[i])+"</td>";
        teks = teks + '<td><input type="text" value=""  name="'+columnNames[i]+'" ></td></tr>';
    }
    teks ='<table style="width:80%">' +teks +'</table>';
    $('.modal-title-detil').html('Tambah Data '+capitalizeFirstLetter(namatable));
    $('#detil-body').html(teks);
    $('#modal-detil').modal('show');
    $('#modal-btg-edit').show();
    $('#modal-btg-view').hide();
    $('#modal-btg-delete').hide();
    
} );

function capitalizeFirstLetter(string) {
    string = string.replace(/_/g,' ');
    return string.charAt(0).toUpperCase() + string.slice(1);
}


