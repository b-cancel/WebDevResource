//////////////////////////////////////////
// Question 2
//////////////////////////////////////////

//Q2a When the button below is clicked, change the text on it to "Ouch!

$("#Q2a").attr("type","button") //stops the page from reloading when we click on the button

$("#Q2a").click(function(){ 
    $("#Q2a").text("Ouch!")
});

//Q2b When the button below is clicked, change the text on it to "Ouch!

$("#Q2b").attr("type","button") //stops the page from reloading when we click on the button

number = 97
$("#Q2b").click(function(){ 
    string = "<li>" + number + " bottles of beer on the wall...</li>"

    $("#Q2bList").append(string);

    if(number > 0){
        number -= 1
    }
});

//Q2c When the button below is clicked, change the text on it to "Ouch!

$("#Q2cC").on('input', function() {
    celVal = parseFloat($("#Q2cC").val())
    $("#Q2cF").val(celVal * (9/5) + 32)
});

$("#Q2cF").on('input', function() {
    farVal = parseFloat($("#Q2cF").val())
    $("#Q2cC").val((farVal  - 32) * (5/9))
});

//////////////////////////////////////////
// Question 3
//////////////////////////////////////////

//1-3 moles should pop up at random every 0.5 seconds, 
//and stay up for 1 second before disappearing. 
//You start with 0 points and get 10 points for clicking on a mole before it disappears (score displayed at bottom of game).

/*
    $("#DEALERHAND > img:nth-child(1)").fadeOut(appearSpeedInMilliseconds, function() {
        //fade in the card at the end
        $("#DEALERHAND > img:nth-child(1)").remove()
        addCardToDealer(getCardToCardURL(dealerHand[dealerHand.length-1]))
        $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
            checkForEndGame(blackJackPossible);
        })
    });
*/

playerPoints = 0
fadeInTime = 250
fadeOutTime = 500

function dealFirst4Cards(){
    $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
        playerHand.push(getCardFromDeck())

    })
}

function indivPopDown(moleID){
    //fade out
    $(moleID).fadeOut(fadeOutTime, function() {
    })
}

function indivPopUp(moleID){
    //fade in
    $(moleID).fadeIn(fadeInTime, function() {
        //stay for 1 second
        setTimeout(indivPopDown(moleID), 1000) //1000 milliseconds = 1 second

    })
}

// function to make a mole appear or disappear
function popup() {
    //randomly choose how many moles will pop up 1 - 3
    numberOfMoles = Math.floor((Math.random() * 3) + 1);

    //this list should only include moles that are fully hidden
    potentialIDs = []
    for(i=0; i<9; i++){
        if($('#'+i).is(':visible') == false){
            potentialIDs.push(i)
        }
    }

    //select precisely which moles will pop up
    for(i=0; i<numberOfMoles; i++){

        //plan for potential scenario where you dont have as many moles as you want hidden
        if(potentialIDs.length == 0){
            break;
        }

        //select a location (that contains a reference to an object)
        selectedID = Math.floor((Math.random() * (potentialIDs.length - 1)) + 0)

        //show the object at that location
        indivPopUp("#" + potentialIDs[selectedID])

        //remove that object
        potentialIDs.splice(selectedID,1)
    }

    //recursion
    setTimeout(popup, 500) //500 milliseconds = .5 seconds
}

function setPoints(points){
    $("#points").text(points + " Points")
}

function init(){

    //set player points
    setPoints(playerPoints)
    
    //loop through all moles
    for(i=0; i<9; i++){
        //make mole ID
        moleID = "#" + i

        //hide all the moles
        $(moleID).hide()

        //make each a button
        $(moleID).attr("type","button") //stops the page from reloading when we click on the button

        $(moleID).click(function(){ 
            //TODO... modify so you only get 10 points per that instance the mole goes up... ATM you can click it twice and get 10*2 points
            playerPoints += 10
            setPoints(playerPoints)
        });
    }

    //instantly begin running popup
    setTimeout(popup, 500) //500 milliseconds = .5 seconds
}

init()

//////////////////////////////////////////
// Question 4
//////////////////////////////////////////

$("#Q4Btn").attr("type","button") //stops the page from reloading when we click on the button

$("#Q4Btn").click(function(){ 
    $("#Q4List > li").remove() //remove the first example list item

    $.ajax({
        url : "instructors.js",
        dataType: "json",
        success: function(instructors){
            $.each(instructors, function(itemID, instructor){
                listItem = "<li>"
                listItem += instructor.name 
                listItem += ": " + instructor.awesomeness
                listItem += "</li>"
                console.log(listItem)
                $("#Q4List").append(listItem)
            });
        }
    })
});