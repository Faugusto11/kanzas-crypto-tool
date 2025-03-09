<?php
    require "../../api/config.php";
    $first = $_POST['firstName'];
    $user = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $query_check = "SELECT name FROM users WHERE email = '$email' or username = '$user'";
    $result_check = $db->query($query_check);
    if($result_check->num_rows>0){
        echo "<script>alert('O usuário ou email já está cadastrado.')</script>";
    }else{
        $query = "INSERT INTO users (name, username, email, password, created_at, has_picture) values ('$first', '$user', '$email', '$password', '".date("Y-m-d H-i-s")."', 'false')";
        $db->query($query);
    }

    //Redirect to userAuth.html
    echo "<script>window.location.href='../../userAuth.html';</script>";

    $db->close();
?>