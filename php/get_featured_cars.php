<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "carsell_acc");

if ($conn->connect_error) {
  echo json_encode(["error" => "Database connection failed"]);
  exit();
}

// Pagination setup
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 9;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $limit;

// Updated SQL to include model and year
$sql = "SELECT id, name, manufacturer, model, year, price, mileage, image FROM cars LIMIT ? OFFSET ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$cars = [];

while ($row = $result->fetch_assoc()) {
  $cars[] = $row;
}

echo json_encode($cars);
?>
