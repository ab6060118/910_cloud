<?php
    date_default_timezone_set("Asia/Taipei");
    $logPath="/home/pi/web/910_cloud/connect.log";
    $time=date("Y-m-d H:i:s");
    if(isset($_GET['fileName'])) $fileName=$_GET["fileName"];

    if (!empty($_SERVER['HTTP_CLIENT_IP']))
           $ip=$_SERVER['HTTP_CLIENT_IP'];
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
           $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    else
           $ip=$_SERVER['REMOTE_ADDR'];

    $log="[$time] Connect from $ip";

    if(isset($fileName)) $log.=" access the file: $fileName";

    $command="echo \"$log\" >> \"$logPath\"";
    echo shell_exec($command);
?>
