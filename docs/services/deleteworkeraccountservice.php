<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$workerid = $admin->workerid;

	$query = mysqli_query($conn, "DELETE FROM hospworker WHERE workerid='$workerid'");

?>