<?php
require_once("/home/pi/web/910_cloud/cgi/TreeGenerator.php");

$test = new treeGenerator("/home/pi/web/910_cloud/share/", "/home/pi/web/910_cloud/tree.json");
$test->initTree();
$test->putTree();
?>
