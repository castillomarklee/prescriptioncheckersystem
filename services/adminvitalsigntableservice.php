<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.vitalsignid, w.firstname AS ufirst, w.middlename AS umiddle, w.lastname AS ulast, e.firstname AS wfirst, e.midlename AS wmiddle, e.lastname AS wlast FROM vitalsigns q, user w, hospworker e WHERE q.userid=w.userid AND q.workerid=e.workerid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[]= $querylist;
	}

	echo json_encode($data);

 ?>