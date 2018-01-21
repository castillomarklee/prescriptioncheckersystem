<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $worker->id;

	$query = mysqli_query($conn, "SELECT * FROM user WHERE userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>