<html>

<head>
<title>PHP Basics</title>
</head>

<body>

<h1>PHP Exercises</h1>

<p>Edit this file and upload to the repo here:</p>

<pre>https://classroom.github.com/a/C30qbA_J</pre>

<h3>Question 1</h3>

<!--Mon, Oct 15, 2018, 2:08pm-->
<p>Put the current date and time right here: <?php echo date('l, F jS, Y h:i:sa'); ?>
</p>

<h3>Question 2</h3>

<?php
// Function to get the client ip address (from php)
function get_client_ip_env() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}

// Function to get the client ip address (from apache)
function get_client_ip_server() {
    $ipaddress = '';
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}
?>

<p>Print the IP address of the client browser right here: <?php echo get_client_ip_env() ?></p>

<h4>Question 3</h4>

<?php
// fake item data using a php associative array
$favoriteThings = [
	[
		'name' => "Octopi",
	 	'line' => 'are cool',
	 	'list' => [
			"They can change their skin to hide within anything",
			"They have parts of their brain spread out throughout their body",
			"cuz they smart"
		]
	],
	[
		'name' => "Sandwhiches",
	 	'line' => 'are Versatile and delicious',
	 	'list' => [
			"They can be made out of nearly anything",
			"Their are limitless combinations",
			"They are limitlessly delicous",
			"They are easy to make"
		]
	]
]
?>

<p>Create an associative array of your favorite things and print them out like so:</p>

<?php foreach($favoriteThings as $thing) { ?>

<div style="border:1px solid black; padding: 5px; width: 50%; margin: 5px">
	<p><strong><?=$thing['name']?></strong></p>
	<p><em><?=$thing['line']?></em></p>
	<p>Because...</p>
	<ol>
		<?php foreach($thing['list'] as $items) { ?>
			<li><?=$items?></li>
		<?php } ?>
	</ol>
</div>

<?php } ?>

<h3>Question 4</h3>

<p>The link below comes back to this same page, with a querystring added to the URL.</p>

<p>Finish the question (answer only appears when you click on the link):</p>

<p><a href="?n1=14&n2=16">14 + 16 = 
	<?php 
		if (isset($_GET['n1']) && isset($_GET['n2'])) {
			echo $_GET['n1'] + $_GET['n2'];
		}
	?>
</a></p>

<h3>Question 5</h3>

<p>The form below POSTs back to this page (empty action). When the POST comes
in, reverse whatever they typed in the box.</p>

<form action="" method="POST">
	<!--
		NOTE: the entire string, reversed should be displayed on the field after submission
		BUT something we cannot control is breaking, you can test this by literally echoing just $_POST["nickname"]
		The Network Section of developer tools shows that the entire string is being sent
		but when you echo the above into value you ONLY get the first word in the string
		NOTE: I already confirmed that "strrev" AND OR "htmlspecialchars" is NOT causing the issue
	-->
	<p>My nickname: <input type="textbox" name="nickname"
		<?php if(isset($_POST["nickname"]) && strlen((string)$_POST["nickname"]) > 0){ ?>
			value = 
		<?php echo htmlspecialchars(strrev($_POST["nickname"])); }?>
	/></p>

	<input type="submit" name="submitBtn" value="Reverse it"/>

</form>

</body>
</html>