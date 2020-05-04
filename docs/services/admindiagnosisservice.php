<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.diagnoseid, q.diagnosedescription, q.patientcomplain, q.diagnosis, q.recommendation, q.drugallergies, e.firstname AS userf, e.middlename AS userm, e.lastname AS userl, t.firstname AS docf, t.middlename AS docm, t.lastname AS docl FROM diagnose q, appointment w, user e, docsched r, doctor t");

	while ($querylist = mysqli_query($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>