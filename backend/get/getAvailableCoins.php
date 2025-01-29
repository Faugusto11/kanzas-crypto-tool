<?php
header('Content-Type: application/json');
require '../../api/vendor/autoload.php';

try {
    $api = new Binance\API();
    $exchangeInfo = $api->exchangeInfo();

    $coins = [];
    $tradingPairs = [];

    foreach ($exchangeInfo['symbols'] as $pair) {
        if ($pair['status'] === 'TRADING') {
            $baseCoin = $pair['baseAsset'];
            $quoteCoin = $pair['quoteAsset'];

            // Adiciona moedas únicas
            if (!isset($coins[$baseCoin])) {
                $coins[$baseCoin] = ['symbol' => $baseCoin, 'name' => $baseCoin];
            }
            if (!isset($coins[$quoteCoin])) {
                $coins[$quoteCoin] = ['symbol' => $quoteCoin, 'name' => $quoteCoin];
            }

            // Registra o par de trading
            $tradingPairs[$baseCoin][] = $quoteCoin;
        }
    }

    echo json_encode([
        'success' => true,
        'coins' => array_values($coins),
        'tradingPairs' => $tradingPairs
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>