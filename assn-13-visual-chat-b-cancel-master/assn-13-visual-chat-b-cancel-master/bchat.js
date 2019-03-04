/// put focus on login textbox
$("#name").focus();

// constants (to start sprites in the middle of the screen)
var START_LEFT = 500
var START_TOP = 350

///////////////////////////////////////////////////////////
// Part 1: Pre-Login

// create a new EventSource connection to the server
// (http://104.154.205.106/events) [not working :(]
const eventSource = new EventSource('https://immense-brook-23107.herokuapp.com/events');

// log each message to the page, showing the last three
// (replace the mockup "event happened" lines)

///////////////////////////////////////////////////////////
// Part 2: Login

// hooks for login
$("#login").click(dologin);
$("#name").on("keypress", function(e) {
    if( e.keyCode == 13 ) {
        dologin();
    }
})

// useful helper function
function check_name( name ) {
    return name != '' && name != 'name' && name.match( "^[0-9a-zA-Z]*$" );
}

function dologin() {
	// make sure name is not blank or screwy
    if( !check_name( $("#name").val() ) ){
        $("#hint").css("color", "red")
    } else {
        // get name from textbox
        userName = $("#name").val()

        // create socket to server (http://104.154.205.106)
        socket = io("https://immense-brook-23107.herokuapp.com/");

        // send LOGIN message (see server.js for details)
        socket.emit('LOGIN', {"name":userName})

        loginResponse(socket)
        loginMessage(socket)
        chatResponse(socket)
    }
}


///////////////////////////////////////////////////////////
// Login Response

// when receive LOGIN_RESPONSE message...
//  - hide login, show playfield
//  - instantiate a sprite for each current username (see server.js for details)
function loginResponse(socket)
{
    socket.on('LOGIN_RESPONSE', function(data){
        //hide login, show playfield
        setup();
        //sprite for each user
        $.each(data, function(i, val) {
            //fixes weird server side issue with first index
            if (i != 0){
                instantiate(val)
                console.log(val)
            }
            
        })
    })
}

// helpers
function setup() {
    $("#login_dlg").hide()
    $("#playfield").show()
}

function instantiate(name, self) {
    sp = $("#template").clone()
    sp.find("div").text(name)
    sp.attr("id", name)
    if (self) {
      sp.addClass('sprite-self')
    }

    sp.css("left", START_LEFT)
    sp.css("top", START_TOP)
    $("#playfield").append(sp)
    sp.show()
}

// when receive LOGIN message...
// - append login notice to chat log
// - instantiate sprite for provided username (see server.js for details)
function loginMessage(socket){
    socket.on('LOGIN', function(data){
        var name = data["name"]
        var message = "Is Now In The Game!"
        // adds sprite class
        instantiate(name, true)
        // append login message
        socket.emit('POST', {"name": name, "msg": message})
    })
}

// helper function
function log(name, msg) {
    $('#log').append($('<p>').text(name + ": " + msg))
}

///////////////////////////////////////////////////////////
// Part 3: Chat

// chat event handlers
$("#send").click(dopost);
$("#input").on("keypress", function(e) {
    if( e.keyCode == 13 ) {
        dopost();
    }
})

// helper
function dopost () {
    // ignore empty messages
	if( $("#input").val() != "" ) {

        // send POST message to server (see server.js for details)
        name = $(".sprite-self").attr("id");
        msg = $("#input").val()
        socket.emit('POST', {"name" : name, "msg" : msg})

        // reset input textbox
		$("#input").val('')
		$("#input").focus()
	}
}

///////////////////////////////////////////////////////////
// Chat Response

// when receive POST message...
// - append to chat log
function chatResponse(socket){
    socket.on('POST', function(data){
        log(data['name'], data['msg'])
    })
    
    socket.on('MOVE', function(data){
        move(data['name'], data['left'], data['top']);
    })
}

///////////////////////////////////////////////////////////
// Part 4: Movement 

// helpers to track what keys are currently held down

var keys = [false,false,false,false]

$(document).keydown(function(e) {
    if ($(document.activeElement).attr('id') != "input" &&
        $(document.activeElement).attr('id') != "name") {
        if (e.keyCode == 65) keys[0] = true
        if (e.keyCode == 68) keys[1] = true
        if (e.keyCode == 87) keys[2] = true
        if (e.keyCode == 83) keys[3] = true
    }

})

$(document).keyup(function(e) {
    if ($(document.activeElement).attr('id') != "input" &&
        $(document.activeElement).attr('id') != "name") {
        if (e.keyCode == 65) keys[0] = false
        if (e.keyCode == 68) keys[1] = false
        if (e.keyCode == 87) keys[2] = false
        if (e.keyCode == 83) keys[3] = false
    }
})

// simulation

// set a fixed tick to update the simulation
var frameTime = 1000 / 30

// set local vars for my position 
var posx = START_LEFT, posy = START_TOP

// my movement speed
var SPEED = 0.2

// main loop runs on fixed tick to update my position (based on keys held down)
function mainLoop() {
    velx=0
    if (keys[0]) velx -= 1
    if (keys[1]) velx += 1

    vely=0
    if (keys[2]) vely -= 1
    if (keys[3]) vely += 1

    posx += velx * SPEED * frameTime
    posy += vely * SPEED * frameTime

    // send MOVE message to server (see server.js for details)
    socket.emit('MOVE', {"name": name, "left": posx, "top":posy});
}
setInterval(mainLoop, frameTime)

// when receive MOVE message...
// - change the location of the indicated sprite

// helper function
function move(name, left, top) {    
    $("#" + name).css({"left" : left, "top" : top})
}