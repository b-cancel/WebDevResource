<?php
// invoke autoload to get access to the propel generated models
require_once 'vendor/autoload.php';

// require the config file that propel init created with your db connection information
require_once 'generated-conf/config.php';

// now this script can access the database through the propel models!

// retreive a recipe by id and print their name and description
// note that the getters were generated based on the db col names

$recipe = RecipeQuery::create()->findPk(2);
echo "<p>".$recipe->getName()." ::: ".$recipe->getDescription()."</p>";

// retrieve a person by last name
$recipe = RecipeQuery::create()->filterByName("OverNight Oats")->findOne();
echo "<p>".$recipe->getID()." ::: ".$recipe->getDescription()."</p>";

// add a new person to the database (every time you reload this page)
/*
$newRecipe = new Recipe();
$newRecipe->setName("123 some food thingy");
$newRecipe->setImageUrl("123 some url");
$newRecipe->setDescription("123 some description");
$newRecipe->setPrepTime(11111);
$newRecipe->setTotalTime(222222);
$newRecipe->save();

echo "<p>Saved ".$newRecipe->getName()." ::: ".$newRecipe->getImageUrl()." ::: ".$newRecipe->getDescription()." ::: ".$newRecipe->getPrepTime()." ::: ".$newRecipe->getTotalTime()."</p>";
*/

//---------NOT DONE---------

/*
$recipe = RecipeQuery::create()->filterByName("OverNight Oats")->findOne();

// retrieve children (one-to-many) on demand
foreach ($recipe->getPhoneNumbers() as $pn) {
  echo "<p>".$pn."</p>";
}
*/
/*

$p = PeopleQuery::create()->filterByLastName("Bradley")->findOne();

// retrieve children (one-to-many) on demand
// note the unfortunate pluralization of "phone_numbers"
foreach ($p->getPhoneNumberss() as $pn) {
  echo "<p>".$pn."</p>";
}

// just grab the first phone number
$pn = PhoneNumbersQuery::create()->findOne();

// retrieve single child (still unfortuate naming)
echo "<p>".$pn->getPeople()."</p>";
*/
?>