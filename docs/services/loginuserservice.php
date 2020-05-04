<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$username = $user->username;
	$password = $user->password;

	$data = array();

	$querysuccess = false;

	$query = mysqli_query($conn, "SELECT userid FROM user WHERE username='$username' AND password='$password'");
	$id = "";

	if(mysqli_num_rows($query)) {
		while ($querylist = mysqli_fetch_assoc($query)) {
			$id = $querylist["userid"];
		}
		session_start();
		$_SESSION['user'] = $id;
		$querysuccess = false;
	} else {
		$id = "empty";
		$querysuccess = true;
	}

	$data["id"] = $id;
	$data["querysuccess"] = $querysuccess;

	echo json_encode($data);

 ?>