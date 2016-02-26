<?php

	$acc="";
	
	if ($acc=='ftp') {
		//DB configuration Constants
		define('_HOST_NAME_', 'localhost');
		define('_USER_NAME_', 'root');
		define('_DB_PASSWORD', '');
		define('_DATABASE_NAME_', 'mail_audi');
	}
	else if($acc=='a2eapp'){
		//DB configuration Constants
		define('_HOST_NAME_', 'localhost');
		define('_USER_NAME_', 'admin_audi');
		define('_DB_PASSWORD', 'Gyw3c1@7');
		define('_DATABASE_NAME_', 'admin_audi');
	}
	else {
		//DB configuration Constants
		define('_HOST_NAME_', 'localhost');
		define('_USER_NAME_', 'root');
		define('_DB_PASSWORD', '');
		define('_DATABASE_NAME_', 'audi_teasing');
	}
	
	
	//PDO Database Connection
	try {
		$databaseConnection = new PDO('mysql:host='._HOST_NAME_.';dbname='._DATABASE_NAME_, _USER_NAME_, _DB_PASSWORD);
		$databaseConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch(PDOException $e) {
		echo 'ERROR: ' . $e->getMessage();
	}

	

	

?>