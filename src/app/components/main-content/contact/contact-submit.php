<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://dominique-dockal.de'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

session_start();
$now = time();
$lastSubmit = $_SESSION['last_submit'] ?? 0;

if ($now - $lastSubmit < 30) {
    echo json_encode(['status' => 'error', 'message' => 'Zu viele Anfragen. Bitte warten Sie.']);
    exit;
}
$_SESSION['last_submit'] = $now;


$data['name'] = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$data['email'] = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$data['message'] = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');


$errors = [];

if (empty($data['name'])) {
    $errors[] = 'Name ist erforderlich';
}

if (empty($data['email'])) {
    $errors[] = 'E-Mail ist erforderlich';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Ungültige E-Mail-Adresse';
}

if (empty($data['message'])) {
    $errors[] = 'Nachricht ist erforderlich';
} elseif (strlen($data['message']) < 10) {
    $errors[] = 'Nachricht muss mindestens 10 Zeichen haben';
}

if (!isset($data['privacy']) || !$data['privacy']) {
    $errors[] = 'Datenschutzerklärung muss akzeptiert werden';
}


if (!empty($errors)) {
    echo json_encode([
        'status' => 'error',
        'message' => implode(', ', $errors)
    ]);
    exit;
}


$to = 'contact@dominique-dockal.de';


$subject = 'Kontaktformular von ' . $data['name'];
$message = "Name: " . $data['name'] . "\n";
$message .= "E-Mail: " . $data['email'] . "\n";
$message .= "Nachricht:\n" . $data['message'];
$message .= "\n\n---\n";
$message .= "Gesendet am: " . date('Y-m-d H:i:s') . "\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";


$headers = "From: noreply@dominique-dockal.de\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";


if (mail($to, $subject, $message, $headers)) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Nachricht erfolgreich gesendet'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Senden der E-Mail'
    ]);
}
?>


