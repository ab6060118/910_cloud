<?php
    $rootPath="../share";
    $idName="node_";
    $idCounter="0";
    $tree=Array();
    $jsonFile=fopen("../tree.json", "w");


    initalTree($tree, $rootPath, $idCounter, $idName);

    $rootLength=count($tree);

    for($i=0; $i<$rootLength; $i++) {
        findAllChild($tree[$i], $rootPath, $idCounter, $idName, $tree);
    }

    fwrite($jsonFile, json_encode($tree));
    fclose($jsonFile);

    function initalTree(&$tree, $rootPath, &$idCounter, $idName) {
        $dirArr=Array();
        $dirArr=scandir($rootPath);

        $dirArr=array_slice($dirArr, 2);

        foreach($dirArr as $item) {
            $itemArr=array();
            $itemArr["id"]=$idName.$idCounter++;
            $itemArr["text"]=$item;
            $itemArr["parent"]="#";

            array_push($tree, $itemArr);
        }
    }

    function findAllChild(&$node, $path, &$idCounter, $idName, &$treeRoot) {
        $currentPath=$path."/".$node["text"];
        echo $currentPath, "\n";

        if(is_dir($currentPath)) {
            $dirArr=Array();
            $dirArr=scandir("$currentPath");
            $dirArr=array_slice($dirArr, 2);

            foreach($dirArr as $item) {
                $itemArr=array();
                $itemArr["id"]=$idName.$idCounter++;
                $itemArr["text"]=$item;
                $itemArr["parent"]=$node["id"];

                array_push($treeRoot, $itemArr);
                findAllChild($treeRoot[count($treeRoot)-1], $currentPath, $idCounter, $idName, $treeRoot);
            }
        }
        else {
            $node["a_attr"]=Array();
            $node["a_attr"]["href"]=substr($currentPath, 3);
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
                    $node["icon"]="jstree-image";
                    break;
                case 'png':
                    $node["icon"]="jstree-image";
                    break;
                default:
                    $node["icon"]="jstree-file";
                    break;
            }
        }
    }
?>
