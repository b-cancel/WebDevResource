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
	
	$this->view->render($response, 'recipe.html', [
		"recipe" => $recipe
		]);

	return $response;
})->setName('details');

//-------------------------START THE APP-------------------------

$app->run();

?>