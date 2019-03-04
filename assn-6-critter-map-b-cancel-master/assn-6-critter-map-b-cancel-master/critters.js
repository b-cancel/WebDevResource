var imgs = { 0 : "http://animalcontrolphx.com/wp-content/uploads/2013/05/gophers-400.jpg",
             1 : "https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/Q-Z/wolverine-crouching.adapt.945.1.jpg",
             2 : "https://www.waikikiaquarium.org/wp-content/uploads/2013/11/octopus_620.jpg"
           }

//<img src="https://www.waikikiaquarium.org/wp-content/uploads/2013/11/octopus_620.jpg"/ style="position: absolute; margin-top: 10; margin-left: 10;">

function displayAnimals(jsonIndex){
    //hide all the animals except the last one
    numberOfChildren = $("#theMap").children().length
    while(numberOfChildren > 1){ //the last child, the map, should not disapear
        $("#theMap > img:first").remove()
        numberOfChildren -= 1
    }

    //find out if there exists a json file by using ajax
    if(0 <= jsonIndex && jsonIndex <= 2){
        jsonFileName = "json/data" + jsonIndex + ".json"
        $.ajax({
            url : jsonFileName,
            dataType: "json",
            success: function(items){
                $.each(items, function(itemID, item){
                    html = "<img src=\"" + imgs[jsonIndex] +"\" style=\"position: absolute; height: 35px; margin-left: " + item[0] + "px; margin-top: " + item[1] + "px; \"/>"
                    $(html).insertBefore("#map");
                });
            }
        });
    } 
}

$("#choice").on('change', function() {
    displayAnimals($(this).val())
});

//runs after page loads to avoid hidden bugs
$(window).on('load', function() {
    displayAnimals(-1)
});