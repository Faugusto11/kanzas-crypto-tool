<?php
    require_once("../../api/config.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['CONTENT_TYPE'] === 'application/json') {
        session_start();
        $data = json_decode(file_get_contents('php://input'), true);
        $originalUsername = $data['originalUsername'];
        $newEmail = $data['newEmail'];
        $newAccessToken = $data['newApiKey'];
        $newSecretToken = $data['newApiSecret'];

        // Atualiza as configurações do usuário no banco de dados
        $queryUpdate = "UPDATE users SET email = '$newEmail', access_token = '$newAccessToken', secret_token = '$newSecretToken' WHERE username = '$originalUsername'";
        
        if($db->query($queryUpdate)){
            // Retorna uma resposta JSON
            $response = array(
                'success' => true,
                'message' => 'Configurações atualizadas com sucesso'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Erro ao atualizar as configurações'
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
        $db->close();
        exit;
    } else {
        $response = array(
            'success' => false,
            'message' => 'Método não permitido'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
?>