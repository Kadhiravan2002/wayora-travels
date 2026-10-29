<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/env.php';
require_once dirname(__DIR__) . '/config/cors.php';
require_once dirname(__DIR__) . '/config/security.php';
require_once dirname(__DIR__) . '/config/mailer.php';

// 1. Process CORS and enforce POST
handleCors();

// 2. Parse JSON payload
$input = getJsonInput();

// 3. Honeypot protection
checkHoneypot($input, 'hp_company');

// 4. Rate limiting: max 5 submissions per 60 seconds per session
checkRateLimit('contact', 60, 5);

// 5. Input Validation
$errors = [];

$fullName = trim((string)($input['fullName'] ?? ''));
if ($fullName === '') {
    $errors['fullName'] = 'Full name is required.';
} elseif (mb_strlen($fullName) < 2) {
    $errors['fullName'] = 'Full name must be at least 2 characters.';
} elseif (mb_strlen($fullName) > 100) {
    $errors['fullName'] = 'Full name cannot exceed 100 characters.';
}

$email = trim((string)($input['email'] ?? ''));
if ($email === '') {
    $errors['email'] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
} elseif (mb_strlen($email) > 255) {
    $errors['email'] = 'Email address cannot exceed 255 characters.';
}

$phone = trim((string)($input['phone'] ?? ''));
if ($phone !== '' && !preg_match('/^[+0-9\s-]{7,25}$/', $phone)) {
    $errors['phone'] = 'Please enter a valid phone number (digits, +, - and spaces only).';
}

$destination = trim((string)($input['destination'] ?? ''));
if (mb_strlen($destination) > 100) {
    $destination = mb_substr($destination, 0, 100);
}

$destinationLabels = [
    'kerala' => 'Kerala — Backwaters & Nature',
    'rajasthan' => 'Rajasthan — Forts & Heritage',
    'kashmir' => 'Kashmir — Mountains & Lakes',
    'goa' => 'Goa — Coastal & Beaches',
    'pan-india' => 'Custom Pan-India Journey',
];
$displayDestination = $destinationLabels[$destination] ?? ($destination !== '' ? $destination : 'General Inquiry');

$message = trim((string)($input['message'] ?? ''));
if ($message === '') {
    $errors['message'] = 'Message is required.';
} elseif (mb_strlen($message) < 10) {
    $errors['message'] = 'Message must be at least 10 characters long.';
} elseif (mb_strlen($message) > 4000) {
    $errors['message'] = 'Message cannot exceed 4000 characters.';
}

if (!empty($errors)) {
    sendJsonResponse(400, [
        'success' => false,
        'message' => 'Validation failed. Please correct the highlighted errors.',
        'errors'  => $errors,
    ]);
}

// 6. Build and Send Email
try {
    $mail = createMailer();

    // Set reply-to as the traveler so clicking "Reply" responds directly to them
    $mail->addReplyTo($email, $fullName);
    $mail->Subject = "New Travel Enquiry: {$fullName} (" . ($displayDestination !== '' ? $displayDestination : 'General') . ")";

    // Load and populate HTML template
    $templatePath = dirname(__DIR__) . '/templates/contact_mail.html';
    $template = file_get_contents($templatePath);
    if ($template === false) {
        throw new \RuntimeException('Failed to load contact email template.');
    }

    $clientIp = getClientIp();
    $submittedAt = date('F j, Y, g:i a e');

    $replacements = [
        '{{FULL_NAME}}'    => htmlspecialchars($fullName, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
        '{{EMAIL}}'        => htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
        '{{PHONE}}'        => $phone !== '' ? htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') : '<span style="color:#8a92a6;">Not provided</span>',
        '{{DESTINATION}}'  => htmlspecialchars($displayDestination, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
        '{{MESSAGE}}'      => htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
        '{{SUBMITTED_AT}}' => $submittedAt,
        '{{CLIENT_IP}}'    => htmlspecialchars($clientIp, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    ];

    $htmlBody = str_replace(array_keys($replacements), array_values($replacements), $template);

    // Plain text alternative
    $plainText = "WAYORA TRAVELS - NEW ENQUIRY\n\n"
        . "Full Name: {$fullName}\n"
        . "Email: {$email}\n"
        . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n"
        . "Destination: {$displayDestination}\n\n"
        . "Message:\n{$message}\n\n"
        . "---\n"
        . "Submitted: {$submittedAt}\n"
        . "IP: {$clientIp}\n";

    $mail->Body    = $htmlBody;
    $mail->AltBody = $plainText;

    $mail->send();

    sendJsonResponse(200, [
        'success' => true,
        'message' => 'Thank you! Your travel enquiry has been received. Our specialists will contact you soon.',
    ]);
} catch (\RuntimeException $e) {
    // Configuration error (e.g. missing App Password)
    error_log("[WAYORA Contact API] Configuration error: " . $e->getMessage());
    sendJsonResponse(500, [
        'success' => false,
        'message' => 'The mail server is currently undergoing maintenance. Please email us directly at kadhiravan2026@gmail.com.',
        'debug'   => env('APP_ENV') === 'development' ? $e->getMessage() : null,
    ]);
} catch (\Exception $e) {
    // PHPMailer or network transmission error
    error_log("[WAYORA Contact API] Mailer send failure: " . $e->getMessage());
    sendJsonResponse(500, [
        'success' => false,
        'message' => 'Unable to send your enquiry right now. Please try again shortly or contact us directly.',
        'debug'   => env('APP_ENV') === 'development' ? $e->getMessage() : null,
    ]);
}
