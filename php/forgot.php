<?php
// Connect to the database
$conn = new mysqli("localhost", "root", "", "carsell_acc");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = trim($_POST['email']);

// Prevent empty input (redundant check)
if (empty($email)) {
    header("Location: ../forgot.html");
    exit();
}

// Query the users table
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Email exists → Redirect to reset.html
    header("Location: ../reset.html?email=" . urlencode($email));
    exit();
} else {
    // Email not found → Alert and redirect to signup
    echo "<script>
        alert('No email detected. Please sign up first.');
        window.location.href = '../index.html';
    </script>";
    exit();
}
?>
