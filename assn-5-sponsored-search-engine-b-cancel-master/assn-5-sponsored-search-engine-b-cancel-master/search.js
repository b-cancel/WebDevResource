sourcePanel =  $(".panel:last")
searchResults = []

function printSearchResults(){
    $.each(searchResults, function(index, value){
        console.log(value.relevance)
    });
}

function clipText(string){
    maxChars = 251 - 3 //3 is for the 3 dots
    string = string.substring(0,maxChars)
    string += "..."
    return string
}

function search(){
    clearSearchResults()
    getSearchResults()
    //mergeSearchResults() will be called when getSearchResults has finished all it's ASYNC work
    //sortSearchResults() will be called when mergeSearchResults has finished all it's work
    //showSearchResults() will be called when sortSearchResults has finished all it's work
}

function clearSearchResults(){
    //remove all search results programatically
    searchResults.length = 0

    //remove all search results visually
    $.each($("#results > .panel"), function(index, item){
        if(item != sourcePanel){
            item.remove()
        }
    });

    //remove insult (regardless of if present)
    $("#insult").attr("hidden","hidden")
}

function getSearchResults(){
    keywords = $("#search").val().split(" "); //grab keywords from our field

    //find results
    keywordsChecked = 0
    $.each( keywords, function( keywordID, keyword ){ //for each keyword
        //find out if there exists a json file by using ajax
        jsonFileName = "json/" + keyword + ".json"
        $.ajax({
            url : jsonFileName,
            dataType: "json",
            success: function(items){
                $.each(items, function(itemID, item){
                    searchResults.push(item)
                });
            }
        })
        .always(function() {
            keywordsChecked += 1
            if(keywordsChecked == keywords.length){
                mergeSearchResults()
            }
        });
    })
}

function areSamePage(page1, page2){
    sameTitle   =   page1.title     ==      page2.title
    sameUrl     =   page1.url       ==      page2.url
    sameExcerpt =   page1.excerpt   ==      page2.excerpt
    return sameTitle && sameUrl && sameExcerpt
}

function mergeSearchResults(){
    for(page1 = 0; page1 < searchResults.length; page1++){
        for(page2 = (page1 + 1); page2 < searchResults.length; page2++){
            if(areSamePage(searchResults[page1], searchResults[page2])){
                //add up relevance scores
                searchResults[page1].relevance = searchResults[page1].relevance + searchResults[page2].relevance 
                //delete duplicate
                searchResults.splice(page2,1)
                //make sure we check page1 index vs the new page that is in this same page2 index
                page2 -= 1
            }
        }
    }

    sortSearchResults()
}

function sortSearchResults(){
    searchResults = searchResults.sort(function(a, b) {
        return (a.relevance > b.relevance);
    });

    console.log("first result" + searchResults[0].relevance)

    showSearchResults()
}

function showSearchResults(){
    $.each(searchResults, function(index, result){
        //duplicate the last page in #results
        domElem = sourcePanel.clone()
        //remove the hidden attribute
        domElem.removeAttr('hidden');
        //set the variables read in from the json file
        $(domElem).find(".panel-body > .title > a").text(result.title)
        $(domElem).find(".panel-body > .title > a").attr("href", result.url)
        $(domElem).find(".panel-body > .url").text(result.url)
        $(domElem).find(".panel-body > .relevance").text(result.relevance)
        $(domElem).find(".panel-body > .excerpt").text(clipText(result.excerpt))
        //add to visual
        $("#results").prepend(domElem)
    });
}

//runs after page loads to avoid hidden bugs
$(window).on('load', function() {
    $("#GOBTN").attr("type","button") //stops the page from reloading when we click on the button

    $("#GOBTN").click(function(){ //triggers search functionality
        search()
    });
});