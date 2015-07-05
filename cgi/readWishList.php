<?php
    $filePath = '../WishList.json';
    $wishList = json_decode(file_get_contents($filePath), true);

    if(empty($wishList)) {
    }
    else {
        echo json_encode($wishList);
    }
?>
