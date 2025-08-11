<?php
session_start();
session_regenerate_id(true); // ✅ Prevent session fixation

// After successful login
$_SESSION['email'] = $email;


$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        $_SESSION['email'] = $email;
        header("Location: ../main.html");
        exit();
    }
}

// Redirect with error flag
header("Location: ../index.html?error=invalid");
exit();
?>
