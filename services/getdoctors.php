<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.doctorid, q.firstname, q.middlename, q.lastname, q.age, q.gender, q.address, q.doctortype, w.photolink FROM doctor q, photos w WHERE q.doctorid=w.userid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>