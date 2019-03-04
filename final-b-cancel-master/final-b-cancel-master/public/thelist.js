$(".del").click( function() {
	btn = $(this);
	container = $(btn).parent().parent();
	id = $(container).attr('id')

	//remove the enemy on the client
	container.remove();

	//remove the enemy on the server
	$.ajax({
		method: "POST",
		url: baseurl + "/remove",
		data: {"id" : id},
		success: function (response) {
			$("#countNumber").text(response)
			$("#countBanner").show()
		}
	});
})
