$(document).ready(function() {

    items = [];

    $.getJSON('data/items.json', function(data) {
        items = data;
    });

    $("#form-submit").submit(function (e){
        e.preventDefault();
        var query = $("#search-form").val();
        query = query.toLowerCase();
        query = query.trim();
        results = [];

        for (i = 0; i < items.length; i++) {
            caption = items[i].caption;
            caption = caption.toLowerCase();
            if (caption.indexOf(query) != -1) {
                results.push(items[i]);
            }    
        }

        if (results.length > 0) {
            render(results);
        } else if (query == '') {
            render(items);
        } else {
            $("#content-section").text('No Results Found');
        }

    });

    function render(render_items) {

        content = '<div class="row"> <button id="back" class="btn btn-primary">Back...</button> </div>';

        for (var i = 0; i < render_items.length; i++) {
            content += '<div class="col-md-4">';
            content += '<div class="well">';
            content += '<a href="' + render_items[i].image + '" target="_blank">';
            content += '<img src="' + render_items[i].image + '" alt="lovely photo" class="center-block img-responsive">';
            content += '</a>';
            content +=  '<p class="text-center"> ' + render_items[i].caption + ' </p>';
            content += '</div>';
            content +=  '</div>' ;
        }

        $("#content-section").html(content);

    }

    $('body').on('click', '#photo-load', function() {
        $("#welcome").hide();
        render(items);
        $(".search-form").show();
        $( "#content-section" ).hide();
        $( "#content-section" ).fadeIn("slow");
        
    });

    $('body').on('click', '#back', function() {
        splash();
        $(".search-form").hide();
        $("#welcome").show();
    });

    function splash() {
        $("#content-section").html(' <button id="photo-load" class="btn btn-primary">Load!</button> ');
        $(".search-form").hide();        
    }

    splash();

});

$("#login-button").click(function(){
    alert("This feature is not available yet");
});