$(document).ready(function(){
    $("#postBtn").attr("type","button") //set postBtn to button so that it doesnt reload the page when pressed
    $(".delete_btn").attr("type","button") //ditto as above for the first hidden card that we duplicate from
    $("#nameBox").focus() //focuses on the name field
});

//NOTE: when grabbing content from textBox or textArea you will never get null or undefined... its equivalent is ""
function setError(error){
    if(error == "" ) $("#ERROR").css( "display", "none")
    else $("#ERROR").css( "display", "block")
    $("#ERROR").text(error)
}

function clearError(){
    setError("")
}

function getDatetime(){
    return new Date();
}

function getName(){
    return $("#nameBox").val()
}

function getComment(){
    return $("#commentBox").val()
}

function isAlphaNumeric(str) {
    var i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      var code = str.charCodeAt(i);
      if ((
          (48 <= code  && code < 58) || // numeric (0-9)
          (65 <= code && code <= 90) || // upper alpha (A-Z)
          (97 <= code && code <= 122) // lower alpha (a-z)
            ) == false
        ) { 
        return false;
      }
    }
    return true;
  };

function checkName(name){
    //The name cannot be blank, and must consist of all alphanumeric characters (0-9, a-z, A-Z, no spaces!)
    if(name == "") return "The name must not be blank"
    else if(isAlphaNumeric(name) == false) return "The string must consist of only alphanumeric characters  (0-9, a-z, A-Z, no spaces!)"
    else return ""
}

function checkComment(comment){
    //The comment cannot be blank
    if(comment == "") return "The comment must not be blank"
    else return ""
}

function func(event) { //set button to delete
    event.data.obj.remove()
}

function newPost(name, comment, date){
    newPostObj = $(".CARD_DUPLICATEABLE").eq(0).clone()
    newPostObj.insertAfter($("#ERROR"))
    if(newPostObj.hasClass("hidden")){ //for first duplication
        newPostObj.removeClass("hidden")
        newPostObj.removeAttr("id")
    }

    $(".CARD_DUPLICATEABLE:first div div div h4").text(name) //set name
    $(".CARD_DUPLICATEABLE:first div p:first").text(comment) //set comment
    $(".CARD_DUPLICATEABLE:first div .custom_date").text("posted on: " + date) //set post date
    thisObj = $(".CARD_DUPLICATEABLE:first")
    $(".CARD_DUPLICATEABLE:first .delete_btn").click({obj: thisObj}, func);
}

function postCommentIfValid(name, comment, date){
    nameError = checkName(name)
    commentError =  checkComment(comment)
    if(nameError == "" && commentError == ""){
        newPost(name, comment, date)
        //prep for the posting of a new comment
        clearNameAndComment()
        //clear and error just in case there was one before
        clearError()
        //focus on name for the next post
        $("#nameBox").focus()
    }
    else{
        if(nameError != ""){ //name error
            $("#nameBox").focus()
            if(commentError != ""){
                setError(nameError + " AND " + commentError);
            }
            else{
                setError(nameError)
            }
        }
        else{ //no name error
            $("#commentBox").focus()
            setError(commentError)
        }
    }
}

function clearNameAndComment(){
    $("#nameBox").val("")
    $("#commentBox").val("")
}

$("#postBtn").click(function(e) {
    postCommentIfValid(getName(), getComment(), getDatetime())
});

