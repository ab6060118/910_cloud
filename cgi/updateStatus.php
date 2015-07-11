<?php
    if(isset($_POST['id'])) $id = $_POST['id'];
    if(isset($_POST['status'])) $status = $_POST['status'];

    $filePath = '../WishList.json';
    $wishList = json_decode(file_get_contents($filePath), true);

    if(empty($wishList)) {
        return;
    }
    else {
        $wishList[(string)$id]['status'] = (int)$status;
        file_put_contents($filePath, json_encode($wishList, JSON_PRETTY_PRINT));
    }
?>
