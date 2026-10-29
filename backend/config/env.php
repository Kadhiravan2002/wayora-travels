<?php
declare(strict_types=1);

/**
 * Loads environment variables from a .env file into $_ENV, $_SERVER, and getenv().
 *
 * @param string $filePath Absolute or relative path to the .env file.
 * @return void
 */
function loadEnv(string $filePath): void
{
    if (!file_exists($filePath) || !is_readable($filePath)) {
        return;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        // Skip comment lines
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $val = trim($parts[1]);

        // Remove wrapping quotes if present
        if (
            (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
            (str_starts_with($val, "'") && str_ends_with($val, "'"))
        ) {
            $val = substr($val, 1, -1);
        }

        if (!array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $val;
        }
        if (!array_key_exists($key, $_SERVER)) {
            $_SERVER[$key] = $val;
        }
        putenv("{$key}={$val}");
    }
}

/**
 * Retrieves an environment variable with a fallback default.
 *
 * @param string $key
 * @param mixed $default
 * @return mixed
 */
function env(string $key, mixed $default = null): mixed
{
    if (array_key_exists($key, $_ENV)) {
        return $_ENV[$key];
    }
    if (array_key_exists($key, $_SERVER)) {
        return $_SERVER[$key];
    }
    $val = getenv($key);
    if ($val !== false) {
        return $val;
    }
    return $default;
}

// Automatically attempt to load backend/.env if present
$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
if (file_exists($envPath)) {
    loadEnv($envPath);
}
