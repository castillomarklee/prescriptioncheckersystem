<?php 

	include '../connection/connect.php';

	$med = json_decode(file_get_contents("php://input"));

	$id = $med->id;

	$query = mysqli_query($conn, "DELETE FROM medicine WHERE medid='$id'");

 ?>