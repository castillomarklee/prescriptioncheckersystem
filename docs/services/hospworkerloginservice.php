<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$data = array();

	$username = $worker->username;
	$password = $worker->password;

	$id = "";
	$loginerror = false;


	$query = mysqli_query($conn, "SELECT username, workerid FROM hospworker WHERE username='$username' AND password='$password'");

	if(mysqli_num_rows($query)) {
		$loginerror = false;
		while ($querylist = mysqli_fetch_assoc($query)) {
			$id = $querylist['workerid'];
		}
		session_start();
		$_SESSION['worker'] = $id;
	} else {
		$loginerror = true;
	}

	$data["loginerror"] = $loginerror;
	$data["id"] = $_SESSION['worker'];

	echo json_encode($data);

 ?>