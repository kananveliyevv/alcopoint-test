<?php
header('Content-Type: application/json; charset=utf-8');
// CORS başlıqları (eyni domen üçün lazımsız, subdomain varsa aktivləşdirin)
// header('Access-Control-Allow-Origin: https://alcopoint.az');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
require __DIR__ . '/config.php';

$allowed = ['products', 'stores', 'gallery', 'careers', 'users', 'settings'];
$action = $_GET['action'] ?? 'all';

function respond($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function upload_file(): array {
    if (empty($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
        respond(['ok' => false, 'error' => 'Fayl seçilməyib.'], 400);
    }

    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        respond(['ok' => false, 'error' => 'Upload xətası: ' . $file['error']], 400);
    }

    $maxSize = 200 * 1024 * 1024; // 200 MB
    if ($file['size'] > $maxSize) {
        respond(['ok' => false, 'error' => 'Fayl çox böyükdür. Maksimum 200MB.'], 400);
    }

    $allowedMime = [
        'image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif',
        'video/mp4' => 'mp4', 'video/webm' => 'webm', 'video/ogg' => 'ogv', 'video/quicktime' => 'mov'
    ];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!isset($allowedMime[$mime])) {
        respond(['ok' => false, 'error' => 'Yalnız şəkil və video faylları yükləmək olar.'], 400);
    }

    $uploadDir = __DIR__ . '/uploads';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    $ext = $allowedMime[$mime];
    $name = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $dest = $uploadDir . '/' . $name;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        respond(['ok' => false, 'error' => 'Fayl uploads qovluğuna yazılmadı. İcazələri yoxlayın.'], 500);
    }

    return ['ok' => true, 'url' => 'uploads/' . $name, 'mime' => $mime, 'type' => str_starts_with($mime, 'video/') ? 'video' : 'image'];
}

function load_table(string $table) {
    if ($table === 'settings') {
        $stmt = db()->query("SELECT data FROM settings WHERE id='main' LIMIT 1");
        $row = $stmt->fetch();
        return $row ? json_decode($row['data'], true) : null;
    }
    $stmt = db()->query("SELECT data FROM `$table` ORDER BY updated_at DESC");
    $items = [];
    foreach ($stmt as $row) {
        $item = json_decode($row['data'], true);
        if (is_array($item)) $items[] = $item;
    }
    return $items;
}

function save_table(string $table, $items): void {
    if ($table === 'settings') {
        $json = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $stmt = db()->prepare("REPLACE INTO settings (id, data) VALUES ('main', ?)");
        $stmt->execute([$json]);
        return;
    }
    if (!is_array($items)) $items = [];
    db()->beginTransaction();
    try {
        db()->exec("DELETE FROM `$table`");
        $stmt = db()->prepare("INSERT INTO `$table` (id, data) VALUES (?, ?)");
        foreach ($items as $item) {
            if (!is_array($item)) continue;
            $id = $item['id'] ?? uniqid(substr($table, 0, 1) . '-', true);
            $item['id'] = $id;
            $stmt->execute([$id, json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
        }
        db()->commit();
    } catch (Throwable $e) {
        if (db()->inTransaction()) db()->rollBack();
        throw $e;
    }
}

function defaults(): array {
    $path = __DIR__ . '/initial_data.json';
    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? $data : [];
}


function ensure_schema(): void {
    $tables = ['products','stores','gallery','careers','users'];
    foreach ($tables as $table) {
        db()->exec("CREATE TABLE IF NOT EXISTS `$table` (
            id VARCHAR(80) PRIMARY KEY,
            data LONGTEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    }
    db()->exec("CREATE TABLE IF NOT EXISTS settings (
        id VARCHAR(80) PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
}

function ensure_seeded(): void {
    $count = (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
    if ($count > 0) return;
    $d = defaults();
    foreach (['products','stores','gallery','careers','users'] as $table) save_table($table, $d[$table] ?? []);
    save_table('settings', $d['settings'] ?? []);
}

try {
    ensure_schema();
    ensure_seeded();

    if ($action === 'upload') {
        require_auth();
        respond(upload_file());
    }

    if ($action === 'all') {
        respond([
            'ok' => true,
            'products' => load_table('products'),
            'stores' => load_table('stores'),
            'gallery' => load_table('gallery'),
            'careers' => load_table('careers'),
            'settings' => load_table('settings'),
            'users' => load_table('users'),
        ]);
    }

    if ($action === 'login') {
        $b = body();
        $username = trim((string)($b['username'] ?? ''));
        $password = trim((string)($b['password'] ?? ''));
        foreach (load_table('users') as $user) {
            if (($user['username'] ?? '') === $username && ($user['password'] ?? '') === $password) {
                $token = bin2hex(random_bytes(32));
                $expiry = time() + 86400; // 24 saat
                $tokenData = json_encode(['username' => $username, 'expiry' => $expiry]);
                $stmt = db()->prepare("REPLACE INTO settings (id, data) VALUES (?, ?)");
                $stmt->execute(['token_' . $token, $tokenData]);
                respond(['ok' => true, 'token' => $token, 'user' => [
                    'id' => $user['id'] ?? '',
                    'username' => $user['username'] ?? '',
                    'role' => $user['role'] ?? 'admin'
                ]]);
            }
        }
        respond(['ok' => false, 'error' => 'İstifadəçi adı və ya şifrə yanlışdır.'], 401);
    }


function require_auth(): void {
    $token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
    if (!$token) respond(['ok' => false, 'error' => 'Giriş tələb olunur.'], 401);
    $stmt = db()->prepare("SELECT data FROM settings WHERE id = ?");
    $stmt->execute(['token_' . $token]);
    $row = $stmt->fetch();
    if (!$row) respond(['ok' => false, 'error' => 'Etibarsız token.'], 401);
    $data = json_decode($row['data'], true);
    if (!$data || ($data['expiry'] ?? 0) < time()) {
        respond(['ok' => false, 'error' => 'Sessiyanın müddəti bitib. Yenidən daxil olun.'], 401);
    }
}

    if ($action === 'save') {
        require_auth();
        $b = body();
        $table = $b['table'] ?? '';
        if (!in_array($table, $allowed, true)) respond(['ok' => false, 'error' => 'Yanlış cədvəl.'], 400);
        save_table($table, $b['items'] ?? []);
        respond(['ok' => true]);
    }

    if ($action === 'reset') {
        require_auth();
        $d = defaults();
        foreach (['products','stores','gallery','careers','users'] as $table) save_table($table, $d[$table] ?? []);
        save_table('settings', $d['settings'] ?? []);
        respond(['ok' => true] + $d);
    }

    if ($action === 'logout') {
        $token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
        if ($token) {
            $stmt = db()->prepare("DELETE FROM settings WHERE id = ?");
            $stmt->execute(['token_' . $token]);
        }
        respond(['ok' => true]);
    }

    respond(['ok' => false, 'error' => 'Yanlış əməliyyat.'], 404);
} catch (Throwable $e) {
    respond(['ok' => false, 'error' => $e->getMessage()], 500);
}
