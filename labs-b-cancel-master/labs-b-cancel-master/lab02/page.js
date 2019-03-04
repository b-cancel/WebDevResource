// Three ways to use the jQuery ajax call, with various
// purposes and concerns.

$("#b1").click(function () {
	// simple ajax syntax
	// guesses the type of data to parse! (in this case script)
	// which can fail!
	$.ajax("list.json").done(function(data) {
		// data comes back as string, have to parse
		items = $.parseJSON(data);

		// display
		ul = $("#template");
		for( i=0;i<items.length;i++ ) {
			e = $("<li>").text( items[i].id )
			ul.append( e );
		}		
	}).fail(function() {
		console.log("broke!")
	})
});

$("#b2").click(function () {
	// parameter array ajax syntax, explicit data parsing
	$.ajax({ url:"list.json",
			 dataType:"json",
			 success: function(items) {
		// data already parsed by dataType

		// display w/ jquery for-each loop
		ul = $("#template");
		$.each(items, function(i, val) {
			e = $("<li>").text( val.id )
			ul.append( e );
		})
	}}).fail(function() {
		console.log("broke!")
	})
});

$("#b3").click(function() {
	// json shortcut (equivalent to above)
	$.getJSON("list.json", function(items){
		ul = $("#template");
		$.each(items, function(i, val) {
			e = $("<li>").text( val.id )
			ul.append( e );
		})
	}).fail(function() {
		console.log("broke!")
	})
});

$("#clear").click(function() {
	$("#template").html("");
})