<!DOCTYPE html>

<html lang="fr-FR">

<head>
    <meta charset="UTF-8">

    <title>Vanilla Pac-Man</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <section class="highScore">
        <div class="logo">
            <img src="assets/images/pacman-logo.png" width="385" height="205" alt="logo Pacman">
        </div>
        <div class="level">
            <p>level :</p>
            <h2 id="level">1</h2>
        </div>
        <div class="classement">
            <h2>SCORES</h2>
            <ul></ul>
        </div>

    </section>

    <section class="Game">

        <div class="map">
            <img src="assets/images/pacman.gif" alt="Pac-Man">
            <img class="g" src="assets/images/redghost.png" alt="red-Ghost">
            <img class="g" src="assets/images/pinkghost.png" alt="pink-Ghost">
            <img class="g" src="assets/images/blueghost.png" alt="blue-ghost">
            <img src="assets/images/background.svg" alt="Labyrinthe">
        </div>
    </section>

    <section class="info">
        <div class="score">
            <div class="dott"></div>
            <h2 id="score">0</h2>
        </div>
        <img class="controls" src="assets/images/controls.png" width="300" height="217" alt="">
        <button style="background-color: white; border-color: white" class="nG"><a href="index.php">PLAY</a></button>
    </section>


    <div class="Input" id="Input">
        <img src="assets/images/pacman-logo.png" width="385" height="205" alt="logo Pacman">
        <input style="text-align: center; cursor: pointer" class="play" value="JOUER">
        <img class="ghost" src="assets/images/inputghost.png" alt="ghost">
    </div>

    <div id="loser" class="loser">
        <h1>VOUS AVEZ PERDU!</h1>
        <div class="scorefin">
            <input type="text" id="name" name="name" placeholder="Entrez un pseudo (3 charactères min)" size="31%" class="text_input"autofocus required>
            <h2>Bravo! votre score est de:
                <span id="userScore">0</span>
            </h2>
        </div>
        <div style="color: white" class="message"></div>
        <input id="save" type="submit" class="submit_input" value="Enregistrer le score">
        <button  class="nG"><a href="index.php">rejouer</a></button>
    </div>

    <script src="main.js"></script>

</body>

</html>