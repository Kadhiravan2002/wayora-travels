<?php
declare(strict_types=1);

require_once __DIR__ . '/env.php';

/**
 * Configures and validates CORS for incoming requests.
 * Automatically responds to preflight OPTIONS requests.
 */
function handleCors(): void
{
    $allowedOriginsRaw = env('ALLOWED_ORIGINS', 'http://localhost:4200,https://kadhiravan2002.github.io');
    $allowedOrigins = array_filter(array_map('trim', explode(',', $allowedOriginsRaw)));

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Max-Age: 86400');
        header('Vary: Origin');
    }

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    // Enforce POST method for actual submission
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(405, [
            'success' => false,
            'message' => 'Method not allowed. Only POST requests are accepted.',
        ]);
    }
}

/**
 * Parses and returns the decoded JSON body from the incoming request.
 *
 * @return array<string, mixed>
 */
function getJsonInput(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Empty request payload.',
        ]);
    }

    try {
        $decoded = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    } catch (\JsonException $e) {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Invalid JSON payload received.',
        ]);
    }

    if (!is_array($decoded)) {
        sendJsonResponse(400, [
            'success' => false,
            'message' => 'Invalid JSON structure. Object expected.',
        ]);
    }

    return $decoded;
}

/**
 * Sends a standardized JSON HTTP response and terminates script execution.
 *
 * @param int $statusCode
 * @param array<string, mixed> $data
 * @return never
 */
function sendJsonResponse(int $statusCode, array $data): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
