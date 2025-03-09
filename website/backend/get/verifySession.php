<?php

header('Content-Type: application/json');

session_start();

$response = array('logged' => false);

if (isset($_SESSION['name'])) {
    $response = array('logged' => true, 'username' => $_SESSION['user'], 'has_picture' => $_SESSION['has_picture']);
}

echo json_encode($response);

?>