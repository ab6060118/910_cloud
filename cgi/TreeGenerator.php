<?php

class TreeGenerator {
    private $tree = array();
    private $rootPath;
    private $treeFilePath;
    private $exception = [".", "..", "lost+found"];

    public function __construct($rootPath, $treeFilePath) {
        $this->rootPath = $rootPath;
        $this->treeFilePath = $treeFilePath;
    }

    public function initTree() {
        $dirArr = scandir($this->rootPath);

        foreach($dirArr as $item) {
            if(!in_Array($item, $this->exception)) {
                preg_match("/.+(\/.+\/.+$)/", $this->rootPath . $item, $id);        
                $itemArr["id"] = $id[1];
                $itemArr["text"] = $item;
                $itemArr["parent"] = "#";

                array_push($this->tree, $itemArr);
            }
        }

        $this->findChild(count($this->tree));
    }

    public function putTree() {
        file_put_contents($this->treeFilePath, json_encode($this->tree));
    }

    private function findChild($count) {
        for($i = 0; $i < $count; $i++) {
            $this->findAllChild($i);
        }
    }

    private function findAllChild($id) {
        $node = $this->tree[$id];
        $currentPath = $this->rootPath . $node["text"];
        $objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($currentPath), RecursiveIteratorIterator::SELF_FIRST);

        foreach($objects as $object) {
            unset($itemArr);
            $fileName = $object->getFilename();
            preg_match("/.+(\/.+\/.+$)/", $object->getPath(), $path);
            preg_match("/.+(\/.+\/.+$)/", $object, $id);        

            if(in_Array($fileName, $this->exception)) {
                continue;
            }

            $itemArr["id"] = $id[1];
            $itemArr["text"] = $fileName;
            $itemArr["parent"] = $path[1];

            if($object->isDir()) {
            }
            else {
                $itemArr["a_attr"]["href"]="share/".substr($object, strlen($this->rootPath));
                $fileType=strtolower($object->getExtension());
                
                $itemArr["a_attr"]["fileType"]=$fileType;
                switch($fileType) {
                    case 'avi':
                    case 'wmv':
                    case 'mp4':
                    case 'mkv':
                        $itemArr["icon"]="jstree-video";
                        break;
                    case 'jpg':
                    case 'png':
                    case 'gif':
                        $itemArr["icon"]="jstree-image";
                        break;
                    case 'rar':
                    case 'zip':
                        $itemArr["icon"]="jstree-rar";
                        break;
                    default:
                        $itemArr["icon"]="jstree-file";
                        break;
                }
            }
                
            array_push($this->tree, $itemArr);
        }
    }
}
