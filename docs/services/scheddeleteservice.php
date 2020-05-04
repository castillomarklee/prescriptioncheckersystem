<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$id = $doctor->id;

	$query = mysqli_query($conn, "DELETE FROM docsched WHERE schedid='$id'");

	$appointmentdelete = mysqli_query($conn, "DELETE from appointment WHERE schedid='$id'")

 ?>