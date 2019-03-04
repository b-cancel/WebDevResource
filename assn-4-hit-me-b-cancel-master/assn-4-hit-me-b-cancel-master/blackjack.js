/*
PROCEDURE
-set up the visual hand of both players with an invisible card (So things dont grow and shrink)
    -we insert to the right of this invisible card (remember difference between player and dealer perspective)
-----
-you place your bets (assume its a number)
-ERROR -> you might be trying to bet more money than you have, clear field and ask them to try again
-placing bet option disappear
-first card delivered to all players face up
-second card delivered face up to us, face down to dealer
-player decides to hit or stay
    -if player hits and goes over 21 then they lose immediately [SHOW AS PLAYER LOSS]
    -if player gets black jack they automatically win (UNLESS dealer also has black jack) [SHOW AS TIE]
        -get 1.5 times what they bet
-after player stays[HERE]
-dealer flips the card that was not facing up
-dealer continutes to hit if total is <= 16
    -if dealer hits and goes over 21 then they lose immediately [SHOW AS PLAYER WIN]
    -if dealer gets black jack they automatically win (UNLESS player also has black jack) [SHOW AS TIE]
            -get 1.5 times what they bet
-after player and dealer both stay (assuming no automatic wins or loses yet) cards are counted [SHOW AS PLAYER LOSS OR WIN]

WIN LOSS SCREEN
-SHOW -> bootstrap modal declaring win or loss with money lossed or gained this round
-RESET GAME BTN (only viewable IF the player has money left)
    -YES -> keep money and add earnings(keep track of this), everything else resets
    -NO -> GO TO OVERVIEW
-OVERVIEW BTN (only viewable IF the player does not have money left)
    -RESET GAME option

GOAL
-get as close to 21 as possible without going over

ASSUME
-the player decides on the spot what the A is worth, obviously they lean towards an advantageous option
-we are only using 1 deck
-we don't keep track of the dealer money

CARD VALUES
-2-9 = 2-10 respectively
-J-K = 10
-A = 1 || 11

NOTES
-Deck is invisible
-both hands programatically are visible (visible to respective users?) regardless of not being visible on screen
*/

//-------------------------HELPER STRUCTURES-------------------------

appearSpeedInMilliseconds = 1000
bankroll = 500000;
currBet = 0;
deck = []
playerHand = []
dealerHand = []

class Card{
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
      }
}

//-------------------------HELPER FUNCTIONS-------------------------

function clear(array) {
    array.length = 0 
}

function createDeck(){
    for(v=1; v<=13; v++){
        for(s=1; s<=4; s++){
            deck.push(new Card(v,s))
        }
    }
}

//TAKEN FROM: https://bost.ocks.org/mike/shuffle/
function shuffleDeck() {
    var m = deck.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = deck[m];
      deck[m] = deck[i];
      deck[i] = t;
    }
}

function printDeck(){
    deck.forEach(function(element) {
        console.log(element.value + " with suit " + element.suit);
    });
}

function getCardFromDeck(){
    index = Math.floor((Math.random() * (deck.length-1)) + 0);
    selectedC = deck[index]
    deck.splice(index, 1);
    return selectedC;
}

function returnImageHTML(source){
    return "<img class=\"m-2\" style=\"display:none\" src=\"" + source + "\"\/>";
}

function addCardToDealer(imgURL){
    $("#DEALERHAND").prepend(returnImageHTML(imgURL))
}

function addCardToPlayer(imgURL){
    $("#PLAYERHAND").append(returnImageHTML(imgURL))
}

function showBetSection(){
    $("#BETSECTION").show()
    $("#BETVAL").show()
    $("#BETBTN").show()
}

function hideBetSection(){
    $("#BETSECTION").hide()
    $("#BETVAL").hide()
    $("#BETBTN").hide()
}

function setBankRoll(){
    $("#BANKROLL").text("Bankroll: "+accounting.formatMoney(bankroll, "$", 0))
}

idToValue = {1:"A",10:"T",11:"J",12:"Q",13:"K"}
idToSuit = {1:"H", 2:"S", 3:"C", 4:"D"}

