<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.appointmentid, q.appointmentdescription, q.status, w.schedtime, w.fromtime, w.totime, e.firstname, e.middlename, e.lastname, e.userid FROM appointment q, docsched w, user e WHERE q.schedid=w.schedid AND q.userid=e.userid AND STATUS='RESERVED'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}
	
	echo json_encode($data);

 ?>