<?php
session_start();
session_unset();
session_destroy();

// Retorna resposta JSON
echo json_encode(['success' => true]);
?>
