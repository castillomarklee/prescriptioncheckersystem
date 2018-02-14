<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$doctorid = $_SESSION['doctor'];

	$query = mysqli_query($conn, "SELECT * FROM doctor WHERE doctorid='$doctorid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>