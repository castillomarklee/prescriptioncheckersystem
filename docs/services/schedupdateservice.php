<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$id = $doctor->id;
	$desc = $doctor->desc;
	$sched = $doctor->sched;

	$query = mysqli_query($conn, "UPDATE docsched SET scheddesc='$desc', schedtime='$sched' WHERE schedid='$id'");

 ?>