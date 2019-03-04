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
	$this->view->render($response, 'post.html');
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////

$app->post('/handlers/login', function($request, $response, $args) {
	$postVars = $request->getParsedBody();
	$username = $postVars['username'];
	$password = $postVars['password'];

	//retreive user by username
	$user = UserQuery::create()->findOneByUsername($username);
	$validUser = true;
	
	if($user){ //if user exists make sure they have the right password
		if(password_verify($password, $user->getPasswordHash()) == false){
			$validUser = false;
		}
	}
	else{ //else create an account for that user
		$user = new User();
		$user->setUsername($username);
		$user->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));
		$user->save();
	}
	
	if($validUser){
		echo json_encode(array('id' => $user->getId(), 'username' => $user->getUsername()));
	}
});

$app->post('/handlers/comment', function($request, $response, $args) {
	$postVars = $request->getParsedBody();
	$id = $postVars['id'];
	$body = $postVars['body'];
	$errors = array();

	$user = UserQuery::create()->findOneById($id);
	if($user == false){
		$errors["usernameError"] = "This username does not exists";
	}
	if(strlen($body) == 0){
		$errors["commentError"] = "The comment must not be blank";
	}
	//TODO... somehow check if this is the correct date and time... note that php and javascript might have 2 different formats and they might be a little off
	if(count($errors) == 0){
		$comment = new Comment();
		$comment->setAuthorId($id);
		$comment->setBody($body);
		$date = date('Y-m-d H:i:s');
		$comment->setCreateTime($date);
		$comment->save();
		echo json_encode(array("id" => $comment->getId(), "date" => $date));
	}
	else{
		echo json_encode($errors);
	}
});

$app->post('/handlers/update', function($request, $response, $args) {
	$postVars = $request->getParsedBody();
	$lastPostId = $postVars['lastPostId'];
	
	$newComments = CommentQuery::create()->filterById(array('min' => $lastPostId + 1))->orderById();
	$result = array();

	$i = 0;
	foreach($newComments as $newComment){
		$user = UserQuery::create()->findOneById($newComment->getAuthorId());
		$commentObj = array(
			"id" => $newComment->getId(), 
			"username" => $user->getUsername(), 
			"comment" => $newComment->getBody(), 
			"date" => $newComment->getCreateTime()
		);
		$result[$i] = $commentObj;
		$i++;
	}

	echo json_encode($result);
});

/*
//Logout.php handler which should simply sends back { "success" : "true" } in JSON (still nothing to do on the server-side). 
//future ajax logout handler
$app->get('/handlers/logout', function($request, $response, $args) {

});
*/

//////////////////////
// App run
//////////////////////

$app->run();
