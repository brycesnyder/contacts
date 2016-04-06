<?php 

    require 'connect.php';

    $sql = "SELECT * FROM $tb";
    $result = $mysqli->query($sql);
    $json = array();

    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'address' => $row['address']
        );
    }

    echo json_encode($json);

    $mysqli->close();

?>