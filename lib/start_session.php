<?php

$user_id = $_GET['token'];

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
  $query = $database->prepare("SELECT * FROM living_pokemon WHERE owner=:id");
  $query->bindParam(':id', $id);
  $query->execute();
  $result = $query->fetchAll();

  $pokemons = array();
  foreach ($result as $data) {
    array_push($pokemons, $data['id']);
  }
  return "[" . implode(",", $pokemons) . "]";
}

if ( user_exists($user_id) ) {
  echo "user exists\n";
} else {
  echo "user doesn't exist\n";
  echo "need to create user\n";
  create_user($user_id);
}

?>

{'user_token': '<?php $user_id ?>', 'pokemon': '<?php echo get_pokemons($user_id) ?>'}
