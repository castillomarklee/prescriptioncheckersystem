<?php 

	include '../connection/connect.php';

	$diagnose = json_decode(file_get_contents("php://input"));

	$description = $diagnose->description;
	$complaint = $diagnose->complaint;
	$diagnosis = $diagnose->diagnosis;
	$recommendation = $diagnose->recommendation;
	$allergies = $diagnose->allergies;
	$appointmentid = $diagnose->appointmentid;

	$id = "TSdiagnose-" . rand(1, 1000) . "-" . rand(1, 10) . "-" . date("m-d-Y");

	$query = mysqli_query($conn, "INSERT INTO diagnose VALUES('$id', '$description', '$complaint', '$diagnosis', '$recommendation', '$allergies', '$appointmentid')");

	$appointmentstatus = mysqli_query($conn, "UPDATE appointment SET status='COMPLETED' WHERE appointmentid='$appointmentid'");

 ?>