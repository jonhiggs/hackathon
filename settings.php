<?php
define("DATABASE_FILE", dirname(__FILE__)."/db.sqlite");
$database = new PDO('sqlite:'.DATABASE_FILE);

$database->exec("CREATE TABLE users (md5 VARCHAR(32) PRIMARY KEY, deaths INTEGER)");    
$database->exec("CREATE TABLE pokemon (id INTEGER PRIMARY KEY, type VARCHAR, image_path VARCHAR)");    
$database->exec("CREATE TABLE living_pokemon (id INTEGER PRIMARY KEY, type INTEGER, owner VARCHAR(32))");    

$database->exec("INSERT INTO pokemon (id, type, image_path) VALUES (1, 'Bulbasaur', '001.png');");
$database->exec("INSERT INTO pokemon (id, type, image_path) VALUES (4, 'Charmander', '004.png');");
$database->exec("INSERT INTO pokemon (id, type, image_path) VALUES (7, 'Squirtle', '007.png');");

?>
