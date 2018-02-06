<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$id = $worker->id;

	$data = array();

	$query = mysqli_query($conn, "SELECT q.dname, q.date_created, w.firstname, w.middlename, w.lastname FROM drugallergy q, user w WHERE q.userid=w.userid AND w.userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>