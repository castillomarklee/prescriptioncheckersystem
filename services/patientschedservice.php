<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$doctorid = $_SESSION['doctor'];

	$query = mysqli_query($conn, "SELECT q.appointmentid, q.appointmentdescription, q.status, w.schedtime, w.fromtime, w.totime, e.firstname, e.middlename, e.lastname, e.userid FROM appointment q, docsched w, user e, doctor r WHERE q.schedid=w.schedid AND q.userid=e.userid AND w.doctorid=r.doctorid AND STATUS='RESERVED' AND r.doctorid='$doctorid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}
	
	echo json_encode($data);

 ?>