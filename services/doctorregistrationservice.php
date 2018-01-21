<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	$firstname = $doctor->firstname;
	$middlename = $doctor->middlename;
	$lastname = $doctor->lastname;
	$age = $doctor->age;
	$gender = $doctor->gender;
	$address = $doctor->address;
	$doctortype = $doctor->doctortype;
	$username = $doctor->username;
	$password = $doctor->password;

	$data = array();
	$usernamelength = false;
	$passwordlength = false;
	$usernameexist = false;

	$checkusername = mysqli_query($conn, "SELECT * FROM doctor WHERE username='$username'");

	if(mysqli_num_rows($checkusername)) {
		$usernameexist = true;
	} else {
		if(strlen($username) < 5) {
			$usernamelength = true;
		} else if(strlen($password) < 5) {
			$passwordlength = true;
		} else {
			$id = "TS-DOCTOR-" .rand(1, 10000). "-" .date("m-d-Y");
			$datecreated = date("m-d-Y");
			$query = mysqli_query($conn, "INSERT INTO doctor VALUES('$id', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$address', '$doctortype', '$username', '$password', '$datecreated')");
		}
	}

	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;
	$data["usernameexist"] = $usernameexist;
	$data["doctorid"] = $id;
	echo json_encode($data);


 ?>