<?php
header('Content-Type: application/json');
// ⚠️ HIER ANPASSEN: Ihre echte Domain einsetzen (für Production)
header('Access-Control-Allow-Origin: *'); // Ändern zu: https://ihre-domain.de
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Nur POST-Requests akzeptieren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// JSON-Daten aus Angular empfangen
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Prüfen ob JSON gültig ist
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// Einfacher Spam-Schutz: Max 1 Submit alle 30 Sekunden
session_start();
$now = time();
$lastSubmit = $_SESSION['last_submit'] ?? 0;

if ($now - $lastSubmit < 30) {
    echo json_encode(['status' => 'error', 'message' => 'Zu viele Anfragen. Bitte warten Sie.']);
    exit;
}
$_SESSION['last_submit'] = $now;

// Input-Daten bereinigen (Sicherheit)
$data['name'] = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$data['email'] = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$data['message'] = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validierung der Formulardaten
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

// Bei Validierungsfehlern: Fehler zurücksenden
if (!empty($errors)) {
    echo json_encode([
        'status' => 'error',
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// ⚠️ HIER ANPASSEN: Ihre echte E-Mail-Adresse einsetzen
$to = 'ihre-echte-email@ihre-domain.de'; // BEISPIEL: kontakt@meinefirma.de

// E-Mail-Inhalt zusammenstellen
$subject = 'Kontaktformular von ' . $data['name'];
$message = "Name: " . $data['name'] . "\n";
$message .= "E-Mail: " . $data['email'] . "\n";
$message .= "Nachricht:\n" . $data['message'];
$message .= "\n\n---\n";
$message .= "Gesendet am: " . date('Y-m-d H:i:s') . "\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// ⚠️ HIER ANPASSEN: Ihre echte Domain einsetzen
$headers = "From: noreply@ihre-domain.de\r\n"; // BEISPIEL: noreply@meinefirma.de
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// E-Mail senden und Antwort an Angular zurücksenden
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


