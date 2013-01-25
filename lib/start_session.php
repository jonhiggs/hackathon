<?php

$user_id = $_GET['token'];

function user_exists($id) {
  include(dirname(__FILE__)."/../settings.php");
  $response = $database->query("SELECT count(*) FROM users WHERE md5='$id'");
  if ($response->fetchColumn() > 0) {
    return true;
  } else {
    return false;
  }
}

function create_user($id) {
  include(dirname(__FILE__)."/../settings.php");
  $query = $database->prepare("INSERT INTO users (md5) VALUES (:id);");
  $query->bindParam(':id', $id);
  $query->execute();
}


function get_pokemon_type($pokemon_id) {
  $query = $database->prepare("SELECT (type) FROM pokemon WHERE id=:pokemon_id");
  $query->bindParam(':type', $pokemon_id);
  $query->execute();
  $result = $query->fetchAll();

  foreach ($result as $data) {
    return $data["type"];
  }
}

function get_pokemon_image_path($pokemon_id) {
  $query = $database->prepare("SELECT (image_path) FROM pokemon WHERE id=:pokemon_id");
  $query->bindParam(':id', $pokemon_id);
  $query->execute();
  $result = $query->fetchAll();

  foreach ($result as $data) {
    return $data["image_path"];
  }
}

function get_pokemons($id) {
  include(dirname(__FILE__)."/../settings.php");
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

if ( ! user_exists($user_id) ) {
  create_user($user_id);
}

?>

{'user_token': '<?php $user_id ?>',
'pokemon:' <?php
  foreach ( get_pokemons($user_id) as $pokemon_id ) {
    echo "'type:' '". get_pokemon_type($id) . "'";
    echo "'front_image:' '". get_pokemon_path($id) . "'";
    echo "'back_image:' 'b". get_pokemon_path($id) . "'";
  }?>
}
