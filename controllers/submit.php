<?php 
	session_start();
	$x = 1;

	if (isset($_SESSION['sends']) && $_SESSION['sends'] > 1) {
		$x = $_SESSION['sends'];
		$x++;
		$_SESSION['sends'] = $x;
	}
	else {
		$_SESSION['sends'] = 2;
		$x = $_SESSION['sends'];
	}
	if ($x > 20){
		
		$_SESSION['SenMail'] = false;
		die('Vous ne pouvez plus envoyer des messages');
	}
	else {

		date_default_timezone_set("Africa/Tunis");
		$time = date('Y-m-d H:i:s');

		require 'conx.php';

	

		$mail 	= trim($_POST['mail'])	;

					
		if(!empty($mail)){
			$records = $databaseConnection->prepare('INSERT INTO mail_audi (mail, date_submit) VALUES (:mail, :date_submit )');
			$records->bindParam(':mail', $mail);
			$records->bindParam(':date_submit', $time);
			
			if($records->execute()){
				echo 'true';
			}
		}
		else {
			echo('error');
		}
			

	}

?>



