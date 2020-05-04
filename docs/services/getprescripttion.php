<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$diagnosis = $doctor->diagnosis;

	$data = array();

	$query = mysqli_query($conn, "SELECT q.firstname AS ufirst, q.middlename AS umiddle, q.lastname AS ulast, w.firstname, w.middlename, w.lastname, e.recommendation FROM user q, doctor w, diagnose e, docsched r, appointment t WHERE q.userid=t.userid AND w.doctorid=r.doctorid AND r.schedid=t.schedid AND e.appointmentid=t.appointmentid AND e.diagnoseid='$diagnosis'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);


 ?>