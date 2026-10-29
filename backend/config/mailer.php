<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once dirname(__DIR__) . '/vendor/autoload.php';
require_once __DIR__ . '/env.php';

/**
 * Creates and pre-configures a PHPMailer instance using Gmail SMTP settings.
 *
 * @throws RuntimeException If required SMTP credentials are not configured.
 * @return PHPMailer
 */
function createMailer(): PHPMailer
{
    $smtpUser = env('SMTP_USER', 'kadhiravan2026@gmail.com');
    $smtpPass = env('SMTP_PASS', '');

    if (empty($smtpPass) || $smtpPass === 'your_16_char_google_app_password') {
        throw new \RuntimeException(
            'Gmail SMTP credentials are not configured. Please set a valid 16-character Google App Password in backend/.env'
        );
    }

    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host       = env('SMTP_HOST', 'smtp.gmail.com');
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = str_replace(' ', '', $smtpPass); // strip spaces if user pasted "xxxx xxxx xxxx xxxx"
    $mail->SMTPSecure = env('SMTP_SECURE', 'tls') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int)env('SMTP_PORT', 587);
    $mail->CharSet    = 'UTF-8';

    // Default sender and recipient
    $fromName = env('SMTP_FROM_NAME', 'WAYORA Travels');
    $mail->setFrom($smtpUser, $fromName);

    $recipient = env('NOTIFICATION_RECIPIENT', 'kadhiravan2026@gmail.com');
    $mail->addAddress($recipient);

    $mail->isHTML(true);

    return $mail;
}
