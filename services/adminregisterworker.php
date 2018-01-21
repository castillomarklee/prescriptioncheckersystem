<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));	

	$firstname = $admin->firstname;
	$middlename = $admin->middlename;
	$lastname = $admin->lastname;
	$age = $admin->age;
	$gender = $admin->gender;
	$address = $admin->address;
	$nationality = $admin->nationality;
	$position = $admin->position;
	$username = $admin->username;
	$password	 = $admin->password;

	$data = array();

	$usernameexists = false;
	$usernamelength = false;
	$passwordlength = false;

	$checkusername = mysqli_query($conn, "SELECT workerid FROM hospworker WHERE username='$username'");

	if(mysqli_num_rows($checkusername)) {
		$usernamelength = true;
	} else {
		if(strlen($username) < 5) {
			$usernamelength = true;
		} else if(strlen($password) < 5) {
			$passwordlength = true;
		} else {
			$id = "TSWORK-" . rand(1, 10) . "-" . rand(1, 500) . "-" . date("m-d-Y");
			$query = mysqli_query($conn, "INSERT INTO hospworker VALUES('$id', '$firstname', '$middlename', 'lastname', '$age', '$gender', '$address', '$nationality', '$position', '$username', '$password')");
		}
	}

	$data["usernameexists"] = $usernameexists;
	$data["usernamelength"] = $usernameexists;
	$data["passwordlength"] = $passwordlength;

	echo json_encode($data);

 ?>