function getCardURL(value = null, suit = null){ //these should be 2 numbers [1-13] [1-4]
    cardName = ""
    if(value == null){
        cardName = "cardback"
    }
    else if(value == 0){
        cardName = "empty"
    }
    else{
        value = (value != 1 && value < 10) ? value.toString() : idToValue[value]
        suit = idToSuit[suit]
        cardName = value + suit
    }
    return "images/"+cardName+".png";
}

function getCardToCardURL(card){
    return getCardURL(card.value, card.suit)
}

//-------------------------MAIN FUNCTIONS-------------------------

function returnOptimalPoints(array){
    aceCount = 0
    points = 0
    for(i = 0; i < array.length; i++){
        val = array[i].value
        if(val == 1){
            aceCount++
        }
        else if( 2 <= val && val <= 9){
            points += val
        }
        else{
            points += 10 //10, J, Q, K
        }
    }
    //NOTE: there can not be 2 Aces (11 + 11 == 22 > 21)
    if(aceCount > 0){
        points += (aceCount-1) //we remove the one ace that could be counted as an 11
        if((points + 11) <= 21) points += 11
        else points += 1
    }
    return points;
}

$('#MODAL').on('hidden.bs.modal', function (e) {
    if(bankroll > 0){
        startNewRound()
    }
    else{
        location.reload()
    }
})

$("#RESET").click(function() {
    location.reload();
})

function setModalFields(title, body){
    $("#MODALTITLE").text(title)
    $("#MODALBODY").text(body)
    if(bankroll <= 0){
        $("#CONTINUE").hide()
    }
    else{
        $("#CONTINUE").show()
    }
    $('#MODAL').modal('show')
}

function checkForEndGame(blackJackPossible = false){
    playerPoints = returnOptimalPoints(playerHand)
    dealerPoints = returnOptimalPoints(dealerHand)

    if(playerPoints > 21 || dealerPoints > 21){
        //NOTE: its impossible for both players to bust
        //for player to bust they would need more than 2 cards but dealer can only have 2 which makes it impossible for him to bust
        //for dealer to bust the player has to have not busted before
        if(playerPoints > 21){
            setModalFields("You Lose $" + currBet, " Your Card Count Is " + playerPoints + " Which Is Over 21")
        }
        else{
            earnedMoney = currBet * 2
            bankroll += parseInt(earnedMoney, 10)
            setBankRoll()
            setModalFields("You Win $" + earnedMoney, " The Dealers Card Count Is " + dealerPoints + " Which Is Over 21")
        }
    }
    else{
        if(playerPoints == 21 || dealerPoints == 21){
            if(playerPoints == dealerPoints){
                bankroll += parseInt(currBet, 10)
                setBankRoll()
                setModalFields("TIE", "You Both Have A Card Count Of " + playerPoints) //TODO...untested
            }
            else{
                if(playerPoints == 21){
                    //player WINS with black jack
                    if(blackJackPossible){
                        earnedMoney = currBet * 2.5
                        bankroll += parseInt(earnedMoney, 10)
                        setBankRoll()
                        setModalFields("You Win $" + earnedMoney, " Black Jack!")
                    }
                    else{
                        earnedMoney = currBet * 2
                        bankroll += parseInt(earnedMoney, 10)
                        setBankRoll()
                        setModalFields("You Win $" + earnedMoney, " You Scored " + playerPoints + " VS The Dealers " + dealerPoints)
                    }
                }
                else{
                    setModalFields("You Lose $" + currBet, " The Dealer Scored " + dealerPoints + " VS Your " + playerPoints)
                }
            }
        }
        else{
            if(dealerPoints >= 17){ //dealer stands
                if(playerPoints == dealerPoints){
                    bankroll += parseInt(currBet, 10)
                    setBankRoll()
                    setModalFields("TIE", "You Both Have A Card Count Of " + playerPoints)
                }
                else{
                    if(playerPoints > dealerPoints){
                        earnedMoney = currBet * 2
                        bankroll += parseInt(earnedMoney, 10)
                        setBankRoll()
                        setModalFields("You Win $" + earnedMoney, " You Scored " + playerPoints + " VS The Dealers " + dealerPoints)
                    }
                    else{
                        setModalFields("You Lose $" + currBet, " The Dealer Scored " + dealerPoints + " VS Your " + playerPoints)
                    }
                }
            }
            else{ //dealer hits
                dealerHand.push(getCardFromDeck())
                addCardToDealer(getCardToCardURL(dealerHand[dealerHand.length-1]))
                $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
                    checkForEndGame()
                })
            }
        }
    }
}

