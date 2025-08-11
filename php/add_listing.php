<?php
header('Content-Type: application/json');
require 'db_connect.php';

$name = $_POST['name'] ?? '';
$manufacturer = $_POST['manufacturer'] ?? '';
$model = $_POST['model'] ?? '';
$year = $_POST['year'] ?? 0;
$mileage = $_POST['mileage'] ?? 0;
$price = $_POST['price'] ?? 0;
$imageFile = $_FILES['image'] ?? null;

// Validate inputs
if (!$name || !$manufacturer || !$model || !$year || !$mileage || !$price || !$imageFile) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Validate image type
$allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
if (!in_array($imageFile['type'], $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Invalid image type']);
    exit;
}

// Handle image upload
$uploadDir = '../assets/cars/';
$imageName = uniqid() . "_" . basename($imageFile['name']);
$uploadPath = $uploadDir . $imageName;

if (!move_uploaded_file($imageFile['tmp_name'], $uploadPath)) {
    echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
    exit;
}

// Insert into database
$sql = "INSERT INTO cars (name, manufacturer, model, year, mileage, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssiiis", $name, $manufacturer, $model, $year, $mileage, $price, $imageName);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'DB Error: ' . $stmt->error]);
}
?>
