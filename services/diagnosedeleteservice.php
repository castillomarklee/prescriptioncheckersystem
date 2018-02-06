<?php 

	include '../connection/connect.php';

	$diagnose = json_decode(file_get_contents("php://input"));

	$id = $diagnose->id;

	$appointmentid = "";

	$queryappointment = mysqli_query($conn, "SELECT appointmentid FROM diagnose WHERE diagnoseid='$id'");

	while ($queryappointmentlist = mysqli_fetch_assoc($queryappointment)) {
		$appointmentid = $queryappointmentlist["appointmentid"];
	}

	$query = mysqli_query($conn, "DELETE FROM diagnose WHERE diagnoseid='$id'");

	$updateappointment = mysqli_query($conn, "UPDATE appointment SET status='RESERVED' WHERE appointmentid='$appointmentid'");

 ?>