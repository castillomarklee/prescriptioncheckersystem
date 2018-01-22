<?php 

	include '../connection/connect.php';

	$data = array();

	$user = json_decode(file_get_contents("php://input"));

	$id = $user->id;

	$query = mysqli_query($conn, "SELECT * FROM docsched WHERE doctorid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>