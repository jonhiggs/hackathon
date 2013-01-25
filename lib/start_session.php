<?php

$user_id = "thisisatestmd5sum";

function user_exists($id) {
  include "../settings.php";
  echo "$id\n";
  $response = $database->query("SELECT count(*) FROM users WHERE md5='$id'");
  if ($response->fetchColumn() > 0) {
    return true;
  }else {
    return false;
  }
}

function create_user($id) {
  include "../settings.php";
  $query = $database->prepare("INSERT INTO users (md5) VALUES (:id);");
  $query->bindParam(':id', $id);
  $query->execute();
}

function get_pokemons($id) {
  include "../settings.php";
  $query = $database->prepare("SELECT * FROM pokemon WHERE owner=:id");
  $query->bindParam(':id', $id);
  $query->execute();
  $result = $query->fetchAll();
  print_r($result);
  return $result
}

if ( user_exists($user_id) ) {
  echo "user exists\n";
} else {
  echo "user doesn't exist\n";
  echo "need to create user\n";
  create_user($user_id);
}

get_pokemons()


?>

{'user_token': '<?php $user_id ?>', 'pokemon': []}
