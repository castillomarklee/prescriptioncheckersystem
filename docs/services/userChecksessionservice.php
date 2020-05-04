<?php 

	session_start();

	$data = array();
	$usersession = false;

	if(isset($_SESSION['user']) && !empty($_SESSION['user'])) {
		$usersession = true;
	}

	$data["usersession"] = $usersession;

	echo json_encode($data);

 ?>