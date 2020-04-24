<?php

//controlleur pour tout l'Ajax

require 'models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $posts = getUsers();
    echo json_encode($posts);  
    
}
else{

    $encodedData = file_get_contents("php://input");

    $data = json_decode($encodedData, true);
    
     if (empty($data['name'])) {
        $answer = [
            'error' => 'Nom obligatoire'
        ];
    }
    
    else{
        
        $result = add($data);
        $answer = [
            'message' => $result ? 'nouveau score bien enregistré' : 'score non enregistré',
            'newPost' => $data
        ];
    }
    echo json_encode($answer);
        
}


