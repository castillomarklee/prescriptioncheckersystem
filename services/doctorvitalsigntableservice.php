<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.bp, q.cardiacrate, q.pulserate, q.temperature, q.respiratoryrate, q.oxygensaturation, w.firstname, w.middlename, w.lastname FROM vitalsigns q, user w WHERE q.userid=w.userid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>