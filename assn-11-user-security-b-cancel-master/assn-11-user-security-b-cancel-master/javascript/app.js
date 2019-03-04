$(document).ready(function(){

    password = ""

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
                    u: username,
                    p: password,
                },
                success: function(hash) {
                    if(hash != "none"){
                        hideError()
                        $("#username").val("")
                        $("#password").val("")
                        $("user").text(username)
                        passwordHash = hash
                        $("hash").text(passwordHash)
                        $("#login").show()
                        $("#logout").hide()
                    }
                    else{
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
});