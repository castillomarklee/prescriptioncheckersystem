<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->id;

	$query = mysqli_query($conn, "DELETE FROM vitalsigns WHERE vitalsignid='$id'");

 ?>