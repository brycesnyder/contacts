<?php

    include_once('connect.php')
        
    if (isset($_POST['name']) && strlen($_POST['name']) > 0 
       && isset($_POST['phone']) && strlen($_POST['phone']) > 0 
       && isset($_POST['address']) && strlen($_POST['address']) > 0) {
       
        $id = rand(0, 1000);
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $insert = $mysqli->query("INSERT INTO $tb(id, name, phone, address) VALUES('" . $id . "," . $name "," . $phone . "," . $address . "')");
        
        $mysqli->close();
    
    } else {
        header('HTTP/1.1 500 Looks like mysql error, could not insert record!');
        exit();
    }
        
?>