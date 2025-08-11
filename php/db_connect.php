<?php
$host = "localhost";        // Or your database host (e.g., 127.0.0.1)
$user = "root";             // Your database username
$pass = "";                 // Your database password
$dbname = "carsell_acc";           // Your database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
