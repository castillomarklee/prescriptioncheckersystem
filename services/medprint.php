<?php

	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT * FROM medicine");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=medicine_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<h1 style='text-align: center;'> Tomboc Salayog Hospital</h1><br><br><br><br>";
	echo "<h3>Medicine List:</h3>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<table>";
		echo "<thead>";
		echo "<th>ID</th>";
		echo "<th>Name</th>";
		echo "<th>Category</th>";
		echo "<th>Use</th>";
		echo "</thead>";
		echo "<tbody>";
		echo "<td>" . $row['medid']. "</td>";
		echo "<td>" . $row['medname']. "</td>";
		echo "<td>" . $row['category']. "</td>";
		echo "<td>" . $row['meduse']. "</td>";
		echo "</tbody>";
		echo "</table>";
		// echo "<h5>ID: " . $row['medid']. "</h5>";
		// echo "<h5>Medicine: " . $row['medname']. "</h5>";
		// echo "<h5>Dosage: " . $row['dosage'] . "</h5>";
		// echo "<h5>Category: " . $row['category'] ."</h5>";
		// echo "<h5>Usage: " . $row['meduse'] ."</h5><br>";
	}
	echo "</body>";
	echo "</html>";

 ?>