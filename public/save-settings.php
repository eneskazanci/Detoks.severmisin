<?php
// =========================================================================
// Hostinger Canlı Ayar Kaydedici (save-settings.php)
// Bu dosya Hostinger public_html içine yüklendiğinde; Yönetici Panelinden
// girilen Tarih ve WhatsApp Linki doğrudan settings.json dosyasına yazılır.
// =========================================================================

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists('settings.json')) {
        echo file_get_contents('settings.json');
    } else {
        echo json_encode([
            'eventDate' => '2026-10-22T20:00:00+03:00',
            'whatsappUrl' => 'https://chat.whatsapp.com/ItHdw0hFUecEZMRWCLAoMU',
            'eventTitle' => 'Tıbbi Detoks ve Bütünsel Arınma'
        ]);
    }
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Geçersiz veri gönderildi.'
    ]);
    exit();
}

// Güvenlik: Admin şifresi kontrolü (varsayılan: Detoks8080*)
$expectedPassword = 'Detoks8080*';
$clientPassword = $data['password'] ?? '';

// Mevcut ayarları oku
$existingSettings = [];
if (file_exists('settings.json')) {
    $currentRaw = file_get_contents('settings.json');
    $existingSettings = json_decode($currentRaw, true) ?: [];
}

// Şifre belirlenmişse onu kullan
if (!empty($existingSettings['adminPassword'])) {
    $expectedPassword = $existingSettings['adminPassword'];
}

if (!empty($clientPassword) && $clientPassword !== $expectedPassword) {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Yetkisiz erişim: Şifre hatalı.'
    ]);
    exit();
}

// Güncellenecek alanlar
if (!empty($data['eventDate'])) {
    $existingSettings['eventDate'] = $data['eventDate'];
}
if (!empty($data['whatsappUrl'])) {
    $existingSettings['whatsappUrl'] = $data['whatsappUrl'];
}
if (!empty($data['eventTitle'])) {
    $existingSettings['eventTitle'] = $data['eventTitle'];
}
if (isset($data['posterDateText'])) {
    $existingSettings['posterDateText'] = $data['posterDateText'];
}
if (isset($data['hidePosterStaticDate'])) {
    $existingSettings['hidePosterStaticDate'] = (bool)$data['hidePosterStaticDate'];
}
if (isset($data['posterSlides'])) {
    $existingSettings['posterSlides'] = $data['posterSlides'];
}
if (isset($data['slideIntervalSeconds'])) {
    $existingSettings['slideIntervalSeconds'] = (int)$data['slideIntervalSeconds'];
}
if (!empty($data['slideTransitionEffect'])) {
    $existingSettings['slideTransitionEffect'] = $data['slideTransitionEffect'];
}
if (isset($data['sectionsVisibility'])) {
    $existingSettings['sectionsVisibility'] = $data['sectionsVisibility'];
}

$existingSettings['updatedAt'] = date('c');

$saved = file_put_contents('settings.json', json_encode($existingSettings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

if ($saved !== false) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Ayarlar Hostinger sunucusuna (settings.json) başarıyla kaydedildi!',
        'data' => $existingSettings
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'settings.json dosyasına yazılamadı. Lütfen Hostinger Dosya Yöneticisinde dosya izinlerini (644/666) kontrol edin.'
    ]);
}
?>
