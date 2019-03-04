$(document).ready(function(){

    //-------------------------Showing Posts System

    //globals
    lastPostId = -1

    function displayNewPosts(){
        $.ajax({
            method: 'POST',
            url : baseurl + "/handlers/update",
            data: {
                lastPostId: lastPostId,
            },
            success: function(newPosts){
                newPosts = JSON.parse(newPosts) //oldest posts are first
                count = Object.keys(newPosts).length
                if(count > 0){
                    //show all of the new posts
                    for (i = 0; i < count; i++){
                        newPost(newPosts[i]["username"], newPosts[i]["comment"], newPosts[i]["date"])
                    }
                    //save newest post so we only check for anything newer than that post
                    lastPostId = newPosts[count-1]["id"]
                    console.log("new last post id: " + lastPostId)
                }
            }
        });
    }

    function checkForNewPosts() { 
        displayNewPosts(); 
        setTimeout(checkForNewPosts, 2000); 
    }
    
    checkForNewPosts();

    //-------------------------Logging System

    //globals
    id = -1
    username = ""

    function hideError(){
        $("#error").hide()
    }
    
    function showError(){
        $("#error").show()
    }
    
    function login(){
        username = $("#username").val()
        password = $("#password").val()
        if(username.length != 0 && password.length != 0){
            $.ajax({
                method: 'POST',
                url : baseurl + "/handlers/login",
                data: {
                    username: username,
                    password: password,
                },
                success: function(userJSON) {
                    try{
                        //save user data
                        userJSON = JSON.parse(userJSON)
                        id = userJSON["id"]
                        username = userJSON["username"]
                        //hide potential login error
                        hideError()
                        //clear login fields
                        $("#username").val("")
                        $("#password").val("")
                        //show text that shows user has logged in
                        $("user").text(username)
                        //show and hide appropiate sections
                        $("#login").show()
                        $("#logout").hide()
                        //load all the comments from the server
                        displayNewPosts()
                    }
                    catch(e){
                        showError()
                    }
                }
            });
        }
        else{
            showError()
        }
    }
    
    function logout(){

        $("#login").hide()
        $("#logout").show()

        /*
        //future ajax loggout caller
        $.ajax({
            url : baseurl + "/handlers/logout/",
            dataType : `text`,
            success: function(){
                $("#login").hide()
                $("#logout").show()
            }
        });
        */
    }
    
    $("#submitBtn").on( "click", function(ev) {
        ev.preventDefault();
        login()
    });

    $("#loggoutBtn").on( "click", function(ev) {
        ev.preventDefault();
        logout()
    });

    //-------------------------Posting System

    $("#commentBox").focus() //focuses on the comment field

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

    function checkComment(comment){
        //The comment cannot be blank
        if(comment == "") return "The comment must not be blank"
        else return ""
    }

    function func(event) { //set button to delete
        event.data.obj.remove()
    }

    function newPost(username, comment, date){
        newPostObj = $(".CARD_DUPLICATEABLE").eq(0).clone()
        newPostObj.insertAfter($("#ERROR"))
        if(newPostObj.hasClass("hidden")){ //for first duplication
            newPostObj.removeClass("hidden")
            newPostObj.removeAttr("id")
        }

        $(".CARD_DUPLICATEABLE:first div div div h4").text(username) //set name
        $(".CARD_DUPLICATEABLE:first div p:first").text(comment) //set comment
        $(".CARD_DUPLICATEABLE:first div .custom_date").text("posted on: " + date) //set post date
        thisObj = $(".CARD_DUPLICATEABLE:first")
        $(".CARD_DUPLICATEABLE:first .delete_btn").click({obj: thisObj}, func);
    }

    function postCommentIfValid(comment){
        commentError =  checkComment(comment)
        if(commentError == ""){
            $.ajax({
                method: 'POST',
                url : baseurl + "/handlers/comment",
                data: {
                    id: id,
                    body: comment,
                },
                success: function(msg){
                    try{
                        msg = JSON.parse(msg)
                        usernameError = (msg.hasOwnProperty('usernameError')) ? msg["usernameError"] : ""
                        commentError = (msg.hasOwnProperty('commentError')) ? msg["commentError"] : ""
                        if(usernameError == "" && commentError == ""){
                            //post up new comment
                            newPost(username, comment, msg['date'])
                            //let the system know that we already posted it
                            lastPostId = msg["id"]
                            //prep for the posting of a new comment
                            clearComment()
                            //clear and error just in case there was one before
                            clearError()
                            //focus on comment for the next post
                            $("#commentBox").focus()
                        }
                        else{
                            if(usernameError != "" && commentError != ""){
                                setError(usernameError + " and " + commentError);
                            }
                            else{
                                setError(usernameError + commentError);
                            }
                        }
                    }catch(e){
                        
                    }
                }
            });
        }
        else{
            $("#commentBox").focus()
            setError(commentError)
        }
    }

    function clearComment(){
        $("#commentBox").val("")
    }

    $("#postBtn").click(function(e) {
        postCommentIfValid(getComment(), getDatetime())
    });
});