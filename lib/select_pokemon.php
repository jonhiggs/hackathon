<?php
pokemon_type="1";
owner="blah";

include "../settings.php";
$query = $database->prepare("INSERT INTO living_pokemon (type, owner) VALUES (:type, :owner);");
$query->bindParam(':type', $pokemon_type);
$query->bindParam(':owner', $owner);
$query->execute();

?>
