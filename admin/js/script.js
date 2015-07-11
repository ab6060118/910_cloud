$(document).ready(function() {
    $.get('../cgi/readWishList.php',function(data) {
        var data = $.parseJSON(data);
        $.each(data, function(index, data) {
            var row = '';
            data = dataHandler(data);

            row = '<tr>';
            row += '<td>'+data.time.substring(5,11)+'</td>';
            row += '<td>'+data.id+'</td>';
            row += '<td></td>';
            row += '<td>'+data.url+'</td>'
            row += '<td>'+data.text+'</td>';
            row += '<td class="text-center"><span class="delete-icon glyphicon glyphicon-trash" data-id="'+data.id+'"></span></td>';
            row += '</tr>';
            row = $(row);
            $(row.find('td')[2]).append(data.status);

            $('#wishListTable > tbody').append(row);
        })
    });

    $('#wishListTable tbody').on('change', 'select', function() {
        $.ajax({
            url: '../cgi/updateStatus.php',
            data: {'id': $(this).data('node'), 'status': $(this).val()},
            method: 'POST',
            success: function(data){
                console.log(data);
            },
        });
    });

    $('#wishListTable').on('click', '.delete-icon', function() {
        var id = $(this).data('id');
        var row = $(this).parents('tr');
        console.log(row);
        $('#deleteModal .modal-body').append('<h1 class="text-center">'+$(row.find('td')[4]).text()+'</h1>');
        $('#deleteModal').modal('show');
        $('#deleteModal #modalSubmit').on('click', function() {
            $.ajax({
                url: '../cgi/deleteWishListNode.php',
                data: {'id': id},
                method: 'POST',
                success: function() {
                    row.remove();
                }
            });
        });
    });

    $('#deleteModal').on('hidden.bs.modal', function (e) {
        $('#deleteModal .modal-body').empty();
    });

    function dataHandler(data) {
        if(data.url !== 'None')
            data.url='<a href="'+data.url+'">Link</a>';

        data.status = createSelect(data.status, data.id);

        return data;
    }

    function createSelect(status, id) {
        var select = '';

        select += '<select data-node='+id+'>';
        select += '<option value="0">Unconfirm</option>';
        select += '<option value="1">In progressing</option>';
        select += '<option value="2">Complete</option>';
        select += '<option value="3">Fail</option>';
        select += '</select>';
        select = $(select);
        select.val(status);

        return select;
    }
});
