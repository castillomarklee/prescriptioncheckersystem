<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();

	$id = $_SESSION['doctor'];

	$query = mysqli_query($conn, "SELECT * FROM docsched WHERE doctorid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>