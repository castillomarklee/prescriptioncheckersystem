<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$id = $worker->id;

	$query = mysqli_query($conn, "DELETE FROM vitalsigns WHERE vitalsignid='$id'");

 ?>