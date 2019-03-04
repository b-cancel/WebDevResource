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
	$view = new \Slim\Views\Twig('../templates');
	
	$basePath = rtrim(str_ireplace('index.php', '', 
	$container->get('request')->getUri()->getBasePath()), '/');

	$view->addExtension(
	new Slim\Views\TwigExtension($container->get('router'), $basePath));
	
	return $view;
};

//start a session
session_start();

//////////////////////
// Routes
//////////////////////

// home page route
$app->get('/', function ($request, $response, $args) {
	$enemies = EnemyQuery::create()->orderByPriority();
	$this->view->render($response, 'thelist.html', [
		'enemies'=>$enemies,
		'killCount'=>isset($_SESSION['killCount']) ? strval($_SESSION['killCount']) : null,
	]);
	return $response;
});

// add enemy route
$app->post('/add', function ($request, $response, $args) {

	$priority = (isset($_POST['priority'])) ? $_POST['priority'] : "";
	$username = (isset($_POST['username'])) ? $_POST['username'] : "";
	$justification = (isset($_POST['justification'])) ? $_POST['justification'] : "";

	//check for errors
	$message = "";
	if($priority == "") $message = "Your priority must not be blank ";
	if($priority != "" && is_numeric ($priority) == false) $message = $message . "Your priority must be a number ";
	if($username == "") $message = $message . (($message == "") ? "" : "and ") . "Your username must not be blank";

	//different actions depending on error precense
	if($message == ""){
		$enemy = new Enemy();
		$enemy->setPriority($priority);
		$enemy->SetUsername($username);
		$enemy->SetJustification($justification);
		$enemy->save();

		//clear our variables because there is no error
		$priority = "";
		$username = "";
		$justification = "";
	}

	//grab the list of enemies that now includes your new addition
	$enemies = EnemyQuery::create()->orderByPriority();

	//send variables off to the page
	$this->view->render($response, 'thelist.html',[
		'enemies'=>$enemies,
		'killCount'=>isset($_SESSION['killCount']) ? strval($_SESSION['killCount']) : null,
		//vars only set if there is an error
		'priority'=>$priority,
		'username'=>$username,
		'justification'=>$justification,
		'message'=>$message
	]);
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////

//remove enemy route
$app->post('/remove', function ($request, $response, $args) {
	$id = (isset($_POST['id'])) ? $_POST['id'] : "";

	if($id){
		$enemy = EnemyQuery::create()->findOneById($id);
		$enemy->delete();

		$currentKillCount = 0;
		if(isset($_SESSION['killCount'])) $currentKillCount = $_SESSION['killCount'];
		$_SESSION['killCount'] = $currentKillCount + 1;

		return strval($_SESSION['killCount']);
	}
});

//////////////////////
// App run
//////////////////////

$app->run();
