<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.vitalsignid, q.bp, q.cardiacrate, q.pulserate, q.temperature, q.respiratoryrate, q.oxygensaturation, q.date_created, w.firstname, w.middlename, w.lastname, e.workerid FROM vitalsigns q, user w, hospworker e WHERE q.userid=w.userid AND q.workerid=e.workerid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>