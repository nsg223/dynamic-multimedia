document.getElementById("search-button").addEventListener("click", function(event){
    event.preventDefault();
    var input = document.getElementById("search-form").value;
    input = parseInt(input);

    var content = "";

    firstImage = document.getElementsByTagName("img");

    for (var i = 0; i < input; i++) {
    	content += '<div class="col-md-4">';
    	if (i % 2 != 0) {
        	content += '<div class="well">';
    	} else {
    		content += '<div class="well alt-bg">';	
    	}
        content += '<a href="photos/DSC01049.JPG" target="_blank">';
        content += '<img src="photos/DSC01049.JPG" alt="lovely photo" class="center-block img-responsive">';
        content += '</a>';
        content +=  '  <p class="text-center"> City View </p>';
        if (i % 2 != 0) {
        	content +=  ' </div>';
    	} else {
    		content += '</div>';
    	}
        content +=  '</div>' ;
    }

    document.getElementById("content-section").innerHTML = content;
});

document.getElementById("login-button").addEventListener("click", function(event){
    alert("This feature is not available yet");
});