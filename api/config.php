<?php

function loadEnv($path) {
    if (!file_exists($path)) {
        throw new Exception(".env not found.");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if (!array_key_exists($key, $_SERVER) && !array_key_exists($key, $_ENV)) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
}

// Ajuste o caminho para apontar para a pasta raiz onde está o configs.env
$envPath = __DIR__ . '/server.env';
loadEnv($envPath);

$hostname = getenv('DB_HOST');
$username = getenv('DB_USER');
$pass = getenv('DB_PASS');
$port = getenv('DB_PORT');
$database = getenv('DB_NAME');

$db = mysqli_connect($hostname, $username, $pass, $database);

/*
$apiKey = getenv('BINANCE_TOKEN');
$apiSecret = getenv('BINANCE_SECRET');
$accessToken = getenv('PUSHBULLET_TOKEN');
*/
?>