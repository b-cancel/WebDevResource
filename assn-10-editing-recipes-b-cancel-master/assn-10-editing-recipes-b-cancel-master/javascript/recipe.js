largestStepNumber = 0

$(document).ready(function(){

    //-------------------------Implements Edditing of List Items and Other

    function toTextBoxOnFocus(object){
        var theText = $(object).text()
        var theTextLength = theText.length
        $(object).children().remove()
        $(object).text("")
        $(object).append("<input type=\"text\" name=\"fname\" value=\"" + theText + "\" size=\"" + theTextLength + "\"></input>")
        return $(object).children("input")
    }

    function toPlainTextOnUnFocus(object, textBox){
        $(textBox).blur(function() {
            var theText = $(textBox).val()
            $(object).children().remove()
            $(object).text(theText)

            parentID = parseInt($(object).parent().attr("id"))

            if($(object).parent().hasClass("panel-body")){ //changing a step
		        $.ajax({
                    url : baseurl + "/handlers/step/" + parentID + "/" + theText,
                    dataType : "text",
                    fail: function() {
                        // TODO deal with error codes
                    }
                });
            }
            else{ //NOT changing a step
                $.ajax({
                    url : baseurl + "/handlers/" + $(object).attr("id") + "/" + parentID + "/" + theText,
                    dataType : "text",
                    fail: function() {
                        // TODO deal with error code 
                    }
                });
            }
        });
    }

    function onClick(object){
        if($(object).has("input").length ? false : true){ //if not text box
            textBox = toTextBoxOnFocus(object)
            $(textBox).select() //select on focus
            toPlainTextOnUnFocus(object, textBox)
        }
    }

    $("#recipeName").on( "click", function() {
        onClick(this)
    });
    
    $("#recipePrepTime").on( "click", function() {
        onClick(this)
    });
    
    $("#recipeTotalTime").on( "click", function() {
        onClick(this)
    });
    
    $("#recipeDescription").on( "click", function() {
        onClick(this)
    });
    
    function createOnClickForAllSteps(){
        stepObjects = $("#sortable > li > div > div > .recipeStepDescription")
        largestStepNumber = parseInt($(stepObjects).eq(stepObjects.length-1).parent().children(".recipeStepNumber").text())

        //create the onClick Event for each step description
        $(stepObjects).on( "click", function() {
            onClick(this)
        });
    }

    createOnClickForAllSteps()

    //-------------------------Implements The Addition Of List Items

    $("#addStep").on("click",function(){

        object = this
        recipeID = $(this).parent().attr("id")
        number = largestStepNumber + 1
        description = "click here to edit step"

        //update things in the server
        $.ajax({
            url : baseurl + "/handlers/addStep/" + recipeID + "/" + number + "/" + description,
            dataType : `text`,
            fail: function() {
                // TODO deal with error code 
            },
            success: function(stepID) {
                //update things in the client
                $("#sortable > li:last").after(`
                <li>
                    <div class="panel panel-default col-sm-10 col-sm-offset-2">
                        <div class="panel-body" id="` + stepID + `">
                            <span class="recipeStepNumber"> ` + number + ` </span> 
                            <h3 class="step-heading"> ` + "Step" + number + ` </h3>
                            <description class="recipeStepDescription"> ` + description + ` </description>
                        </div>
                    </div>
                </li>
                `);
            
                createOnClickForAllSteps()
            }
        });
    });

    //-------------------------Implements Sortable List Items

    oldStepNumber = -1
    $("#sortable").sortable({
        start: function(even, ui){
            oldStepNumber = ui.item.index() + 1
        },
        stop: function(event, ui){
            recipeID = $("#sortable").parent().attr("id")
            newStepNumber = ui.item.index() + 1

            //update {step number} in the server
            $.ajax({
                url : baseurl + "/handlers/rearrange/" + recipeID + "/" + oldStepNumber + "/" + newStepNumber,
                dataType : `text`,
                fail: function() {
                    // TODO deal with error code 
                },
                success: function() {
                    //update {step number} in the client
                    steps = $("#sortable > li")
                    for(i=0; i < largestStepNumber; i++){
                        step = (steps.eq(i).children("div")).children("div")
                        stepNumber = i + 1
                        $(step).children(".recipeStepNumber").text(stepNumber)
                        $(step).children(".step-heading").text("Step " + stepNumber)
                    }
                }
            });
            oldStepNumber = -1
        } 
    });
  
    $( "#sortable" ).disableSelection();
});