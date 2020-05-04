<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->id;
	$firstname = $admin->firstname;
	$middlename = $admin->middlename;
	$lastname = $admin->lastname;
	$age = $admin->age;
	$gender = $admin->gender;
	$address = $admin->address;
	$nationality = $admin->nationality;
	$username = $admin->username;
	$password= $admin->password;

	$usernameexist = false;
	$usernamelength = false;
	$passwordlength = false;

	$data = array();

	$checkusername = mysqli_query($conn, "SELECT workerid FROM hospworker WHERE username='$username'");

	if(mysqli_num_rows($checkusername)) {
		$usernameexist = true;
	} else {
		if(strlen($username) < 5) {
			$usernamelength = true;
		} else if(strlen($password) < 5) {
			$passwordlength = true;
		} else {
			$query = mysqli_query($conn, "UPDATE hospworker SET firstname='$firstname', midlename='$middlename', lastname='$lastname', age='$age', gender='$gender', address='$address', nationality='$nationality', username='$username', password='$password' WHERE workerid='$id'");
		}
	}

	$data["usernameexist"] = $usernameexist;
	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;

	echo json_encode($data); 

 ?>	