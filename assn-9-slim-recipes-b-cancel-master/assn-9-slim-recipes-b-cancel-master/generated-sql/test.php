<?php
// invoke autoload to get access to the propel generated models
require_once 'vendor/autoload.php';

// require the config file that propel init created with your db connection information
require_once 'generated-conf/config.php';

// now this script can access the database through the propel models!

// retreive a person by id and print their name
// note that the getters were generated based on the db col names first_name and last_name

$p = RecipeQuery::create()->findPk(6);
echo "<p>".$p->getDescription().", ".$p->getId()."</p>";

/*
// retrieve a person by last name
$p = PeopleQuery::create()->filterByLastName("Bradley")->findOne();
echo "<p>".$p->getLastName().", ".$p->getFirstName()."</p>";

// add a new person to the database (every time you reload this page)
$p = new People();
$p->setFirstName("Test");
$p->setLastName("Guy");
$p->save();

echo "<p>Saved ".$p->getLastName().", ".$p->getFirstName()." with ID ".$p->getId()."</p>";
*/
?>