<?php
session_start();
header('Content-Type: application/json');
require_once '../../api/config.php';

if (!isset($_SESSION['user']) || !isset($_FILES['profilePicture'])) {
    echo json_encode(['success' => false, 'session' => $_SESSION]);
    exit;
}

$username = $_SESSION['user'];
$uploadDir = '../../media/users/profilePictures/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = $username . '.png';
$targetPath = $uploadDir . $fileName;

if (move_uploaded_file($_FILES['profilePicture']['tmp_name'], $targetPath)) {
    $db->query("UPDATE users SET has_picture = 'true' WHERE username = '$username'");

    // Update session
    $_SESSION['has_picture'] = 'true';
    
    echo json_encode(['success' => true, 'session' => $_SESSION['has_picture']]);
} else {
    echo json_encode(['success' => false, 'session' => $_SESSION['has_picture']]);
}
