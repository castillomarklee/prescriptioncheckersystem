<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->id;

	$data = array();

	$data["id"] = $id;

	echo json_encode($data);

 ?>