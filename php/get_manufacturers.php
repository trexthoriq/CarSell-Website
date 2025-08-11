<?php
header("Content-Type: application/json");

// Connect to your MySQL database
$conn = new mysqli("localhost", "root", "", "carsell_acc");

if ($conn->connect_error) {
  echo json_encode(["error" => "Database connection failed"]);
  exit();
}

// Get unique manufacturers from the cars table
$sql = "SELECT DISTINCT manufacturer FROM cars ORDER BY manufacturer ASC";
$result = $conn->query($sql);

$manufacturers = [];

while ($row = $result->fetch_assoc()) {
  $manufacturers[] = $row["manufacturer"];
}

// Output as JSON
echo json_encode($manufacturers);
?>
