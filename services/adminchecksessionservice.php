<?php 

	session_start();

	$data = array();
	$adminsession = false;

	if(isset($_SESSION['admin']) && !empty($_SESSION['admin'])) {
		$adminsession = true;
	}

	$data["adminsession"] = $adminsession;

	echo json_encode($data);

 ?>