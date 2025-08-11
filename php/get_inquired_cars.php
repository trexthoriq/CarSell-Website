<?php
session_start();
header('Content-Type: application/json');

// 🔄 Use the same key as login.php
if (!isset($_SESSION['email'])) {
    echo json_encode([]);
    exit;
}

require 'db_connect.php';

$userEmail = $_SESSION['email']; // ✅ Use the correct session key

$sql = "SELECT cars.id, cars.name, cars.image, cars.manufacturer, cars.model, cars.year, cars.mileage, cars.price
        FROM inquiries
        JOIN cars ON inquiries.car_id = cars.id
        WHERE inquiries.user_email = ?
        ORDER BY inquiries.inquired_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userEmail);
$stmt->execute();

$result = $stmt->get_result();
$cars = [];

while ($row = $result->fetch_assoc()) {
    $cars[] = $row;
}

echo json_encode($cars);

?>
