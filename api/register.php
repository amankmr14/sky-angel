<?php
require 'vendor/autoload.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed."]);
    exit();
}

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$time = filter_input(INPUT_POST, 'time', FILTER_VALIDATE_INT);
$stars = filter_input(INPUT_POST, 'stars', FILTER_VALIDATE_INT);

if (!$name || !$time || !$stars) {
    http_response_code(400);
    echo json_encode(["error" => "All fields (name, time, stars) are required and must be valid."]);
    exit();
}

try {
    // Connect to MongoDB
    $client = new MongoDB\Client("mongodb://localhost:27017");
    $collection = $client->myDatabase->users;

    $userData = [
        "name" => $name,
        "time" => $time,
        "stars" => $stars,
        "created_at" => new MongoDB\BSON\UTCDateTime()
    ];

    $insertResult = $collection->insertOne($userData);

    http_response_code(200);
    echo json_encode([
        "message" => "User registered successfully.",
        "data" => $userData,
        "inserted_id" => (string) $insertResult->getInsertedId()
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Could not save data to MongoDB.", "details" => $e->getMessage()]);
}
?>
