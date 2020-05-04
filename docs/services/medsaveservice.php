<?php 

	include '../connection/connect.php';

	session_start();

	$id = $_SESSION['worker'];

	$worker = json_decode(file_get_contents("php://input"));

	$name = $worker->name;
	$dosage = $worker->dosage;
	$category = $worker->category;
	$usage = $worker->usage;

	$medid = "TSmed-" . rand(1, 10000) . "-" . rand(1, 1000) . "-" . date("m-d-Y");

	$query = mysqli_query($conn, "INSERT INTO medicine VALUES('$medid', '$name', '$dosage', '$category', '$usage', '$id')");

	$data = array();

	$data["medid"] = $medid;
	$data["name"] = $name;
	$data["dosage"] = $dosage;
	$data["category"] = $category;
	$data["usage"] = $usage;

	echo json_encode($data);

 ?>