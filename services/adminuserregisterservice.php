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
	$username = $admin->username;
	$password = $admin->password;

	$usernameexist = false;
	$usernamelength = false;
	$passwordlength = false;

	$data = array();

	$checkusername = mysqli_query($conn, "SELECT userid FROM user WHERE username='$username'");

	if(mysqli_num_rows($checkusername)) {
		$usernameexist = true;
	} else {
		if(strlen($username) < 5) {
			$usernamelength = true;
		} else if(strlen($password) < 5) {
			$passwordlength = true;
		} else {
			$id = "TSuser-" . rand(1, 10) . "-" . rand(1, 500) . "-" . date("m-d-Y");
			$date = date("m-d-Y");

			$query = mysqli_query($conn, "INSERT INTO user VALUES('$id', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$nationality', '$address', '$username', '$password', '$date')");
		}
	}

	$data["usernameexist"] = $usernameexist;
	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;

	echo json_encode($data); 


 ?>