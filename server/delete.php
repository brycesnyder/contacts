<?php

    include_once('connect.php');

    if (isset($_POST['id']) && strlen($_POST['id']) > 0) {
       
        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
        $delete_row = $mysql->query("DELETE FROM $tb WHERE id=" . $id);
        if(!$delete_row) {
            header('HTTP/1.1 500 Could not delete record!');
            exit();
        }
    
        $mysqli->close();
    
    } else {
        header('HTTP/1.1 500 Error occurred, Could not process request!');
        exit();
    }

?>