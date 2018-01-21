<?php 

	session_start();

	$data = array();
	$doctorsession = false;

	if(isset($_SESSION['doctor']) && !empty($_SESSION['doctor'])) {
		$doctorsession = true;
	}

	$data["doctorsession"] = $doctorsession;

	echo json_encode($data);

 ?>