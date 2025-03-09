<?php
    require_once("../../api/config.php");

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['CONTENT_TYPE'] === 'application/json') {
        session_start();
        $data = json_decode(file_get_contents('php://input'), true);
        $originalUsername = $data['originalUsername'];
        $originalEmail = $data['originalEmail'];
        $newName = $data['newName'];
        $newUsername = $data['newUsername'];
        $newEmail = $data['newEmail'];
        
        if($originalUsername != $newUsername){
            $queryCheck = "SELECT * FROM users WHERE username = '$newUsername'";
            $result = $db->query($queryCheck);

            if ($result->num_rows > 0) {
                $response = array(
                    'success' => false,
                    'message' => 'Username already exists'
                );
                header('Content-Type: application/json'); // Adicione esse cabeçalho
                echo json_encode($response);
                $db->close();
                exit;
            }
        }

        if($originalEmail != $newEmail){
            $queryCheck = "SELECT * FROM users WHERE email = '$newEmail'";
            $result = $db->query($queryCheck);

            if ($result->num_rows > 0) {
                $response = array(
                    'success' => false,
                    'message' => 'Email already exists'
                );
                header('Content-Type: application/json'); // Adicione esse cabeçalho
                echo json_encode($response);
                $db->close();
                exit;
            }
        }
        
        $queryUpdate = "UPDATE users SET name = '$newName', username = '$newUsername', email = '$newEmail' WHERE username = '$originalUsername'";
        if($_SESSION['has_picture'] == "true"){
            rename("../../media/users/profilePictures/$originalUsername.png", "../../media/users/profilePictures/$newUsername.png");
        }


        if($db->query($queryUpdate)){
            // Return a JSON response
            $response = array(
                'success' => true,
                'message' => 'User profile updated successfully'
            );
            //Change the session data to the updated ones
            $_SESSION['name'] = $newName;
            $_SESSION['user'] = $newUsername;
            
        }else{
            $response = array(
                'success' => false,
                'message' => 'Error updating user profile: ' . $db->error
            );
        }

        header('Content-Type: application/json'); // Adicione esse cabeçalho
        echo json_encode($response);
        $db->close();
        exit;
    }
?>