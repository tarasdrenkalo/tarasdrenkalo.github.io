<?php
class Auth {
    public static string $LogFile = "auth.log.json";
    public static string $CorrectPassword = "";
    public static string $AllowedMethod = "POST";
    public static int $MaxAttempts = 4;
    public static int $ResetAt = 3600;
    public static function IsAdminLoggedIn() {
        return !empty($_SESSION["ADMIN_LOGGED_IN"]);
    }
    /* --- Entry point for login --- */
    public static function Init(string $password, string $ip): void
    {
        session_start();
        // If already logged in, skip login
        if (self::IsAdminLoggedIn()) {
            echo "Already logged in!";
            exit;
        }
        header("Allow: " . self::$AllowedMethod);
        if ($_SERVER["REQUEST_METHOD"] !== self::$AllowedMethod) {
            http_response_code(405);
            exit;
        }
        // Check if exceeded quota
        if (self::QuotaExceeded($ip)) {
            http_response_code(429);
            exit;
        }
        // Verify password
        $correct = sha1(self::$CorrectPassword) === sha1($password);

        if ($correct && !self::QuotaExceeded($ip)) {
            self::LoginSucceeded($ip);
            // Set session flag
            $_SESSION['ADMIN_LOGGED_IN'] = true;
            $_SESSION['ADMIN_LOGIN_TIME'] = time();
            $_SESSION['ADMIN_LOGIN_IP'] = $ip;
            echo "Login successful";
            exit;
        }

        // Record failed attempt
        self::LoginFailed($ip);
        http_response_code(401);
    }

    /* --- Remove failed attempts on success --- */
    public static function LoginSucceeded(string $ip): void
    {
        if (!file_exists(self::$LogFile)) return;
        $fp = fopen(self::$LogFile, "c+");
        flock($fp, LOCK_EX);

        $data = json_decode(stream_get_contents($fp), true) ?: [];
        unset($data[$ip]);

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data));

        flock($fp, LOCK_UN);
        fclose($fp);
    }

    /* --- Record failed login attempt --- */
    public static function LoginFailed(string $ip): void
    {
        $now = time();
        $cutoff = $now - self::$ResetAt;

        if (!file_exists(self::$LogFile)) {
            file_put_contents(self::$LogFile, "{}");
        }

        $fp = fopen(self::$LogFile, "c+");
        flock($fp, LOCK_EX);

        $data = json_decode(stream_get_contents($fp), true) ?: [];

        foreach ($data as $addr => $times) {
            $data[$addr] = array_values(array_filter($times, fn($t) => $t >= $cutoff));
            if (empty($data[$addr])) unset($data[$addr]);
        }

        $data[$ip][] = $now;

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data));

        flock($fp, LOCK_UN);
        fclose($fp);
    }

    /* --- Check if IP exceeded login attempts --- */
    public static function QuotaExceeded(string $ip): bool
    {
        if (!file_exists(self::$LogFile)) return false;

        $cutoff = time() - self::$ResetAt;
        $fp = fopen(self::$LogFile, "r");
        flock($fp, LOCK_SH);

        $data = json_decode(stream_get_contents($fp), true) ?: [];
        $attempts = array_filter($data[$ip] ?? [], fn($t) => $t >= $cutoff);

        flock($fp, LOCK_UN);
        fclose($fp);

        return count($attempts) >= self::$MaxAttempts;
    }

    /* --- Optional: logout --- */
    public static function Logout(): void
    {
        session_start();
        session_unset();
        session_destroy();
        echo "Logged out";
    }
}

if (basename($_SERVER['SCRIPT_FILENAME']) !== 'Logger.php') {
    return;
}
Auth::Init($_POST['sig'] ?? '', $_SERVER['REMOTE_ADDR']);
// Later, on admin page:
// session_start();
// if (!empty($_SESSION['admin_logged_in'])) { /* allow access */ }