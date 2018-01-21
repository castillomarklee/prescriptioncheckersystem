<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$id = $worker->id;
	$temperature = $worker->temperature;
	$cardiacrate = $worker->cardiacrate;
	$pulserate = $worker->pulserate;
	$bloodpressure = $worker->bloodpressure;
	$respiratoryrate = $worker->respiratoryrate;
	$oxygen = $worker->oxygen;

	$query = mysqli_query($conn, "UPDATE vitalsigns SET bp='$bloodpressure', cardiacrate='$cardiacrate', pulserate='$pulserate', temperature='$temperature', respiratoryrate='$respiratoryrate', oxygensaturation='$oxygen' WHERE vitalsignid='$id'");

 ?>