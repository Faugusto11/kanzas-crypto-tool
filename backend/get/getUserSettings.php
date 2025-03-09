<?php
require '../../api/config.php';


header('Content-Type: application/json');

session_start();

$response = array('logged' => false);

if (isset($_SESSION['name'])) {
    $query = "SELECT access_token, secret_token FROM users WHERE username = '".$_SESSION['user']."'";
    $result = $db->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        //checks if access_token and secret_token are null
        if($row['access_token'] == null){
            $row['access_token'] = "No API Key";
        }
        if($row['secret_token'] == null){
            $row['secret_token'] = "No API Secret";
        }
        $response = array('logged' => true, 'username' => $_SESSION['user'], 'access_token' => $row['access_token'], 'secret_token' => $row['secret_token']);
    }
}

echo json_encode($response);

?>