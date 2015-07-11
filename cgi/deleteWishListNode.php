<?php
    if(isset($_POST['id'])) $id = $_POST['id'];

    $filePath = '../WishList.json';
    $wishList = json_decode(file_get_contents($filePath), true);

    if(empty($wishList)) {
        return;
    }
    else {
        unset($wishList[(string)$id]);
        file_put_contents($filePath, json_encode($wishList, JSON_PRETTY_PRINT));
    }
?>
