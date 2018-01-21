<?php 

	include '../connection/connect.php';

	$worker = json_decode(file_get_contents("php://input"));

	$bp = $worker->bloodpressure;
	$cardiac = $worker->cardiacrate;
	$pulserate = $worker->pulserate;
	$temperature = $worker->temperature;
	$respiratory = $worker->respiratoryrate;
	$oxygen = $worker->oxygen;

	$vitalsignid = "TSvital-" . rand(1, 100) . "-" . rand(1, 1000) . date("m-d-Y");
	$vitalsigndate = date("m-d-Y");
	session_start();
	$workerid = $_SESSION['worker'];

	$data = array();

	$userid = "TSuser-" . rand(1, 10) . "-" . rand(1, 500) . "-" . date("m-d-Y");
	$firstname = $worker->firstname;
	$middlename = $worker->middlename;
	$lastname = $worker->firstname;
	$age = $worker->age;
	$gender = $worker->gender;
	$address = $worker->address;
	$nationality = $worker->nationality;
	$username = $worker->username;
	$password = $worker->password;
	$userdate = date("m-d-Y");

	

	$checkuserexist = mysqli_query($conn, "SELECT * FROM user WHERE username='$username'");

	if(mysqli_num_rows($checkuserexist)) {
		while ($querylist = mysqli_fetch_assoc($checkuserexist)) {
			$userid = $querylist["userid"];
		}

		$query = mysqli_query($conn, "INSERT INTO vitalsigns VALUES('$vitalsignid', '$bp', '$cardiac', '$pulserate', '$temperature', '$respiratory', '$oxygen', '$vitalsigndate', '$userid', '$workerid')");
	} else {
		$userid = "TSuser-" . rand(1, 10) . "-" . rand(1, 500) . "-" . date("m-d-Y");
		$query = mysqli_query($conn, "INSERT INTO vitalsigns VALUES('$vitalsignid', '$bp', '$cardiac', '$pulserate', '$temperature', '$respiratory', '$oxygen', '$vitalsigndate', '$userid', '$workerid')");

		$queryuser = mysqli_query($conn, "INSERT INTO user VALUES('$userid', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$nationality', '$address', '$username', '$password', '$userdate')");
	}



	$data["vitalsignid"] = $vitalsignid;
	$data["workerid"] = $workerid;
	$data["vitalsigndate"] = $vitalsigndate;

	echo json_encode($data);

 ?>