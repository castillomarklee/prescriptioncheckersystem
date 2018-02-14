<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$userid = $admin->userid;

	$query = mysqli_query($conn, "DELETE FROM user WHERE userid='$userid'");

?>