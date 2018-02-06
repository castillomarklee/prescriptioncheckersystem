<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$schedid = $user->id;
	$desc = $user->desc;
	$time = $user->time;
	$doctorid = $user->doctorid;
	$queryqwe = false; 
	$data = array();

	session_start();

	$id = $_SESSION['user'];
	$appointmenttype = "Check Up";
	$appointmentdesc = "Patient for check up";
	$appointmentid = "TSapp" . rand(1, 100) . "-" . rand(1, 100000) . "-" . date("m-d-Y"); 

	$date = date("m-d-Y");

	$status = "RESERVED";

		$query = mysqli_query($conn, "INSERT INTO appointment VALUES('$appointmentid', '$time', '$appointmenttype', '$appointmentdesc', '$status', '$id', '$schedid', '$date')");

		$setappointmenttaken = mysqli_query($conn, "UPDATE docsched SET availability='TAKEN' WHERE schedid='$schedid'");

		if($query) {
			$queryqwe = true;
		}
		$data["asd"] = $queryqwe;
	echo json_encode($data);

 ?>