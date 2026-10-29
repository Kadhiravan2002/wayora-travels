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

// 4. Rate limiting: max 5 requests per 60 seconds per session
checkRateLimit('newsletter', 60, 5);

// 5. Input Validation
$email = trim((string)($input['email'] ?? ''));

if ($email === '') {
    sendJsonResponse(400, [
        'success' => false,
        'message' => 'Please enter an email address.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) {
    sendJsonResponse(400, [
        'success' => false,
        'message' => 'Please enter a valid email address.',
    ]);
}

// 6. Anti-repeat throttle (Non-database duplicate prevention)
// If submitted again in the same session within 1 hour, returns 200 without sending duplicate email
checkNewsletterThrottle($email, 3600);

// 7. Build and Send Email Notification
try {
    $mail = createMailer();

    $mail->Subject = "New Newsletter Subscriber: {$email}";

    // Load and populate HTML template
    $templatePath = dirname(__DIR__) . '/templates/newsletter_mail.html';
    $template = file_get_contents($templatePath);
    if ($template === false) {
        throw new \RuntimeException('Failed to load newsletter email template.');
    }

    $clientIp = getClientIp();
    $submittedAt = date('F j, Y, g:i a e');

    $replacements = [
        '{{EMAIL}}'        => htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
        '{{SUBMITTED_AT}}' => $submittedAt,
        '{{CLIENT_IP}}'    => htmlspecialchars($clientIp, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'),
    ];

    $htmlBody = str_replace(array_keys($replacements), array_values($replacements), $template);

    // Plain text alternative
    $plainText = "WAYORA TRAVELS - NEW NEWSLETTER SUBSCRIBER\n\n"
        . "Subscriber Email: {$email}\n"
        . "Subscribed At: {$submittedAt}\n"
        . "Source: Website Footer\n"
        . "IP: {$clientIp}\n";

    $mail->Body    = $htmlBody;
    $mail->AltBody = $plainText;

    $mail->send();

    sendJsonResponse(200, [
        'success' => true,
        'message' => 'Thank you for subscribing! Our seasonal travel guides and itineraries will arrive in your inbox.',
    ]);
} catch (\RuntimeException $e) {
    // Configuration error (e.g. missing App Password)
    error_log("[WAYORA Newsletter API] Configuration error: " . $e->getMessage());
    sendJsonResponse(500, [
        'success' => false,
        'message' => 'The subscription service is currently undergoing maintenance. Please try again shortly.',
        'debug'   => env('APP_ENV') === 'development' ? $e->getMessage() : null,
    ]);
} catch (\Exception $e) {
    // PHPMailer or network transmission error
    error_log("[WAYORA Newsletter API] Mailer send failure: " . $e->getMessage());
    sendJsonResponse(500, [
        'success' => false,
        'message' => 'Unable to complete subscription at this time. Please try again later.',
        'debug'   => env('APP_ENV') === 'development' ? $e->getMessage() : null,
    ]);
}
