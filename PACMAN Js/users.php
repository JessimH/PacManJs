<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=pacman;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (Exception $exception)
{
    die('Erreur : ' . $exception->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = $db ->query('SELECT * FROM Users ORDER BY score');
    $posts = $query->fetchAll();
    echo json_encode($posts);

} else {
    $encodedData = file_get_contents("php://input");

    $data = json_decode($encodedData, true);

    if (empty($data['name'])) {
        $answer = [
            'error' => 'Nom obligatoire'
        ];
    } else {

        $query = $db->prepare('INSERT INTO Users(id, name, score) VALUES (?,?,?)');
        $result = $query-> execute(
            array(
                $data['id'],
                $data['name'],
                $data['score'],
            ));

        $answer = [
            'message' => $result ? 'Nouveau score enregistré':'score non enregistré',
            'newPost' => $data
        ];
    }

    echo json_encode($answer);
}
