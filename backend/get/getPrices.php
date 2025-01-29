<?php
header('Content-Type: application/json');

if (!isset($_GET['coin1']) || !isset($_GET['coin2'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Por favor, forneça as duas moedas'
    ]);
    exit;
}

require '../../api/vendor/autoload.php';

try {
    $api = new Binance\API();
    
    $coin1 = strtoupper($_GET['coin1']);
    $coin2 = strtoupper($_GET['coin2']);
    
    // Tenta buscar o preço diretamente
    $price = $api->price($coin1 . $coin2);
    
    if ($price !== false) {
        echo json_encode([
            'success' => true,
            'price' => $price
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Par de moedas não encontrado'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>