<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$username = $doctor->username;
	$password = $doctor->password;

	$data = array();

	$id = "";
	$loginsuccess = false;

	$query = mysqli_query($conn, "SELECT doctorid FROM doctor WHERE username='$username' AND password='$password'");

	if(mysqli_num_rows($query)) {
		while ($querylist = mysqli_fetch_assoc($query)) {
			$id = $querylist["doctorid"];
		}
		session_start();
		$_SESSION['doctor'] = $id;
		$loginsuccess = false;
	} else {
		$id = "empty";
		$loginsuccess = true;
	}

	$data["id"] = $id;
	$data["loginsuccess"] = $loginsuccess;

	echo json_encode($data);

 ?>