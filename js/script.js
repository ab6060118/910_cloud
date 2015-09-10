$(document).ready(function() {
    $.get("cgi/connectLog.php", function() {});

    $('#ajaxTree').jstree({
        'core' : {
            'data': {
                "url": "./tree.json",
                "dataType": "json"
            }
            
        }
    });

    $('#rightContent').hide();
    $('#modalError').hide();

    $(document).ajaxStart(function() {
        $('body').addClass("loading"); 
    });

    $(document).ajaxStop(function() {
        $('body').removeClass("loading"); 
    });

    $('#createTree').on('click', function() {
        // $('#ajaxTree').jstree('destroy');
        $.get('cgi/newCreateTree.php', function() {
        })
        .done(function() {
            $('#ajaxTree').jstree('refresh');
        });
    });

    $('#ajaxTree').on('hover_node.jstree', function(e, data) {
        if(data.node.a_attr.fileType != undefined) {
            var type=data.node.a_attr.fileType;
            var link=data.node.a_attr.href;
            switch(type) {
                case 'jpg':
                case 'png':
                case 'gif':
                    $('#rightContent').show();
                    $('#contentImg').attr("src", link);
                    break;
                default:
                    break;
            }
        }
    });

    $('#ajaxTree').on('dehover_node.jstree', function(e, data) {
        $('#rightContent').hide();
    });

    $('#ajaxTree').on('select_node.jstree', function(e, data) {
        if(data.node.a_attr.fileType != undefined) {
            var type=data.node.a_attr.fileType;
            var link=data.node.a_attr.href;
            switch(type) {
                case 'jpg':
                case 'png':
                case 'gif':
                    break;
                default:
                    $.get("cgi/connectLog.php", {"fileName":link}, function() {});
                    window.open(link);
                    break;
            }
        }
    });

    /*
    * wish pound modal operation
    */

    $('#modalShow').on('click', function(){
        $('#modal').modal('show');
    });

    $('#modalSubmit').on('click', function(){
        var text = $('#text').val();
        var url = $('#url').val();
        if(!text) {
            $('#text').focus();
            $('#modalError').text('Text field is required.');
            $('#modalError').show('1000');
        }
        else if(url) {
            if(isUrlValid(url)) {
                $.post('cgi/wishPound.php', {'text':text, 'url':url}, function() {
                    $('#modal').modal('hide');
                });
            }
            else {
                $('#url').focus();
                $('#modalError').text('The URL format is invalid.');
                $('#modalError').show('1000');
            }
        }
        else {
            $.post('cgi/wishPound.php', {'text':text, 'url':'None'}, function() {
                $('#modal').modal('hide');
            });
        }
    });

    $('#modal').on('hidden.bs.modal', function (e) {
        $('#modalError').hide();
        $('#text').val('');
        $('#url').val('');
    });

    /*
    * wish list modal operation
    */

    $('#modalWishList').on('click', function() {
        $.get('cgi/readWishList.php',function(data) {
            var data = $.parseJSON(data);
            $.each(data, function(index, data) {
                data = dataHandler(data);
                var row = '<tr>';
                row += '<td>'+data.time.substring(5,11)+'</td>';
                row += '<td>'+data.id+'</td>';
                row += '<td>'+data.status+'</td>';
                if(data.url === 'None')
                    row += '<td>None</td>'
                else
                    row += '<td><a href="'+data.url+'" target="_blank">Link</a></td>';
                row += '<td>'+data.text+'</td>';
                row += '</tr>';
                $('#wishListTable > tbody').append(row);
            })
        })
        .done(function() {
            $('#wishListModal').modal('show');
        });
    });

    $('#wishListModal').on('hidden.bs.modal', function (e) {
        $('#wishListTable > tbody').empty();
    });

    $('#adminDashboard_btn').on('click', function() {
        window.open('admin');
    });

    function dataHandler(data) {
        switch(data.status) {
            case 0:
                data.status = '<span class="label label-default">Unconfirm</span>';
                break;
            case 1:
                data.status = '<span class="label label-primary">In prograssing</span>';
                break;
            case 2:
                data.status = '<span class="label label-success">Complete</span>';
                break;
            case 3:
                data.status = '<span class="label label-danger">Fail</span>';
                break;
        }
        return data;
    }

    function isUrlValid(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }
});
