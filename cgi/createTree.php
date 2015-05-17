<?php
    $rootPath="/home/pi/web/910_cloud/share";
    $idCounter="0";
    $tree=Array();
    $file=fopen("/home/pi/web/910_cloud/tree.json", "w");

    initalTree($tree, $rootPath, $idCounter);

    $rootLength=count($tree);

    for($i=0; $i<$rootLength; $i++) {
        findAllChild($tree[$i], $rootPath, $idCounter, $rootPath, $tree);
    }

    // echo json_encode($tree);
    fwrite($file, json_encode($tree));
    fclose($file);

    function initalTree(&$tree, $rootPath, &$idCounter) {
        $dirArr=Array();
        $dirArr=scandir($rootPath);

        $dirArr=array_slice($dirArr, 2);

        foreach($dirArr as $item) {
            $itemArr=array();
            $itemArr["id"]="node_".$idCounter++;
            $itemArr["text"]=$item;
            $itemArr["parent"]="#";

            array_push($tree, $itemArr);
        }
    }

    function findAllChild(&$node, $path, &$idCounter, $rootPath, &$treeRoot) {
        $currentPath=$path."/".$node["text"];

        if(is_dir($currentPath)) {
            $dirArr=Array();
            $dirArr=scandir($currentPath);
            $dirArr=array_slice($dirArr, 2);

            foreach($dirArr as $item) {
                $itemArr=array();
                $itemArr["id"]="node_".$idCounter++;
                $itemArr["text"]=$item;
                $itemArr["parent"]=$node["id"];

                array_push($treeRoot, $itemArr);
                findAllChild($treeRoot[count($treeRoot)-1], $currentPath, $idCounter, $rootPath, $treeRoot);
            }
        }
        else {
            $node["a_attr"]=Array();
            $node["a_attr"]["href"]="share".substr($currentPath, strlen($rootPath));

            $fileType=strtolower(pathinfo($currentPath, PATHINFO_EXTENSION));
            
            $node["a_attr"]["fileType"]=$fileType;
            switch($fileType) {
                case 'avi':
                case 'wmv':
                case 'mp4':
                case 'mkv':
                    $node["icon"]="jstree-video";
                    break;
                case 'jpg':
                case 'png':
                case 'gif':
                    $node["icon"]="jstree-image";
                    break;
                default:
                    $node["icon"]="jstree-file";
                    break;
            }
        }
    }
?>
