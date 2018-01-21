<?php 

	$admin = json_decode(file_get_contents("php://input"));

	$data = array();

	$username = $admin->username;
	$password = $admin->password;

	$adminusername = 'admin';
	$adminpassword = '12345';
	$loginsuccess = false;

	if($username == $adminusername && $password == $adminpassword) {
		$loginsuccess = true;
		session_start();
		$_SESSION['admin'] = $username;
	} else {
		$loginsuccess = false;
	}

	$data["loginsuccess"] = $loginsuccess;

	echo json_encode($data);

 ?>