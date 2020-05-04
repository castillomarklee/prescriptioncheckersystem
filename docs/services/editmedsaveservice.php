<?php 

	include '../connection/connect.php';

	$med = json_decode(file_get_contents("php://input"));

	$id = $med->id;
	$name = $med->name;
	$dosage = $med->dosage;
	$category = $med->category;
	$usage = $med->usage;

	$query = mysqli_query($conn, "UPDATE medicine SET medname='$name', dosage='$dosage', category='$category', meduse='$usage' WHERE medid='$id'");

 ?>