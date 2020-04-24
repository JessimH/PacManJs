<?php

function getUsers()
{
    $db = dbConnect();
    $query = $db->query('SELECT * FROM Users ORDER BY score DESC LIMIT 10');
		$posts = $query->fetchAll();
    
        return $posts;
}


function add($data){

  $db = dbConnect();
  //insertion en DB
$query = $db->prepare('INSERT INTO Users(id, name, score) VALUES (?,?,?)');
$result = $query-> execute(
    array(
        $data['id'],
        $data['name'],
        $data['score'],
    ));

return $result;
}

function userExist(){
    $db = dbConnect();
    $query = $db->query('SELECT name FROM Users');
		$result = $query->fetchAll();
        return $result;
}




