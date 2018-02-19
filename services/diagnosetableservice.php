<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.diagnoseid, q.diagnosedescription, q.patientcomplain, q.diagnosis, q.recommendation, q.drugallergies, w.appointmentdate, e.firstname, e.middlename, e.lastname, e.userid FROM diagnose q, appointment w, user e WHERE q.appointmentid=w.appointmentid AND w.userid=e.userid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>