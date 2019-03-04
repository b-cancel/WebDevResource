//Solution for Problem 1
$("#wishes").text("I hate you, Bob.")

//Solution for Problem 2
$("#p2Image").attr("src","https://i.ytimg.com/vi/oMQI0bJJOvM/hqdefault.jpg")

//Solution for Problem 3
$("#p3Images img").attr("width", "300px")

//Solution for Problem 4
$( "#p4Btn p button" ).click(function() {
    $("#p4Btn p").css( "color", "red" ) //set text color to red
    currFontSize = parseInt($("#p4Btn p").css("font-size"))//read in current text size
    $("#p4Btn p").css("font-size", currFontSize * 2) //set text size to double of what it was at first
});

//Solution for Problem 5
$( "#p5 p img" ).click(function() {
    $("#p5 p span").removeClass("hidden")
});

//Solution for Problem 6
$('.menu').mouseenter(function(){
    $(this).css({"border" : "5px solid yellow"})
}).mouseleave(function() {
    $(this).css({"border" : "0px solid yellow"})
});

//Solution for Problem 7 (I did both since i dont know which one you consider the first... so it works both ways)
$('#first').on('input', function() {
    firstVal = $('#first').val()
    $('#second').val(firstVal)
});

$('#second').on('input', function() {
    firstVal = $('#second').val()
    $('#first').val(firstVal)
});

//Solution for Problem 8
$('#haha').blur(function() {
    $('#haha').val("HAHA")
});

//Solution for Problem 9
function updateDropDownGivenCheckBox(){
    enable = $("input[type='checkbox']").is(':checked')
    enable = !enable
    $("#dropdown").prop("disabled", enable)
}
updateDropDownGivenCheckBox() //initial set
$("input[type='checkbox']").change(updateDropDownGivenCheckBox); //set on change

//Solution for Problem 10
$('#p10Date').blur(function(){
    //grab the date from the field
    initialDate = $("#p10Date").val()
    //try to parse the date
    finalDate = moment(initialDate) //try default format parsing
    if(finalDate.isValid() == false){
        //try non default format parsing (NOTE: what formats to use was no specified)
        finalDate = moment(initialDate, ["MM-DD-YYYY", "MM-YYYY-DD", "DD-MM-YYYY", "DD-YYYY-MM", "YYYY-DD-MM", "YYYY-MM-DD" ])  
    }
    //format the parsed date
    if(finalDate.isValid() == false){
        finalDate = initialDate + " is an invalid date format"
    } 
    else{
        finalDate = moment(finalDate).format('MM/DD/YYYY');
    }
    //output the parsed date
    $("#p10Date").val(finalDate)
});