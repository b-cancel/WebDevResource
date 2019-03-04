<?php
require '../vendor/autoload.php';
require '../generated-conf/config.php';

//////////////////////
// Slim Setup
//////////////////////

$settings = ['displayErrorDetails' => true];

$app = new \Slim\App(['settings' => $settings]);

$container = $app->getContainer();
$container['view'] = function($container) {
	$view = new \Slim\Views\Twig("../templates/", [
        'cache' => false
    ]);

    $router = $container->get('router');
    $uri = rtrim(str_ireplace('index.php', '', $container->get('request')->getUri()->getBasePath()), '/');
    //$uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER)); //first version of setup code
	$view->addExtension(new Slim\Views\TwigExtension($router, $uri));
	
	return $view;
};

//////////////////////
// Routes
//////////////////////

// home page route
$app->get('/', function ($request, $response, $args) {
	$this->view->render($response, 'home.html');
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////

$app->post('/handlers/login', function($request, $response, $args) {
	$postVars = $request->getParsedBody();
	$username = $postVars['u'];
	$password = $postVars['p'];

	//retreive user by username
	$user = UserQuery::create()->findOneByUsername($username);
	
	if($user){ //if user exists make sure they have the right password
		if(password_verify($password, $user->getPasswordHash())){
			echo $user->getPasswordHash();
		}
		else{
			echo "none";
		}
	}
	else{ //else create an account for that user
		$newUser = new User();
		$newUser->setUsername($username);
		$newUser->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));
		$newUser->save();
		echo $newUser->getPasswordHash();
	}
});


/*
//future ajax logout handler
$app->get('/handlers/logout', function($request, $response, $args) {

});
*/

//////////////////////
// App run
//////////////////////

$app->run();
