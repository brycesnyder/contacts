<?php 

    include_once('connect.php')

    if (isset($_POST['id']) && strlen($_POST['id']) > 0 
       && isset($_POST['name']) && strlen($_POST['name']) > 0 
       && isset($_POST['phone']) && strlen($_POST['phone']) > 0 
       && isset($_POST['address']) && strlen($_POST['address']) > 0) {
        
        $id = filter_var($_POST['id'], FILTER_SANITIZE_INT)
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $insert = $mysqli->query("UPDATE $tb SET name=" . $name . ",phone=" . $phone . ", address=" . $address . "WHERE id=" . $id);
        
        $mysqli->close();
        
    } else {
        header('HTTP/1.1 500 Looks like mysql error, could not update record!');
        exit();
    }

?>