<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $doctor->id;

	$query = mysqli_query($conn, "SELECT * FROM drugallergy WHERE userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>