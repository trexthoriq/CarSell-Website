<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "carsell_acc");

if ($conn->connect_error) {
  echo json_encode(["error" => "Connection failed"]);
  exit();
}

$result = $conn->query("SELECT COUNT(*) AS total FROM cars");
$data = $result->fetch_assoc();
echo json_encode(["total" => $data['total']]);
?>
