<?php
    require "../../api/config.php";
    
    $user = $_POST['username'];
    $password = $_POST['password'];

    $query_check = "SELECT password FROM users WHERE email = '$user' or username = '$user'";
    $result_check = $db->query($query_check);
    $row = $result_check->fetch_assoc();
    if(password_verify($password,$row['password'])){
        $result =$db->query("SELECT name, username, has_picture FROM users WHERE email = '$user' or username = '$user'");
        $data = $result->fetch_assoc();
        session_start();
        

        $_SESSION['name'] = $data['name'];
        $_SESSION['user'] = $data['username'];
        
        //Checks if $result->fetch_assoc()['has_picture'] is true
        if($data['has_picture'] == true){
            $_SESSION['has_picture'] = $data['has_picture'];
        }else{
            $_SESSION['has_picture'] = false;
        }
        
        
        echo "<script>window.location.href='../../index.html'; </script>";
    }else{
        echo "<script>alert('Invalid username or password!'); window.location.href='../../userAuth.html'; </script>";
    }

    $db->close();
?>