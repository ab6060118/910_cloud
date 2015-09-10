<?php
require_once("./TreeGenerator.php");
$test = new treeGenerator("/home/pi/web/910_cloud/share/", "/home/pi/web/910_cloud/tree.json");
$test->initTree();
$test->putTree();
?>
