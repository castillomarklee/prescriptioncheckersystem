<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$firstname = $user->firstname;
	$middlename = $user->middlename;
	$lastname = $user->lastname;
	$age = $user->age;
	$gender = $user->gender;
	$nationality = $user->nationality;
	$address = $user->address;
	$username = $user->username;
	$password = $user->password;

	$data = array();

	$usernamelength = false;
	$passwordlength = false;
	$availableusername = false;
	$querysuccess = false;

	if(strlen($username) < 5) {
		$usernamelength = true;
	} else if(strlen($password) < 5) {
		$passwordlength = true;
	} else {
		$checkusername = mysqli_query($conn, "SELECT username FROM user WHERE username='$username'");

		if(mysqli_num_rows($checkusername)) {
			$availableusername = true;
		} else {
			$id = "ts-" . rand(1, 10) . "-user-" . rand(1, 1000);
			$date = date("m-d-Y");
			$query = mysqli_query($conn, "INSERT into user VALUES('$id', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$nationality', 'address', '$username', '$password', '$date')");
			if($query) {
				$querysuccess = false;
			} else {
				$querysuccess = true;
			}
		}
	}

	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;
	$data["availableusername"] = $availableusername;
	$data["querysuccess"] = $querysuccess;

	echo json_encode($data);

 ?>