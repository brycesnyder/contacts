<?php

    $srvr = 'localhost';
    $usr = 'bsnyder_admin';
    $pass = 'aAbBcC123';
    $db = 'bsnyder_challenge';
    $tb = 'contacts';

    $mysqli = new mysqli($srvr, $usr, $pass, $db);
    
    if ($mysqli->connect_error)
        die("Connection Error " . $mysqli->connect_errno . ": " . $mysqli->connect_error);

?>