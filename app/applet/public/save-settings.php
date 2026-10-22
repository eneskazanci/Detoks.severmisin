<?php
// Hostinger Canlı Ayar Kaydedici (save-settings.php)
// Yönetici panelinden girilen Tarih ve WhatsApp linkini settings.json dosyasına kaydeder.

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Yalnızca POST istekleri kabul edilir']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Geçersiz veri']);
    exit();
}

// Şifre kontrolü (Varsayılan: Detoks8080*)
$password = trim($data['password'] ?? '');
$validPassword = 'Detoks8080*';

if ($password !== $validPassword) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Hatalı yönetici şifresi']);
    exit();
}

$filePath = __DIR__ . '/settings.json';

// Mevcut ayarları oku veya yeni oluştur
$current = [];
if (file_exists($filePath)) {
    $current = json_decode(file_get_contents($filePath), true) ?: [];
}

if (isset($data['eventDate']) && !empty($data['eventDate'])) {
    $current['eventDate'] = trim($data['eventDate']);
}

if (isset($data['whatsappUrl']) && !empty($data['whatsappUrl'])) {
    $current['whatsappUrl'] = trim($data['whatsappUrl']);
}

$current['updatedAt'] = date('c');

$saved = file_put_contents($filePath, json_encode($current, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

if ($saved !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'Ayarlar başarıyla Hostinger sunucusuna kaydedildi!',
        'settings' => $current
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Dosya yazma hatası. settings.json izinlerini kontrol edin (chmod 666 veya 777).']);
}
?>
