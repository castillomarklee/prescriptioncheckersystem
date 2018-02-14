<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.appointmentid, q.appointmentdate, q.appointmenttype, q.appointmentdescription, q.status, w.firstname AS userf, w.middlename AS userm, w.lastname AS userl, r.firstname AS docf, r.middlename AS docm, r.lastname AS docl FROM appointment q, user w, docsched e, doctor r WHERE q.userid=w.userid AND q.schedid=e.schedid AND e.doctorid=r.doctorid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>