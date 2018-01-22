<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$schedid = $user->id;
	$desc = $user->desc;
	$time = $user->time;

	$date = array();

	session_start();

	$id = $_SESSION['user'];
	$appointmenttype = "Check Up";
	$appointmentdesc = "Patient for check up";
	$appointmentid = "TSapp" . rand(1, 100) . "-" . rand(1, 100000) . "-" . date("m-d-Y"); 

	$date = date("m-d-Y");

	$checkappointment = mysqli_query($conn, "SELECT * FROM appointment WHERE appointmentdate='$time'");

	$appointmentexist = false;

	if(mysqli_num_rows($checkappointment)) {
		$appointmentexist = true;
	} else {
		$query = mysqli_query($conn, "INSERT INTO appointment VALUES('$appointmentid', '$time', '$appointmenttype', '$appointmentdesc', '$id', '$schedid', '$date')");
	}

	$date["appointmentexist"] = $appointmentexist;

	echo json_encode($data);

 ?>