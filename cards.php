<?php 
$directory = './media/cards';
$files = array_diff(scandir($directory), array('..', '.'));
$fileNames = array_map(function($file){
    return pathinfo($file, PATHINFO_FILENAME);
}, $files);
echo json_encode(array_values($fileNames))




?>