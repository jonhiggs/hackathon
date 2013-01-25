<?php
define("DATABASE_FILE", dirname(__FILE__)."/db.sqlite");
#$database = new SQLiteDatabase(DATABASE_FILE, 0666);
$database = new PDO('sqlite:'.DATABASE_FILE);

$database->exec("CREATE TABLE users (md5 VARCHAR(32) PRIMARY KEY, deaths INTEGER)");    
$database->exec("CREATE TABLE pokemon (id INTEGER PRIMARY KEY, type VARCHAR, image_path VARCHAR, owner VARCHAR(32))");    
$database->exec("CREATE TABLE living_pokemon (id INTEGER PRIMARY KEY, type INTEGER, owner VARCHAR(32))");    

?>
