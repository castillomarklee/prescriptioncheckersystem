<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();

	$id = $_SESSION['user'];

	$query = mysqli_query($conn, "SELECT * FROM vitalsigns WHERE userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>