<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$username = $worker->username;

	$data = array();

	$usernameexist = false;

	$userid = "";

	$query = mysqli_query($conn, "SELECT userid FROM user WHERE username='$username'");

	if(mysqli_num_rows($query)) {
		$usernameexist = true;
		while ($querylist = mysqli_fetch_assoc($query)) {
			$userid = $querylist["userid"];
		}
	} else {
		$usernameexist = false;
	}

	$data["usernameexist"] = $usernameexist;
	$data["userid"] = $userid;

	echo json_encode($data);

 ?>