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

    $(document).ajaxStart(function() {
        $('body').addClass("loading"); 
    });

    $(document).ajaxStop(function() {
        $('body').removeClass("loading"); 
    });

    $('#createTree').on('click', function() {
        // $('#ajaxTree').jstree('destroy');
        $.get('cgi/createTree.php', function() {
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
});
