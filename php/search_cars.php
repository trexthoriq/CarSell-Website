<?php
require_once "db_connect.php";
header("Content-Type: application/json");

$where = [];

if (!empty($_GET['q'])) {
  $q = mysqli_real_escape_string($conn, $_GET['q']);
  $where[] = "name LIKE '%$q%'";
}
if (!empty($_GET['manufacturer'])) {
  $man = mysqli_real_escape_string($conn, $_GET['manufacturer']);
  $where[] = "manufacturer = '$man'";
}
if (!empty($_GET['model'])) {
  $model = mysqli_real_escape_string($conn, $_GET['model']);
  $where[] = "model = '$model'";
}
if (!empty($_GET['year'])) {
  $year = intval($_GET['year']);
  $where[] = "year = $year";
}
if (!empty($_GET['mileage'])) {
  $mileage = intval($_GET['mileage']);
  $where[] = "mileage <= $mileage";
}

$sql = "SELECT * FROM cars";
if (count($where) > 0) {
  $sql .= " WHERE " . implode(" AND ", $where);
}

$result = mysqli_query($conn, $sql);
$cars = [];

if ($result && mysqli_num_rows($result) > 0) {
  while ($row = mysqli_fetch_assoc($result)) {
    $cars[] = $row;
  }
}

echo json_encode($cars);
?>
