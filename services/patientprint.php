<?php 

	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT * FROM user");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=patient_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<h1 style='text-align: center;'> Tomboc Salayog Hospital</h1><br><br><br><br>";
	echo "<h3>Patient List:</h3><br>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<h5>Name: " . $row['firstname'] . " ". $row['middlename']. " " . $row['lastname'] . "</h5>";
		echo "<h5>Age: " .  $row['age'] . "</h5>";
		echo "<h5>Gender: " .$row['gender']."</h5>";
		echo "<h5>Address: " .$row['address']."</h5>";
		echo "<h5>Nationality: " .$row['nationality']."</h5><br>";
	}
	echo "</body>";
	echo "</html>";

 ?>