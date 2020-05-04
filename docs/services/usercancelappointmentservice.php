<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));
	$data = array();

	$appointmentid = $user->appointmentid;

	$searchsched = mysqli_query($conn, "SELECT schedid FROM appointment WHERE appointmentid='$appointmentid'");

	$sched = "";

	while ($searchschedlist = mysqli_fetch_assoc($searchsched)) {
		$sched = $searchschedlist["schedid"];
	}

	$appointmentcancel = mysqli_query($conn, "DELETE FROM appointment WHERE appointmentid='$appointmentid'");

	$schedavailable = mysqli_query($conn, "UPDATE docsched SET availability='AVAILABLE' WHERE schedid='$sched'");

	if($searchsched && $appointmentcancel && $schedavailable) {
		$data["qwe"] = true;
	}

	$data["asdd"] = $appointmentid;

	echo json_encode($data);

 ?>