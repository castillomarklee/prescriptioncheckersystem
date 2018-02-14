<?php 

	include '../connection/connect.php';

	$doctor = json_decode(file_get_contents("php://input"));

	session_start();
	$doctorid = $_SESSION['doctor'];

	$firstname = $doctor->firstname;
	$middlename = $doctor->middlename;
	$lastname = $doctor->lastname;
	$age = $doctor->age;
	$gender = $doctor->gender;
	$address = $doctor->address;
	$doctortype = $doctor->doctortype;
	$username = $doctor->username;
	$password = $doctor->password;

	$query = mysqli_query($conn, "UPDATE doctor SET firstname='$firstname', middlename='$middlename', lastname='$lastname', age='$age', gender='$gender', address='$address', doctortype='$doctortype', username='$username', password='$password' WHERE doctorid='$doctorid'");

 ?>