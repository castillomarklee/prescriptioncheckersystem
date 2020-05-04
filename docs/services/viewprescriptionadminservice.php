<?php

include '../connection/connect.php';

$admin = json_decode(file_get_contents("php://input"));

$userid = $admin->userid;

$data = array();

$query = mysqli_query($conn, "SELECT q.diagnosedescription, q.patientcomplain, q.diagnosis, q.recommendation FROM diagnose q, appointment w, user e WHERE q.appointmentid=w.appointmentid AND w.userid=e.userid AND e.userid='$userid'");

while($querylist = mysqli_fetch_assoc($query)) {
    $data[] = $querylist;
}

echo json_encode($data);

 ?>