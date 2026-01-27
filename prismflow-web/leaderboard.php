<?php
/**
 * PrismFlow Leaderboard API
 *
 * A simple file-based leaderboard storage system.
 *
 * Endpoints:
 *   GET  ?action=get    - Returns the full leaderboard
 *   POST action=submit  - Submits/updates a player's score
 *
 * Data is stored in leaderboard_data.json
 */

// Enable CORS for web requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
define('DATA_FILE', __DIR__ . '/leaderboard_data.json');
define('MAX_ENTRIES', 1000); // Maximum number of leaderboard entries to store

/**
 * Load leaderboard data from file
 */
function loadLeaderboard() {
    if (!file_exists(DATA_FILE)) {
        return [];
    }

    $content = file_get_contents(DATA_FILE);
    if ($content === false) {
        return [];
    }

    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

/**
 * Save leaderboard data to file
 */
function saveLeaderboard($data) {
    // Ensure directory is writable
    $dir = dirname(DATA_FILE);
    if (!is_writable($dir)) {
        return false;
    }

    // Sort by levels (primary) and stars (secondary) descending
    usort($data, function($a, $b) {
        if ($b['levels'] !== $a['levels']) {
            return $b['levels'] - $a['levels'];
        }
        return $b['stars'] - $a['stars'];
    });

    // Limit entries
    $data = array_slice($data, 0, MAX_ENTRIES);

    // Save with pretty print for debugging
    $json = json_encode($data, JSON_PRETTY_PRINT);
    return file_put_contents(DATA_FILE, $json) !== false;
}

/**
 * Sanitize username input
 */
function sanitizeUsername($username) {
    // Remove any HTML/script tags
    $username = strip_tags($username);
    // Trim whitespace
    $username = trim($username);
    // Limit length
    $username = substr($username, 0, 15);
    // Remove any non-printable characters
    $username = preg_replace('/[^\x20-\x7E]/', '', $username);
    return $username;
}

/**
 * Validate numeric input
 */
function validateNumber($value, $min = 0, $max = 999999) {
    $value = intval($value);
    return max($min, min($max, $value));
}

// Handle GET request - Return leaderboard
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($action === 'get') {
        $leaderboard = loadLeaderboard();
        echo json_encode([
            'success' => true,
            'leaderboard' => $leaderboard,
            'count' => count($leaderboard)
        ]);
        exit();
    }

    // Default response for unknown GET requests
    echo json_encode([
        'success' => false,
        'error' => 'Unknown action. Use ?action=get to fetch leaderboard.'
    ]);
    exit();
}

// Handle POST request - Submit score
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate input
    if (!$data || !isset($data['action']) || $data['action'] !== 'submit') {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid request. Expected action=submit.'
        ]);
        exit();
    }

    // Validate required fields
    if (!isset($data['username']) || empty($data['username'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Username is required.'
        ]);
        exit();
    }

    // Sanitize and validate input
    $username = sanitizeUsername($data['username']);
    if (strlen($username) < 1) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid username.'
        ]);
        exit();
    }

    $levels = validateNumber($data['levels'] ?? 0, 0, 80);
    $stars = validateNumber($data['stars'] ?? 0, 0, 240);
    $gems = validateNumber($data['gems'] ?? 0, 0, 999999);

    // Load current leaderboard
    $leaderboard = loadLeaderboard();

    // Find existing entry for this username
    $existingIndex = null;
    foreach ($leaderboard as $index => $entry) {
        if (strtolower($entry['username']) === strtolower($username)) {
            $existingIndex = $index;
            break;
        }
    }

    // Create new entry
    $newEntry = [
        'username' => $username,
        'levels' => $levels,
        'stars' => $stars,
        'gems' => $gems,
        'updatedAt' => date('c')
    ];

    if ($existingIndex !== null) {
        // Update existing entry only if new score is better
        $existing = $leaderboard[$existingIndex];
        if ($levels > $existing['levels'] ||
            ($levels === $existing['levels'] && $stars > $existing['stars'])) {
            $leaderboard[$existingIndex] = $newEntry;
        }
    } else {
        // Add new entry
        $leaderboard[] = $newEntry;
    }

    // Save leaderboard
    if (saveLeaderboard($leaderboard)) {
        echo json_encode([
            'success' => true,
            'message' => 'Score submitted successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save leaderboard. Check file permissions.'
        ]);
    }
    exit();
}

// Unknown request method
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed.'
]);
