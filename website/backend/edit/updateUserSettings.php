<?php
    require_once("../../api/config.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['CONTENT_TYPE'] === 'application/json') {
        session_start();
        $data = json_decode(file_get_contents('php://input'), true);
        $newAccessToken = $data['access_token'];
        $newSecretToken = $data['secret_token'];

        if($newAccessToken == "No API Key" || $newSecretToken == "No API Secret"){
            $response = array(
                'success' => false,
                'message' => 'No API Key or Secret'
            );
            header('Content-Type: application/json');
            echo json_encode($response);
            $db->close();
            exit;
        }

        $queryUpdate = "UPDATE users SET access_token = '$newAccessToken', secret_token = '$newSecretToken' WHERE username = '".$_SESSION['user']."'";
        
        if($db->query($queryUpdate)){
            // Retorna uma resposta JSON
            $response = array(
                'success' => true,
                'message' => 'Settings Sucessfully Updated'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Error updating settings: ' . $db->error
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
        $db->close();
        exit;
    } else {
        $response = array(
            'success' => false,
            'message' => 'Invalid request'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
?>