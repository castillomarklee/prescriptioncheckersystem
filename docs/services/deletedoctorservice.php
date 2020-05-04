<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$doctorid = $admin->doctorid;

	$schedquery = mysqli_query($conn, "SELECT schedid FROM docsched WHERE doctorid='$doctorid'");

	$schedid = "";

	while ($schedidget = mysqli_fetch_assoc($schedquery)) {
		$schedid = $schedidget["schedid"];
	}

	$query = mysqli_query($conn, "DELETE FROM doctor WHERE doctorid='$doctorid'");

	$deletedocsched = mysqli_query($conn, "DELETE FROM docsched WHERE schedid='$schedid'");

	$deleteappointment = mysqli_query($conn, "DELETE FROM appointment WHERE schedid='$schedid'");

	$deletephotos = mysqli_query($conn, "DELETE FROM photos WHERE userid='$doctorid'");

 ?>