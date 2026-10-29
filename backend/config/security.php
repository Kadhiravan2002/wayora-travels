<?php
declare(strict_types=1);

require_once __DIR__ . '/cors.php';

/**
 * Starts a secure PHP session if one has not already been started.
 */
function ensureSession(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        // Enforce cookie security flags if applicable
        if (!headers_sent()) {
            ini_set('session.cookie_httponly', '1');
            ini_set('session.use_only_cookies', '1');
        }
        @session_start();
    }
}

/**
 * Inspects a honeypot field. If filled, traps the bot by responding
 * with a synthetic 200 OK without dispatching any emails.
 *
 * @param array<string, mixed> $input
 * @param string $field
 * @return void
 */
function checkHoneypot(array $input, string $field = 'hp_company'): void
{
    if (isset($input[$field]) && is_string($input[$field]) && trim($input[$field]) !== '') {
        // Bot detected: simulate successful processing
        sendJsonResponse(200, [
            'success' => true,
            'message' => 'Thank you for your submission.',
        ]);
    }
}

/**
 * Applies lightweight session-based rate limiting per action to prevent spam bursts.
 *
 * @param string $action Unique action identifier (e.g. 'contact', 'newsletter')
 * @param int $windowSeconds Time window in seconds (default 60s)
 * @param int $maxAttempts Max submissions within the window (default 5)
 * @return void
 */
function checkRateLimit(string $action, int $windowSeconds = 60, int $maxAttempts = 5): void
{
    ensureSession();

    $now = time();
    $sessionKey = "rate_limit_{$action}";

    if (!isset($_SESSION[$sessionKey]) || !is_array($_SESSION[$sessionKey])) {
        $_SESSION[$sessionKey] = [];
    }

    // Filter out attempts older than windowSeconds
    $_SESSION[$sessionKey] = array_filter(
        $_SESSION[$sessionKey],
        static fn(int $timestamp): bool => ($now - $timestamp) < $windowSeconds
    );

    if (count($_SESSION[$sessionKey]) >= $maxAttempts) {
        sendJsonResponse(429, [
            'success' => false,
            'message' => 'Too many requests. Please wait a moment before trying again.',
        ]);
    }

    // Record this attempt
    $_SESSION[$sessionKey][] = $now;
}

/**
 * Non-database newsletter duplicate throttling.
 * Prevents sending repeated email notifications for the same subscriber within a time window.
 *
 * @param string $email Normalized email address
 * @param int $throttleSeconds Minimum seconds between notifications for the same email (default 3600 = 1 hour)
 * @return void
 */
function checkNewsletterThrottle(string $email, int $throttleSeconds = 3600): void
{
    ensureSession();

    $now = time();
    $normalized = strtolower(trim($email));

    $lastEmail = $_SESSION['last_newsletter_email'] ?? null;
    $lastTime = $_SESSION['last_newsletter_time'] ?? 0;

    if (
        is_string($lastEmail) &&
        $lastEmail === $normalized &&
        ($now - (int)$lastTime) < $throttleSeconds
    ) {
        // Already received in this session recently: return success without sending a duplicate email
        sendJsonResponse(200, [
            'success' => true,
            'message' => 'You are already subscribed to our newsletter.',
        ]);
    }

    // Update session tracker for subsequent requests
    $_SESSION['last_newsletter_email'] = $normalized;
    $_SESSION['last_newsletter_time'] = $now;
}

/**
 * Returns the client's IP address (for audit/diagnostic display in notification emails).
 *
 * @return string
 */
function getClientIp(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR',
    ];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ipList = explode(',', (string)$_SERVER[$header]);
            $ip = trim($ipList[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return 'Unknown';
}
