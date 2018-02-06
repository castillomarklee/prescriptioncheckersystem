<?php 

	include '../connection/connect.php';

	$diagnose = json_decode(file_get_contents("php://input"));

	$diagnoseid = $diagnose->diagnoseid;
	$description = $diagnose->description;
	$complaint = $diagnose->complaint;
	$diagnosis = $diagnose->diagnosis;
	$recommendation = $diagnose->recommendation;
	$drugallergies = $diagnose->drugallergies;

	$query = mysqli_query($conn, "UPDATE diagnose SET diagnosedescription='$description', patientcomplain='$complaint', diagnosis='$diagnosis', recommendation='$recommendation', drugallergies='$drugallergies' WHERE diagnoseid='$diagnoseid'");

 ?>