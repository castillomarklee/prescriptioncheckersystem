<?php 

	include '../connection/connect.php';

	$diagnose = json_decode(file_get_contents("php://input"));

	$diagnoseid = $diagnose->diagnosis;

	$data = array();

	$query = mysqli_query($conn, "SELECT q.firstname AS ufirst, q.middlename AS umiddle, q.lastname AS ulast, q.age, q.address, q.gender, w.firstname, w.middlename, w.lastname, e.recommendation FROM user q, doctor w, diagnose e, docsched r, appointment t WHERE q.userid=t.userid AND w.doctorid=r.doctorid AND r.schedid=t.schedid AND e.appointmentid=t.appointmentid AND e.diagnoseid='$diagnoseid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>