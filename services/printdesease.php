<?php 

	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT * FROM medicine");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=desease_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<div style='text-align: center;'>
			<h1><strong>TOMBOC SALAYOG HOSPITAL</strong></h1>
		<h3>San Emmauel Tacurong City Sultan Kudarat 9800</h3>
		<h2><strong>CONTACT NO: 200-5760</strong></h2>
		</div>
	</div><br><br><br><br><br>";
	echo "<h2><strong>Deseases:</strong></h2>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<h3 style='padding-bottom: 0px;'>" . $row['category'] ."</h3>";
	}
	echo "</body>";
	echo "</html>";

 ?>