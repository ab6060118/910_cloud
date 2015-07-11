<?php
    if(isset($_POST['text'])) $text=$_POST['text'];
    if(isset($_POST['url'])) $url=$_POST['url'];

    $filePath = '../WishList.json';
    $wishList = json_decode(file_get_contents($filePath), true);

    if (!empty($_SERVER['HTTP_CLIENT_IP']))
       $ip=$_SERVER['HTTP_CLIENT_IP'];
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
       $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    else
       $ip=$_SERVER['REMOTE_ADDR'];

    if(empty($wishList)) {
        $wishList = array();
        $wishNote = wishNote($text, $url, $ip);
    }
    else {
        $wishNote = wishNote($text, $url, $ip);
    }

    $wishList[(string)$wishNote['id']] = $wishNote;
    file_put_contents($filePath, json_encode($wishList, JSON_PRETTY_PRINT));

    function wishNote($text, $url, $ip) {
        $id = time();
        $date = date('Y/m/d H:i:s');
        $status = 0;
        return array('id' => $id,'time' => $date, 'ip' => $ip, 'status' => $status,'url' => $url, 'text' => $text);
    }
?>
