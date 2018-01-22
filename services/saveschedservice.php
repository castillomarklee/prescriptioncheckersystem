<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$desc = $doctor->desc;
	$sched = $doctor->sched;

	$data = array();

	$schedexist = false;

	$checkschedexist = mysqli_query($conn, "SELECT * FROM docsched WHERE schedtime='$sched'");

	if(mysqli_num_rows($checkschedexist)) {
		$schedexist = true;
	} else {
		$id = "TSdocsched-" . rand() . "-" . rand(1, 100000);
		session_start();
		$docid = $_SESSION['doctor'];
		$datecreate = date("m-d-Y");
		
		$query = mysqli_query($conn, "INSERT INTO docsched VALUES('$id', '$desc', '$sched', '$datecreate', '$docid')"); 
	}

	$data["schedexist"] = $schedexist;
	$data["id"] = $id;
	$data["desc"] = $desc;
	$data["sched"] = $sched;
	$data["datecreate"] = $datecreate;
	$data["docid"] = $docid;

	echo json_encode($data);	

 ?>