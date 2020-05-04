<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$appointmentid = $admin->id;

	$appointmentdelete = mysqli_query($conn, "DELETE FROM appointment WHERE appointmentid='$appointmentid'");

	$deletediagnosis = mysqli_query($conn, "DELETE FROM diagnose WHERE appointmentid='$appointmentid'")

 ?>