<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "DB connection failed"]));
}


$car_id = $_POST['car_id'] ?? '';
$user_email = $_POST['user_email'] ?? '';
$message = $_POST['message'] ?? '';

file_put_contents("debug.log", print_r($_POST, true));


if (empty($car_id) || empty($user_email)) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO inquiries (car_id, user_email, message) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $car_id, $user_email, $message);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Insert failed"]);
}

$stmt->close();
$conn->close();
?>
