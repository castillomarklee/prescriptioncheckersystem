<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->id;

	$data = array();

	$querysuccess = false;

	$query = mysqli_query($conn, "SELECT doctor.doctorid, docsched.schedid, appointment.appointmentid, diagnose.diagnoseid FROM doctor, docsched, appointment, diagnose WHERE doctor.doctorid=docsched.doctorid AND docsched.schedid=appointment.schedid AND appointment.appointmentid=diagnose.appointmentid AND doctor.doctorid='$id' ");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist[0].doctorid;
	}

	echo json_encode($data);

 ?>