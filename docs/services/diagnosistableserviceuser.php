<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$id = $_SESSION["user"];

	$query = mysqli_query($conn, "SELECT q.diagnoseid, q.diagnosedescription, q.patientcomplain, q.diagnosis, q.recommendation, q.drugallergies, w.appointmentid, w.appointmentdate, e.schedid, r.firstname, r.middlename, r.lastname FROM diagnose q, appointment w, docsched e, doctor r WHERE q.appointmentid=w.appointmentid AND w.schedid=e.schedid AND e.doctorid=r.doctorid AND w.userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
			$data[] = $querylist;
		}	

	echo json_encode($data);	

 ?>