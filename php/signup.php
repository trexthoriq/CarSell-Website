<?php
session_start();

// Connect to the database
$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read form input
$email = trim($_POST['email']);
$password = trim($_POST['password']);
$confirm = trim($_POST['confirm']);

// Basic validation
if (empty($email) || empty($password) || empty($confirm)) {
    header("Location: ../index.html?error=empty");
    exit();
}

if ($password !== $confirm) {
    header("Location: ../index.html?error=nomatch");
    exit();
}

// Check if email already exists
$checkSql = "SELECT * FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    header("Location: ../index.html?error=exists");
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
$insertStmt = $conn->prepare($insertSql);
$insertStmt->bind_param("ss", $email, $hashedPassword);

if ($insertStmt->execute()) {
    header("Location: ../index.html?success=signedup");
    exit();
} else {
    header("Location: ../index.html?error=failed");
    exit();
}

$conn->close();
?>
