<?php

$password = "passwordLolz";
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

echo "<p> Password: \"" .  $password . "\"</p>";
echo "<p> Hash: \"" . $passwordHash . "\"</p>";

function passwordCheck($givenPassword, $passwordHash){
    $str = $givenPassword . "\" is";
    if (password_verify($givenPassword, $passwordHash)) {
        $str = $str . " Correcto";
    } else {
        $str = $str . " InCorrecto";
    }
    echo "<p>\"" . $str . " Passwordo</p>";
}

passwordCheck("passwordLolz", $passwordHash);
passwordCheck("idk mayn", $passwordHash);

?>