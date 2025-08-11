<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
  echo json_encode(["error" => "DB connection failed"]);
  exit();
}

$make = $_GET['manufacturer'] ?? '';
if (empty($make)) {
  echo json_encode(["error" => "Missing manufacturer"]);
  exit();
}

// Use prepared statement
$stmt = $conn->prepare("SELECT DISTINCT model, year, mileage FROM cars WHERE manufacturer = ?");
$stmt->bind_param("s", $make);
$stmt->execute();
$result = $stmt->get_result();

// Extract data
$models = [];
$years = [];
$mileages = [];

while ($row = $result->fetch_assoc()) {
  $models[] = $row["model"];
  $years[] = $row["year"];
  $mileages[] = $row["mileage"];
}

// Remove duplicates
$models = array_values(array_unique($models));
$years = array_values(array_unique($years));
$mileages = array_values(array_unique($mileages));

// Sort them
sort($models);
rsort($years); // most recent first
sort($mileages);

echo json_encode([
  "models" => $models,
  "years" => $years,
  "mileages" => $mileages
]);
