<?php
require '../../api/config.php';


header('Content-Type: application/json');

session_start();

$response = array('logged' => false);

if (isset($_SESSION['name'])) {
    $query = "SELECT email FROM users WHERE username = '".$_SESSION['user']."'";
    $result = $db->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response = array('logged' => true, 'name' => $_SESSION['name'], 'username' => $_SESSION['user'], 'has_picture' => $_SESSION['has_picture'], 'email' => $row['email']);
    }
}

echo json_encode($response);

?>