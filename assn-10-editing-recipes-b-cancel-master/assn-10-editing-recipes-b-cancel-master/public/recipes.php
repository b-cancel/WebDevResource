<?php

//-------------------------DEPENDANCIES-------------------------

// autoload slim, twig, and Propel
require '../vendor/autoload.php';

// require the config file that propel init created with your db connection information
require_once '../generated-conf/config.php';

//-------------------------SETUP-------------------------

// adding an external config file to show errors
$settings = ['displayErrorDetails' => true];
$app = new \Slim\App(['settings' => $settings]);

// Twig setup
$container = $app->getContainer();

// note that this file lives in a subdirectory, so templates is up a level
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig("../templates/", [
        'cache' => false
    ]);

    $router = $container->get('router');
    $uri = rtrim(str_ireplace('index.php', '', $container->get('request')->getUri()->getBasePath()), '/');
    //$uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER)); //first version of setup code
	$view->addExtension(new Slim\Views\TwigExtension($router, $uri));

    return $view;
};

//-------------------------ROUTES-------------------------

$app->get('/', function ($request, $response, $args) {
	$recipes = RecipeQuery::create()->find();
	$this->view->render($response, 'recipes.html', [
		"recipes" => $recipes
    ]);

	return $response;
})->setName('recipes');

$app->get('/recipe/{id}', function($request, $response, $args) {

    $recipe = RecipeQuery::create()->findPk($args['id']);

    //TODO... check that this does not break with 0 steps

    //insert recipes into hash with key as step number for "sorting"
    $steps = array();
    foreach ($recipe->getStepss() as &$step){
        $steps[$step->getStepNumber()-1] = $step;
    }
    
	$this->view->render($response, 'recipe.html', [
        "recipe" => $recipe,
        "steps" => $steps,
        "stepsLength"=> (count($steps) - 1)
    ]);

    return $response;
})->setName('details');

//-------------------------AJAX HANDLERS-------------------------

//TODO...
//---allow the rearranging of steps
//---allow the addition of a step
//---allow the deletion of a step

//----------Data Edit

$app->get('/handlers/recipeName/{recipeID}/{newName}', function($request, $response, $args) { //255
    $recipe = RecipeQuery::create()->findPk($args['recipeID']);
    $recipe->setName($args['newName']);
    $recipe->save();
});

$app->get('/handlers/recipePrepTime/{recipeID}/{newPrep}', function($request, $response, $args) { //10
    $recipe = RecipeQuery::create()->findPk($args['recipeID']);
    $recipe->setPrepTime($args['newPrep']);
    $recipe->save();
});

$app->get('/handlers/recipeTotalTime/{recipeID}/{newTotal}', function($request, $response, $args) { //10
    $recipe = RecipeQuery::create()->findPk($args['recipeID']);
    $recipe->setTotalTime($args['newTotal']);
    $recipe->save();
});

$app->get('/handlers/recipeDescription/{recipeID}/{newDescription}', function($request, $response, $args) { //1024
    $recipe = RecipeQuery::create()->findPk($args['recipeID']);
    $recipe->setDescription($args['newDescription']);
    $recipe->save();
});

$app->get('/handlers/step/{stepID}/{newStep}', function($request, $response, $args) { //255
    $step = StepsQuery::create()->findPk($args['stepID']);
    $step->setDescription($args['newStep']);
    $step->save();
});

//----------Data Create

$app->get('/handlers/addStep/{recipeID}/{number}/{description}', function($request, $response, $args) {
    //add new step
    $step = new Steps();
    $step->setRecipeId($args['recipeID']);
    $step->setStepNumber($args['number']); //TODO uncomment when we are allowed to add a step in whatever position we want
    $step->setDescription($args['description']); //TODO make it possible to submit a description in the url
    $step->save();

    echo $step->getId();
});

//----------Data Reorder

//NOTE: locations are based on 1
$app->get('/handlers/rearrange/{recipeID}/{oldStepNumber}/{newStepNumber}', function($request, $response, $args) {
    //read params
    $oldStepNumber = $args['oldStepNumber'];
    $newStepNumber = $args['newStepNumber'];

    //check if the server has to be updated
    if($oldStepNumber != $newStepNumber){
        //find the id of the step that was moved
        $recipe = RecipeQuery::create()->findPk($args['recipeID']);
        $movedStepID = -1;
        
        //update the step number of all the steps
        foreach ($recipe->getStepss() as &$step){
            $thisStepNumber = $step->getStepNumber();
            if($thisStepNumber == $oldStepNumber){ //update the step we moved
                $step->setStepNumber($newStepNumber);
            }
            else{ //update the steps that we didnt move
                if($oldStepNumber < $newStepNumber){ //moved our item down (shift others up)
                    if($oldStepNumber < $thisStepNumber && $thisStepNumber <= $newStepNumber){
                        $step->setStepNumber($thisStepNumber - 1);
                    }
                }
                else{ //moved our item up (shift others down)
                    if($newStepNumber <= $thisStepNumber && $thisStepNumber < $oldStepNumber){
                        $step->setStepNumber($thisStepNumber + 1);
                    }
                }
            }
            $step->save();
        }
    }
});

//-------------------------START THE APP-------------------------

$app->run();

?>