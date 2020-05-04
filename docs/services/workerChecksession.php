<?php 

	session_start();

	$data = array();
	$workersession = false;

	if(isset($_SESSION['worker']) && !empty($_SESSION['worker'])) {
		$workersession = true;
	}

	$data["workersession"] = $workersession;

	echo json_encode($data);

 ?>