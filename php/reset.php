<?php
$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = trim($_POST['email']);
$newPassword = trim($_POST['new_password']);
$confirmPassword = trim($_POST['confirm_password']);

if (empty($email) || empty($newPassword) || empty($confirmPassword)) {
    echo "<script>
        alert('All fields are required.');
        window.history.back();
    </script>";
    exit();
}

if ($newPassword !== $confirmPassword) {
    echo "<script>
        alert('Passwords do not match.');
        window.history.back();
    </script>";
    exit();
}

// OPTIONAL: Hash the password before storing
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $hashedPassword, $email);

if ($stmt->execute()) {
    echo "<script>
        alert('Password successfully reset!');
        window.location.href = '../index.html';
    </script>";
} else {
    echo "<script>
        alert('Error updating password.');
        window.history.back();
    </script>";
}
?>
