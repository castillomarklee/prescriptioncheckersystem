<?php

	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT q.appointmentid, q.appointmentdate, q.status, e.firstname AS uf, e.middlename AS um, e.lastname AS ul, r.firstname AS df, r.middlename AS dm, r.lastname AS dl FROM appointment q, docsched w, user e, doctor r WHERE q.schedid=w.schedid AND w.doctorid=r.doctorid AND q.userid=e.userid");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=appointmentlist_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<h1 style='text-align: center;'> Tomboc Salayog Hospital</h1><br><br><br><br>";
	echo "<h3>Appointment List:</h3><br>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<table>";
		echo "<thead>";
		echo "<th>ID</th>";
		echo "<th>Date</th>";
		echo "<th>Status</th>";
		echo "<th>Patient</th>";
		echo "<th>Doctor</th>";
		echo "</thead>";
		echo "<tbody>";
		echo "<td>" . $row['appointmentid']. "</td>";
		echo "<td>" . $row['appointmentdate']. "</td>";
		echo "<td>" . $row['status']. "</td>";
		echo "<td>" . $row['uf'] . " " . $row['um'] . " " . $row['ul'] . "</td>";
		echo "<td>" . $row['df'] . " " . $row['dm'] . " " . $row['dl'] . "</td>";
		echo "</tbody>";
		echo "</table>";
		// echo "<h5>ID: " . $row['appointmentid']. "</h5>";
		// echo "<h5>Date: " . $row['appointmentdate']. "</h5>";
		// echo "<h5>Status: " . $row['status'] . "</h5>";
		// echo "<h5>Patient: " . $row['uf'] . " " . $row['um'] . " " . $row['ul'] . "</h5>";
		// echo "<h5>Doctor: " . $row['df'] . " " . $row['dm'] . " " . $row['dl'] . "</h5><br>";
	}
	echo "</body>";
	echo "</html>";

 ?>