<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();

	$id = $_SESSION['user'];

	$query = mysqli_query($conn, "SELECT q.appointmentdate, e.firstname, e.middlename, e.lastname, e.doctortype FROM appointment q, docsched w, doctor e WHERE q.schedid=w.schedid AND w.doctorid=e.doctorid AND q.userid='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>