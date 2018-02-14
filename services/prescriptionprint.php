<?php 

	include '../connection/connect.php';

	// $worker = json_decode(file_get_contents("php://input"));

	$id = $_GET['userid'];

	$query = mysqli_query($conn, "SELECT q.firstname AS ufname, q.middlename AS umname, q.lastname AS ulname, q.gender, q.address, w.recommendation, e.firstname AS dfname, e.middlename AS dmname, e.lastname AS dlname  FROM user q, diagnose w, doctor e, docsched r, appointment t WHERE t.userid = q.userid AND e.doctorid=r.doctorid AND r.schedid=t.schedid AND q.userid='$id'");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=prescription_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<div style='padding-left: 270px;'>
		<img src='../images/logo.png' height='190' width='190' style='float: left'><div style='float: left;'>
			<h1 style='padding-bottom: 0px;'><strong>TOMBOC SALAYOG HOSPITAL</strong></h1>
		<h3 style='padding-top: 0px; padding-left: 30px;'>San Emmauel Tacurong City Sultan Kudarat 9800</h3>
		<h2 style='padding-top: 0px; padding-left: 100px;'><strong>CONTACT NO: 200-5760</strong></h2>
		</div>
	</div>";
	echo "<br><br><br><br><br><br><br><br><br><br><br><br>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<h5>ID: " . $row['medid']. "</h5>";
		echo "<div style='' text-align: center;'>
		<h3>Name:" . $row['ufname'] . " " . $row['umname'] . " " . $row['ulname'] . "                                               Age: " . $row['age'] . "           Gender: " . $row['gender'] . " </h3>
		<h3>Address: " . $row['address'] . "</h3>
	</div>
	<br><br><br>
	<div style='padding-left: 140px;'>
		<img src='../images/rx.png' height='50' width='50'><br><br>
		<h2 style='padding-left: 500px;'>" . $row['recommendation'] . "</h2>
	</div>
	<br><br><br><br>
	<div style='padding-left: 140px;'>
		<h2><strong>PHYSICIAN: " . $row['dfname'] . " " . $row['dmname'] . " " . $row['dlname'] . "</strong><strong>LICENSE NO:</strong></h2>
	</div>";
		
	}
	echo "</body>";
	echo "</html>";
 ?>