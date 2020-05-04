<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$id = $worker->userid;
	$drug = $worker->drug;
	session_start();
	$workerid = $_SESSION['worker'];
	$idd = "TSallergy-" . rand(1, 1000) . "-" . date("m-d-Y");
	$date = date("m-d-Y");
	$drugtolowercase = strtolower($drug);

	$query = mysqli_query($conn, "INSERT INTO drugallergy VALUES('$idd', '$drugtolowercase', '$date', '$id', '$workerid')");


 ?>