function dealerFlipCard(blackJackPossible){
    $(".PLAYERCTRL").hide() //hide player options because now its the dealers turn
    //fade out the card at the end (but after the empty card)
    $("#DEALERHAND > img:nth-child(1)").fadeOut(appearSpeedInMilliseconds, function() {
        //fade in the card at the end
        $("#DEALERHAND > img:nth-child(1)").remove()
        addCardToDealer(getCardToCardURL(dealerHand[dealerHand.length-1]))
        $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
            checkForEndGame(blackJackPossible);
        })
    });
}

$("#PLUS").click(function() {
    playerHand.push(getCardFromDeck())
    addCardToPlayer(getCardToCardURL(playerHand[playerHand.length-1]))
    $("#PLAYERHAND > img:last").fadeIn(appearSpeedInMilliseconds, function() {
        //check if player has lost OR landed a blackjack and flip the card of the dealer if they have
        if(returnOptimalPoints(playerHand) >= 21){
            dealerFlipCard(false)
        }
    })
});

$("#CHECK").click(function() {
    dealerFlipCard(false) //flip dealer card and let them keep playing until, they lose and player wins, or they win and player loses
});

function dealFirst4Cards(){
    //deal out the first 4 cards
    dealerHand.push(getCardFromDeck())
    addCardToDealer(getCardToCardURL(dealerHand[dealerHand.length-1]))
    $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
        playerHand.push(getCardFromDeck())
        addCardToPlayer(getCardToCardURL(playerHand[playerHand.length-1]))
        $("#PLAYERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
            dealerHand.push(getCardFromDeck())
            addCardToDealer(getCardURL()) //flippped over card
            $("#DEALERHAND > img:first").fadeIn(appearSpeedInMilliseconds, function() {
                playerHand.push(getCardFromDeck())
                addCardToPlayer(getCardToCardURL(playerHand[playerHand.length-1]))
                $("#PLAYERHAND > img:last").fadeIn(appearSpeedInMilliseconds, function() {
                    $(".PLAYERCTRL").show() //show player options because they can now take action
                    if(returnOptimalPoints(playerHand) == 21){
                        dealerFlipCard(true) //flip dealer card and check for end (which will yield a tie or player win)
                    }
                })
            })
        })
    })
}

//add the listener to the deal button
$("#BETBTN").click(function() {
    //confirm that we have a number
    currBet = $("#BETVAL").val()
    if($.isNumeric(currBet) == false){
        $("#BETVAL").val("")
        alert("this is not a number")
    }
    else{
        //confirm that we have enough money
        if(bankroll - currBet < 0){
            $("#BETVAL").val("")
            alert("you can not bet money you don't have")
        }
        else{
            hideBetSection()
            dealFirst4Cards();
            bankroll -= currBet; 
            setBankRoll()
        }
    }
});

function startNewRound() {
    //remove everything from player hand
    $("#PLAYERHAND").empty()//TODO visually
    clear(playerHand) //programatically
    //remove everything from dealer hand
    $("#DEALERHAND").empty()//TODO visually
    clear(dealerHand) //programatically

    //add placeholder card in dealer hand (for spacing)
    addCardToDealer(getCardURL(0))

    //clear bet value
    $("#BETVAL").val("")

    //show betting section
    showBetSection()

    //hide player controls that will be shown after the player deals
    $(".PLAYERCTRL").hide()

    //create and shuffle the deck for the new game
    clear(deck)
    createDeck()
    shuffleDeck()
}

$(document).ready(function(){
    $("#DEALBTN").attr("type","button") //so page doesnt reload when pressed (only happens first time)
    bankroll = 500000;
    currBet = 0;
    startNewRound()
});