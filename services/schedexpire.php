<?php 

	include '../connection/connect.php';

	$dateexpire = date("m-d-Y");

	$id = "";

	$querygetappointment = mysqli_query($conn, "SELECT schedid FROM docsched WHERE schedtime='$dateexpire'");

	while ($queryapplist = mysqli_fetch_assoc($querygetappointment)) {
		$id = $queryapplist["schedid"];
	}

	$query = mysqli_query($conn, "DELETE FROM docsched WHERE schedtime='$dateexpire'");

	$appointmentdelete = mysqli_query($conn, "DELETE FROM appointment WHERE schedid='$id'");

	// echo json_encode($data);

 ?>